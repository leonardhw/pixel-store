import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import { preload } from "../store/actions/preloadAction";
// const baseUrl = "https://gugel-pixel-store.herokuapp.com";
const baseUrl = "http://localhost:4002";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const rawResponse = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLogin),
      });
      const response = await rawResponse.json();
      if (!rawResponse.ok) {
        throw new Error(response.msg);
      }

      Swal.fire({
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(preload(true));

      const username = response.email.split("@")[0];
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("username", username);
      setFormLogin({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      dispatch(preload(false));
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar page={"login"} />

      <section className="mt-5 border p-3 container" id="register-section" style={{ minWidth: 512, maxWidth: 750 }}>
        <div className="row">
          <div className="col pe-4">
            <p className="h2 mb-3 text-uppercase fw-bold">Login</p>
            <p>Log in with your email address and pasword.</p>
            <div className="mb-4 mt-4">
              <div id="buttonDiv"></div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <hr />
              </div>
              <div className="col-auto">OR</div>
              <div className="col">
                <hr />
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input name="email" onChange={handleChange} value={formLogin.email} type="email" className="form-control rounded-0" placeholder="Email Adress" required />
                  <label>Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input name="password" onChange={handleChange} value={formLogin.password} type="password" className="form-control rounded-0" placeholder="Password" required />
                  <label>Password</label>
                </div>
                <button type="submit" className="btn btn-dark rounded-0 fw-semibold mt-3 px-5">
                  LOG IN
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
