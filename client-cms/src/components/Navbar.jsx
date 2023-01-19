import logo from "../logo.png";
import profilePic from "../user.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar({ page }) {
  const navigate = useNavigate();

  // Logout
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3898/3898671.png",
      imageWidth: 150,
      imageHeight: 150,
      title: `Bye, see you again!`,
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.clear();
    navigate("/login");
  };

  let activeClassName = "active text-decoration-underline nav-link link-dark px-2 text-uppercase fw-bold";

  if (page === "dashboard") {
    return (
      <header className="p-3 border-bottom mb-5">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="d-inline-flex gap-4">
              <Link to="/">
                <img src={logo} style={{ height: 40 }} />
              </Link>

              <ul className="nav me-auto gap-4">
                <li className="nav-item">
                  <NavLink to="/" className={({ isActive }) => (isActive ? activeClassName : "nav-link link-dark px-2 text-uppercase fw-bold")}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="categories" className={({ isActive }) => (isActive ? activeClassName : "nav-link link-dark px-2 text-uppercase fw-bold")}>
                    Category
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="register-admin" className={({ isActive }) => (isActive ? activeClassName : "nav-link link-dark px-2 text-uppercase fw-bold")}>
                    Register Admin
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="d-inline-flex align-items-center">
              <span className="me-3 fw-bold text-capitalize">Hello, {localStorage.username}!</span>
              <div className="dropdown text-end">
                <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={profilePic} alt="mdo" className="rounded-circle" style={{ height: 40 }} />
                </a>
                <ul className="dropdown-menu text-small rounded-0">
                  <li>
                    <button onClick={handleLogout} className="dropdown-item" href="#">
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  if (page === "login") {
    return (
      <header className="p-3 border-bottom mb-5">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="d-inline-flex gap-4">
              <img src={logo} style={{ height: 40 }} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
