"use client";
import { Modal } from "antd";

const ViewModal = ({ isModalOpen, handleOk, handleCancel, selectedTask }) => {
  return (
    <div>
      <Modal
        title={selectedTask?.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <p>{selectedTask?.body}</p>
        </div>
      </Modal>
    </div>
  );
};

export default ViewModal;
