import { useEffect } from "react";
import TableRow from "../components/TableRow";
import { fetchCategory } from "../store/actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// const baseUrl = "https://gugel-pixel-store.herokuapp.com";
const baseUrl = process.env.REACT_APP_BASE_URL

export default function Category() {
  const navigate = useNavigate();

  // Redux state
  const { categories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.preloader);
  const dispatch = useDispatch();

  // Fetch
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  // Button handler
  const handleNavigate = (page) => navigate(page);

  // Delete handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Do you want to delete this Category?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const rawResponse = await fetch(`${baseUrl}/categories/${id}`, {
            method: "delete",
            headers: { access_token: localStorage.getItem("access_token") },
          });
          if (!rawResponse.ok) {
            throw { msg: "Error di delete category" };
          }

          dispatch(fetchCategory());
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: `${error}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        Swal.fire({
          icon: "success",
          title: `Deleted!`,
          text: "Your selected category has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      {/* Categories */}
      <section className="container mt-5">
        <div className="d-flex justify-content-between mb-4">
          <div>
            <p className="h1 text-uppercase fw-bold">Category List</p>
          </div>
          <div>
            <button onClick={() => handleNavigate("add")} className="rounded-0 btn btn-dark btn-lg">
              +
            </button>
          </div>
        </div>

        {/* Table here */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return <TableRow key={category.id} index={index} category={category} table={"category"} isLoading={isLoading} handleDelete={handleDelete} />;
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
