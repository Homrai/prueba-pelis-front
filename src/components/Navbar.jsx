import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark justify-content-between">
        <Link to={"/"} className="navbar-brand ms-sm-5">Peliculas</Link>
    </nav>
  )
}

export default Navbar