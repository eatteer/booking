/* Components */
import Layout from '../../components/Layout/Layout'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'
import FeaturedCities from './components/FeaturedCities/FeaturedCities'
import FeaturedStays from './components/FeaturedStays/FeaturedStays'
import StayTypes from './components/StayTypes/StayTypes'
import MailList from '../../components/MailList/MailList'
import Footer from '../../components/Footer/Footer'

/* Styles */
import styles from './Home.module.css'

const Home = () => {
  return (
    <Layout>
      <Navbar />
      <Header type={'home'} />
      <main className={styles.main}>
        <h2 className={styles.heading}>Featured cities</h2>
        <FeaturedCities />
        <h2 className={styles.heading}>Browse by stay type</h2>
        <StayTypes />
        <h2 className={styles.heading}>Featured stays</h2>
        <FeaturedStays />
      </main>
      <MailList />
      <Footer />
    </Layout>
  )
}

export default Home