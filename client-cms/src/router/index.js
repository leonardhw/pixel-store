import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Product from "../views/Product";
import ProductForm from "../views/ProductForm";
import Category from "../views/Category";
import CategoryForm from "../views/CategoryForm";
import RegisterAdmin from "../views/RegisterAdmin";
import ErrorPage from "../views/errorPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const isLogin = localStorage.getItem("access_token");
      if (isLogin) return redirect("/");
    },
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: () => {
      const isLogin = localStorage.getItem("access_token");
      if (!isLogin) return redirect("/login");
    },
    children: [
      {
        path: "",
        element: <Product />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "products/add",
        element: <ProductForm />,
      },
      {
        path: "products/:id",
        element: <ProductForm />,
      },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "categories/add",
        element: <CategoryForm />,
      },
      {
        path: "categories/:id",
        element: <CategoryForm />,
      },
      {
        path: "register-admin",
        element: <RegisterAdmin />,
      },
    ],
  },
]);

export default router;
