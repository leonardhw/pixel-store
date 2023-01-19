import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategory } from "../store/actions/categoryAction";
import Swal from "sweetalert2";
import { preload } from "../store/actions/preloadAction";
const baseUrl = "http://localhost:4002";
// const baseUrl = "https://gugel-pixel-store.herokuapp.com";

export default function Form({ page, id, pages }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Global State
  const { categoryDetail, categories } = useSelector((state) => state.category);
  const { productDetail } = useSelector((state) => state.product);

  // Local State
  const [formProduct, setFormProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    mainImg: "",
    categoryId: 0,
    images: [],
  });
  const [formCategory, setFormCategory] = useState({
    name: "",
  });
  const [images, setImages] = useState([{ imgUrl: "" }]);

  // Add images input
  const handleAddImage = () => {
    setImages([...images, { imgUrl: "" }]);
  };
  // Handle images array
  const handleImageChange = (e, index) => {
    const { name, value } = e.target;
    const image = [...images];
    image[index][name] = value;
    setImages(image);
    setFormProduct({
      ...formProduct,
      images: image,
    });
  };
  // Delete image input
  const handleRemoveImage = async (index) => {
    const image = [...images];
    image.splice(index, 1);
    setImages(image);
    setFormProduct({
      ...formProduct,
      images: image,
    });
  };

  // Product Add
  const handleSubmitProduct = async (e) => {
    try {
      e.preventDefault();
      const rawResponse = await fetch(`${baseUrl}/products`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formProduct),
      });
      const response = await rawResponse.json();
      if (!rawResponse.ok) {
        throw new Error(response.msg);
      }

      setFormProduct({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        mainImg: "",
        categoryId: 0,
      });
      dispatch(preload(true));
      navigate("/");
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
  };

  // Product Edit
  const handleEditProduct = async (e) => {
    try {
      setFormProduct({
        ...formProduct,
        images: images,
      });
      e.preventDefault();

      const rawResponse = await fetch(`${baseUrl}/products/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formProduct),
      });
      const response = await rawResponse.json();
      if (!rawResponse.ok) {
        throw new Error(response.msg);
      }
      setFormProduct({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        mainImg: "",
        categoryId: 0,
      });
      dispatch(preload(true));
      navigate("/");
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
  };

  // Category Add
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const rawResponse = await fetch(`${baseUrl}/categories`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formCategory),
      });
      const response = await rawResponse.json();
      if (!rawResponse.ok) {
        throw new Error(response.msg);
      }
      dispatch(preload(true));
      setFormCategory({ name: "" });
      navigate("/categories");
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
  };

  // Category Edit
  const handleEdit = async (e) => {
    try {
      e.preventDefault();

      const rawResponse = await fetch(`${baseUrl}/categories/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formCategory),
      });
      const response = await rawResponse.json();
      if (!rawResponse.ok) {
        throw new Error(response.msg);
      }
      dispatch(preload(true));
      setFormCategory({ name: "" });
      navigate("/categories");
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
  };

  // Shared function
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (pages === "categories") {
      setFormCategory({
        ...formCategory,
        [name]: value,
      });
    } else if (pages === "products") {
      setFormProduct({
        ...formProduct,
        [name]: value,
      });
    }
  };

  const handleCancel = (page) => {
    setFormCategory({ name: "" });
    setFormProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      mainImg: "",
      categoryId: 0,
    });
    navigate(page);
  };

  // Fetch
  useEffect(() => {
    if (page === "edit") {
      setImages(productDetail.Images);
      setFormCategory({
        name: categoryDetail.name,
      });
      setFormProduct({
        name: productDetail.name,
        description: productDetail.description,
        price: productDetail.price,
        stock: productDetail.stock,
        mainImg: productDetail.mainImg,
        categoryId: productDetail.categoryId,
        images: images,
      });
    }
  }, [categoryDetail, productDetail]);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  //* Conditional rendering -------------------------------------------------------------
  if (pages === "categories") {
    return (
      <form onSubmit={page === "add" ? handleSubmit : handleEdit}>
        <div className="form-floating mb-1">
          <input onChange={handleChange} name="name" value={formCategory.name} type="text" className="form-control rounded-0" placeholder="Name" required style={{ minWidth: 512 }} />
          <label htmlFor="floatingInput">Category Name</label>
        </div>
        <div className="mt-4">
          <button onClick={() => handleCancel("/categories")} type="button" className="btn border rounded-0 fw-semibold px-5 me-4">
            Cancel
          </button>
          <button type="submit" className="btn btn-dark rounded-0 fw-semibold px-5 ">
            Save
          </button>
        </div>
      </form>
    );
  } else if (pages === "products") {
    return (
      <form onSubmit={page === "add" ? handleSubmitProduct : handleEditProduct}>
        <div className="form-floating mb-3">
          <input name="name" onChange={handleChange} value={formProduct.name} type="text" className="form-control rounded-0" placeholder="Product Name" required style={{ minWidth: 512 }} />
          <label htmlFor="floatingInput">Product Name</label>
        </div>
        <div>
          <select name="categoryId" onChange={handleChange} type="number" value={formProduct.categoryId} className="form-select mb-3 p-3 rounded-0" required>
            <option value="">Select Category</option>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-floating mb-3">
          <input name="description" onChange={handleChange} value={formProduct.description} type="text" className="form-control rounded-0" placeholder="Description" required />
          <label htmlFor="floatingInput">Description</label>
        </div>
        <div className="form-floating mb-3">
          <input name="stock" onChange={handleChange} value={formProduct.stock} type="number" className="form-control rounded-0" placeholder="Stock" required />
          <label htmlFor="floatingInput">Stock</label>
        </div>
        <div className="form-floating mb-3">
          <input name="price" onChange={handleChange} value={formProduct.price} type="number" className="form-control rounded-0" placeholder="Price" required />
          <label htmlFor="floatingInput">Price</label>
        </div>
        <div className="d-flex">
          <img src={formProduct.mainImg} style={{ height: 100, maxHeight: 100, maxWidth: 100 }} alt="" />
          <div className="form-floating input-group mb-3">
            <textarea name="mainImg" onChange={handleChange} value={formProduct.mainImg} className="form-control rounded-0" placeholder="Image URL" rows="3" style={{ height: "100%" }} required></textarea>
            <label htmlFor="floatingTextarea">Main Image URL</label>
          </div>
        </div>
        {/* Add images */}
        {page === "add" &&
          images?.map((x, i) => {
            return (
              <div key={i} className="d-flex">
                {images.length - 1 === i && (
                  <button type="button" onClick={handleAddImage} className="btn btn-sm btn-outline-secondary rounded-0" style={{ height: 100 }}>
                    Add
                  </button>
                )}
                <img src={x.imgUrl} style={{ height: 100, maxHeight: 100, maxWidth: 100 }} alt="" />
                <div className="form-floating input-group mb-3 rounded-0">
                  <input name="imgUrl" placeholder="Image URL" value={x.imgUrl} onChange={(e) => handleImageChange(e, i)} className="form-control rounded-0" required style={{ height: 100 }} />
                  <label htmlFor="floatingInput">Images URL</label>
                  {images.length !== 1 && (
                    <button type="button" onClick={() => handleRemoveImage(i)} className="btn btn-sm btn-danger rounded-0">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        {page === "edit" &&
          images?.map((x, i) => {
            return (
              <div key={i} className="d-flex">
                {images.length - 1 === i && (
                  <button type="button" onClick={handleAddImage} className="btn btn-outline-secondary rounded-0" style={{ height: 100 }}>
                    Add
                  </button>
                )}
                <img src={x.imgUrl} style={{ height: 100, maxHeight: 100, maxWidth: 100 }} alt="" />
                <div className="form-floating input-group mb-3 rounded-0">
                  <input name="imgUrl" placeholder="Image URL" value={x.imgUrl} onChange={(e) => handleImageChange(e, i)} className="form-control rounded-0" required style={{ height: 100 }} />
                  <label htmlFor="floatingInput">Images URL</label>
                  {images.length !== 1 && (
                    <button type="button" onClick={() => handleRemoveImage(i)} className="btn btn-sm btn-danger rounded-0">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        {/* Add spec */}

        {/* Buttons */}
        <button type="button" onClick={() => handleCancel("/")} className="btn btn-outline-dark rounded-0 px-5 me-4">
          Cancel
        </button>
        <button type="submit" className="btn btn-dark rounded-0 px-5">
          Submit
        </button>
      </form>
    );
  }
}
