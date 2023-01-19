import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { preload } from "../store/actions/preloadAction";
const baseUrl = "http://localhost:4002";
// const baseUrl = "https://gugel-pixel-store.herokuapp.com";

export default function RegisterAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
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

      const rawResponse = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formLogin),
      });
      const response = await rawResponse.json();
      if (!rawResponse.ok) {
        throw new Error(response.msg);
      }

      Swal.fire({
        icon: "success",
        title: "Register new admin successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormLogin({
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: `${error}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleCancel = () => {
    setFormLogin({
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    });
    navigate("/");
  };
  useEffect(() => {
    dispatch(preload(false));
  }, []);

  return (
    <>
      <section className="mt-5">
        <p className="h1 mb-4  fw-bold text-center">Register New Admin</p>
        <div className="p-3 mt-4 border d-flex container justify-content-center" style={{ width: 600 }}>
          <form onSubmit={handleSubmit}>
            <label className="d-flex justify-content-end" style={{ color: "red" }}>
              *
            </label>
            <div className="form-floating mb-1">
              <input onChange={handleChange} name="email" type="email" value={formLogin.email} className="form-control rounded-0" placeholder="Email" required style={{ minWidth: 512 }} />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <label className="d-flex justify-content-end" style={{ color: "red" }}>
              *
            </label>
            <div className="form-floating mb-1">
              <input onChange={handleChange} name="password" type="password" value={formLogin.password} className="form-control rounded-0" placeholder="Password" required style={{ minWidth: 512 }} />
              <label htmlFor="">Password</label>
            </div>
            <label className="d-flex justify-content-end" style={{ color: "red" }}>
              *
            </label>
            <div className="form-floating mb-1">
              <input onChange={handleChange} name="phoneNumber" type="number" value={formLogin.phoneNumber} className="form-control rounded-0" placeholder="Phone Number" style={{ minWidth: 512 }} />
              <label htmlFor="floatingInput">Phone Number</label>
            </div>
            <label className="d-flex justify-content-end" style={{ color: "red" }}>
              *
            </label>
            <div className="form-floating mb-3">
              <textarea onChange={handleChange} name="address" className="form-control rounded-0" value={formLogin.address} placeholder="Address" rows="4" style={{ minWidth: 512, height: "100%" }}></textarea>
              <label htmlFor="floatingTextarea">Address</label>
            </div>
            <div className="mt-4">
              <button onClick={handleCancel} type="button" className="btn border rounded-0 fw-semibold px-5 mx-2">
                Cancel
              </button>
              <button type="submit" className="btn btn-dark rounded-0 fw-semibold px-5 mx-2">
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
