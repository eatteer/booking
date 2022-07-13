import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { login } from '../../services/auth'
import FormikField from '../../components/FormikField/FormikField'
import styles from './Login.module.css'
import video from '../../assets/video.mp4'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../context/AuthContext'

const Login = () => {
  /* Hooks */
  const location = useLocation()
  const navigate = useNavigate()
  const { setAccessToken } = useAuthContext()

  const _submit = async (values) => {
    try {
      const { accessToken } = await login(values)
      setAccessToken(accessToken)

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true })
    } catch (error) {
      console.log(error)
      toast.error('Something bad happend. We could not log you in :C')
    }
  }

  return (
    <div className={styles.page}>
      <video className={styles.video} autoPlay loop muted>
        <source src={video} />
      </video>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('Required'),
          password: Yup.string().required('Required')
        })}
        onSubmit={_submit}
      >
        {(formik) => (
          <Form className={styles.form}>
            <Link className={styles.logo} to={'/'}>
              Booking
            </Link>
            <FormikField
              type={'text'}
              name={'username'}
              placeholder={'Username'}
            />
            <FormikField
              type={'password'}
              name={'password'}
              placeholder={'Password'}
            />
            <input
              className={'button primary'}
              type={'submit'}
              value={'Login'}
            />
            <footer className={styles.footer}>
              <p>
                Don't have an account?
                <Link to={'/register'}> Register</Link>
              </p>
            </footer>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login