import { useState } from "react";
import { Toast } from "react-bootstrap";
import React from "react";
import { useEffect } from "react";

export const Toasty = ({ open }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
    }
  }, [open]);

  return (
    <div className="position-absolute ">
      <Toast
        className="position-relative notification "
        show={show}
        onClose={() => setShow(false)}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </div>
  );
};
