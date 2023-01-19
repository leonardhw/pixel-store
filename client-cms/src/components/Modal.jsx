import React from "react";
import Modal from "react-bootstrap/Modal";

export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="d-flex container-fluid justify-content-center align-content-center">
          <div className="row">
            {props?.product?.Images?.map((image) => {
              return (
                <div key={image.id} className="col p-4 d-flex justify-content-center">
                  <img src={image.imgUrl} style={{ maxHeight: 250, maxWidth: 250 }} alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide} type="button" className="btn border rounded-0 fw-semibold px-5 me-4">
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
