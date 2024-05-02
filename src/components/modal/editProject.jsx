"use client";

import { Modal } from "antd";

const EditProject = ({ isEditModalOpen, handleOk, handleCancel, editData }) => {
  return (
    <div>
      <Modal
        title={editData?.name}
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <input
            type="text"
            className=" h-12 p-2 border outline-0 rounded w-full my-3"
            defaultValue={editData?.name}
          />
          <button className=" bg-orange-500 py-2 px-7 rounded-lg text-small font-bold mt-2">
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EditProject;
