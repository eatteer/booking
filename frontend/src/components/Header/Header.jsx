import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

/* Components */
import Services from './components/Services/Services';
import Hero from './components/Hero/Hero';
import HeaderSearchBar from './components/SearchBar/SearchBar';

/* Styles */
import styles from './Header.module.css'

const Header = ({ type }) => {
  const styleByType = type === 'home' ? '' : styles.notHome
  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${styleByType}`}>
        <Services />
        {type === 'home' && (
          <>
            <Hero />
            <HeaderSearchBar />
          </>
        )}
      </div>
    </div>
  )
}

export default Header