import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import StayDetail from './pages/StayDetail/StayDetail';
import Stays from './pages/Stays/Stays';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SearchContextProvider } from './context/SearchContext';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
// import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/stays' element={<Stays />} />
              <Route path='/stays/:id' element={<StayDetail />} />
            </Routes>
          </BrowserRouter>
          {/* <Toaster /> */}
          <ToastContainer position="bottom-center" />
          <ReactQueryDevtools />
        </SearchContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
