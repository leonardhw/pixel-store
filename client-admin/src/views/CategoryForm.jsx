import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryDetail } from "../store/actions/categoryAction";
import { useDispatch } from "react-redux";
import Form from "../components/Form";

export default function CategoryForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let page;

  if (!id) {
    page = "add";
  } else {
    page = "edit";
  }

  // Fetch
  useEffect(() => {
    dispatch(fetchCategoryDetail(id));
  }, []);

  return (
    <section className="container mt-5">
      <div className="d-flex mb-4 justify-content-center">
        <p className="h1 text-uppercase fw-bold">{page === "add" ? "Add Category" : "Edit Category"}</p>
      </div>
      <div className="d-flex justify-content-center">
        <Form page={page} id={id} pages={"categories"} />
      </div>
    </section>
  );
}
