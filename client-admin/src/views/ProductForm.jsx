import Form from "../components/Form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductDetail } from "../store/actions/productAction";

export default function ProductForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let page;

  if (!id) {
    page = "add";
  } else {
    page = "edit";
  }

  // fetch detail
  useEffect(() => {
    dispatch(fetchProductDetail(id));
  });

  return (
    <section className="container mt-5">
      <div className="d-flex mb-4 justify-content-center">
        <p className="h1 text-uppercase fw-bold">{page === "add" ? "Add Product" : "Edit Product"}</p>
      </div>
      <div className="d-flex justify-content-center">
        <Form page={page} id={id} pages={"products"} />
      </div>
    </section>
  );
}
