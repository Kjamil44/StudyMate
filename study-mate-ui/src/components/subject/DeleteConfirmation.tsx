import React from "react";
import Modal from "../UI/Modal";
import Button from "../button/Button";
import IconDanger from "../UI/SVG Icons/IconDanger";

type Props = {
  closeModal: () => void,
  actionHandler: () => void
  item?: any
}

const DeleteConfirmation: React.FC<Props> = ({closeModal, actionHandler, item}) => {
  return (
    <Modal className="container d-flex flex-column justify-content-around py-5">
      <Button className="position-absolute top-0 end-0" buttonType="light" label="X" onClick={closeModal}/>
      <IconDanger className="mx-auto mb-3" />
      <div className="mt-1">
        <h1 className="text-center fs-2">Are you sure?</h1>
        <p className="text-center">Do you really want to delete <span style={{fontWeight: "bold", color: "darkslategray"}}>{item.title}</span>? <br /> This action cannot be undone.</p>
        
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button className="mx-3" style={{width: "100px"}} buttonType="primary" label="Cancel" onClick={closeModal}/>
        <Button className="mx-3" style={{width: "100px"}} buttonType="danger" label="Delete" onClick={actionHandler}/>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
