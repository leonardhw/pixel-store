import Spinner from "react-bootstrap/Spinner";
import React from "react";

export default function Preloader() {
  return (
    <div className="d-flex justify-content-center align-items-center text-center" style={{ position: "fixed", width: "100%", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: `rgba(255, 255, 255, 0.7)`, zIndex: 9999 }}>
      <div className="container text-center">
        <Spinner animation="border" role="status" style={{ height: 200, width: 200 }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
}
