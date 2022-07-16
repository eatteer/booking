import { useState } from 'react'
import { useQuery, } from 'react-query'

/* Services */
import { getStays } from '../../services/stays'

/* Context */
import { useSearchContext } from '../../context/SearchContext'

/* Components */
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import SearchBar from './components/SearchBar/SearchBar'
import ResultItem from './components/ResultItem/ResultItem'
import Footer from '../../components/Footer/Footer'

/* Styles */
import styles from './Stays.module.css'
import Loader from '../../components/Loader/Loader'

const Stays = () => {

  /* Hooks */
  const {
    destination,
    type,
    filters,
  } = useSearchContext()

  /* States */
  const [_destination, _setDestination] = useState(destination)
  const [_type, _setType] = useState(type)
  
  const { data: stays, isFetched, isLoading } = useQuery(
    ['stays', _destination, _type],
    () => getStays(_destination, filters.minPrice, filters.maxPrice, _type),
  )

  return (
    <Layout>
      <Navbar />
      <Header type='list' />
      <main className={styles.main}>
        <SearchBar _setDestination={_setDestination} _setType={_setType} />
        <div className={styles.results}>
          {isFetched && stays.length === 0 && (
            <h2>Nothing found :C</h2>
          )}
          {isLoading && (
            <Loader />
          )}
          {stays && stays.map(stay => {
            return (
              <ResultItem key={stay._id} stay={stay} />
            )
          })}
        </div>
      </main>
      <Footer />
    </Layout>
  )
}


export default Stays