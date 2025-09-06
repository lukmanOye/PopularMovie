import { Link } from 'react-router-dom';
import '../css/NavBar.css';

function Naviga() {
  return (
    <nav className="navbar">
      <div className="Navbar-brand">
        <Link to={'/'} className="nav-link">
          MovieApp
        </Link>
      </div>
      <div className="nav-items">
        <Link to={'/'} className="nav-link">
          Home
        </Link>
        <Link to={'/favorites'} className="nav-link">
          Favourites
        </Link>
      </div>
    </nav>
  );
}

export default Naviga;
