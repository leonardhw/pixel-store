import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./Modal";

export default function TableRow({ product, table, index, category, isLoading, handleDelete }) {
  // Modal trigger
  const [modalShow, setModalShow] = React.useState(false);

  // Conditional rendering
  if (table === "product") {
    return (
      <>
        {/* Table row */}
        {isLoading && (
          <tr>
            <th colSpan="8">
              <h1>Loading..</h1>
            </th>
          </tr>
        )}
        <tr>
          <th>{index + 1}</th>
          <th className="text-start text-capitalize">{product.name}</th>
          <td className="text-capitalize">{product?.Category?.name}</td>
          <td>{product.price}</td>
          <td>{product?.User?.email}</td>
          <td>
            <img src={product.mainImg} style={{ width: "150px" }} alt="" />
          </td>
          <td>
            <Button variant="primary" onClick={() => setModalShow(true)} className="rounded-0 btn btn-dark btn-sm">
              Show images
            </Button>

            {/* Modal */}
            <MyVerticallyCenteredModal product={product} show={modalShow} onHide={() => setModalShow(false)} />
          </td>
          <td>
            <Link to={`/products/${product.id}`} className="btn bi bi-pencil-square" style={{ color: "black", fontSize: 20 }}></Link>
            <button onClick={() => handleDelete(product.id)} className="btn bi bi-trash" style={{ color: "red", fontSize: 20 }}></button>
          </td>
        </tr>
      </>
    );
  }
  if (table === "category") {
    return (
      <>
        {isLoading && (
          <tr>
            <th colSpan="8">
              <h1>Loading..</h1>
            </th>
          </tr>
        )}
        <tr>
          <th>{index + 1}</th>
          <th className="text-start text-capitalize">{category.name}</th>
          <td>{category.createdAt}</td>
          <td>{category.updatedAt}</td>
          <td>
            <Link to={`/categories/${category.id}`} className="btn bi bi-pencil-square" style={{ color: "black", fontSize: 20 }}></Link>
            <button className="btn bi bi-trash" onClick={() => handleDelete(category.id)} style={{ color: "red", fontSize: 20 }}></button>
          </td>
        </tr>
      </>
    );
  }
}
