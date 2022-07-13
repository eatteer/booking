import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { register } from '../../services/auth'
import FormikField from '../../components/FormikField/FormikField'
import styles from './Register.module.css'
import video from '../../assets/video.mp4'
import { toast } from 'react-toastify'
// import toast from 'react-hot-toast'

const Register = () => {
  /* Hooks */
  const location = useLocation()
  const navigate = useNavigate()

  /* Handlers */
  const _submit = async (values) => {
    try {
      await register(values)
      toast.success('User created :3')
      
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true })
    } catch (error) {
      toast.error('Something bad happend. We could not create your user :C')
    }
  }

  return (
    <div className={styles.page}>
      <video className={styles.video} autoPlay loop muted>
        <source src={video} />
      </video>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('Required'),
          email: Yup.string().email().required('Required'),
          password: Yup.string().required('Required')
        })}
        onSubmit={_submit}>
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
              type={'email'}
              name={'email'}
              placeholder={'Email'}
            />
            <FormikField
              type={'password'}
              name={'password'}
              placeholder={'Password'}
            />
            <input
              className={'button primary'}
              type={'submit'}
              value={'Register'}
            />
            <footer className={styles.footer}>
              <p>
                Already have an account?
                <Link to={'/login'}> Login</Link>
              </p>
            </footer>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register