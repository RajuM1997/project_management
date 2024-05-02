"use client";
import { Modal } from "antd";

const AddTask = ({ isAddModalOpen, handleOk, handleCancel }) => {
  return (
    <div>
      <Modal
        title={"add project"}
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <input
            type="text"
            className=" h-12 p-2 border outline-0 rounded w-full my-3"
          />
          <textarea
            name=""
            id=""
            className=" h-full p-2 border outline-0 rounded w-full"
          ></textarea>
          <button className=" bg-orange-500 py-2 px-7 rounded-lg text-small font-bold mt-2">
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddTask;
