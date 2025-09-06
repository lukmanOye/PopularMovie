import { Route, Routes } from 'react-router-dom';
import './css/App.css';

import Moviecard from './components/Moviecard';
import Home from './Pages/Home';
import Favourite from './Pages/Favourite';
import Naviga from './components/Naviga';
import { MovieProvider } from './context/MovieContext';

function App() {
  

  return (
    <>
    <MovieProvider>
    <div>
      <Naviga />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favourite />} />

        </Routes>
      </main>
      </div>
      </MovieProvider>
    </>
  );
}

export default App;
