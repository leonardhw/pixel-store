import React from "react";
import { useEffect } from "react";
import TableRow from "../components/TableRow";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../store/actions/productAction";
import { useNavigate } from "react-router-dom";
import { fetchImage } from "../store/actions/imageAction";
import Swal from "sweetalert2";
import { preload } from "../store/actions/preloadAction";
// const baseUrl = "https://gugel-pixel-store.herokuapp.com";
const baseUrl = "http://localhost:4002";

export default function Product() {
  const navigate = useNavigate();

  // Redux state
  const { isLoading } = useSelector((state) => state.preloader);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // Button handler
  const handleNavigate = (page) => navigate(page);

  // Fetch
  useEffect(() => {
    dispatch(fetchImage());
    dispatch(fetchProduct());
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Do you want to delete this Product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const rawResponse = await fetch(`${baseUrl}/products/${id}`, {
            method: "delete",
            headers: { access_token: localStorage.getItem("access_token") },
          });
          const response = await rawResponse.json();
          if (!rawResponse.ok) {
            throw new Error(response.msg);
          }

          dispatch(fetchProduct());
          dispatch(preload(true));
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: `${error}`,
            showConfirmButton: false,
            timer: 1500,
          });
        } finally {
          dispatch(preload(false));
        }
        Swal.fire({
          icon: "success",
          title: `Deleted!`,
          text: "Your selected product has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      {/* Products */}
      <section className="container mt-5">
        <div className="d-flex justify-content-between mb-4">
          <div>
            <p className="h1 text-uppercase fw-bold">Product List</p>
          </div>
          <div>
            <button onClick={() => handleNavigate("products/add")} className="rounded-0 btn btn-dark btn-lg">
              +
            </button>
          </div>
        </div>

        {/* Table here */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col" style={{ width: "13%" }}>
                Name
              </th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Created By</th>
              <th scope="col">Main Image</th>
              {/* <th scope="col">Specs</th> */}
              <th scope="col">Images</th>
              <th scope="col" style={{ width: "8.5%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return <TableRow key={product.id} index={index} product={product} table={"product"} isLoading={isLoading} handleDelete={handleDelete} />;
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
