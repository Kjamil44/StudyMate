import React from "react";
import Modal from "../UI/Modal";
import Button from "../button/Button";
import IconDanger from "../UI/SVG Icons/IconDanger";
import "./Buttons.css"

type Props = {
  closeModal: () => void,
  actionHandler: () => void
  item?: any
}

const DeleteConfirmation: React.FC<Props> = ({closeModal, actionHandler, item}) => {
  return (
    <Modal className="container d-flex flex-column justify-content-around py-5" closeModal={closeModal}>
      <IconDanger className="mx-auto mb-3" />
      <div className="mt-1">
        <h1 className="text-center fs-2" style={{color: "#4d716a"}}>Are you sure?</h1>
        <p className="text-center">Do you really want to delete <span style={{wordWrap: 'break-word', fontWeight: "bold", color: "darkslategray"}}>{item}</span>? <br /> This action cannot be undone.</p>
        
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button className="button__cancel" style={{width: "100px"}} buttonType="primary" label="Cancel" onClick={(e)=> {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      }}/>
        <Button className="button__delete" style={{width: "100px"}} buttonType="danger" label="Delete" onClick={(e)=> {
          e.preventDefault();
          e.stopPropagation();
          actionHandler();
        }}/>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
