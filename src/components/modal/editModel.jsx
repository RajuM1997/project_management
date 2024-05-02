"use client";
import { Modal } from "antd";

const EditModel = ({
  isEditModalOpen,
  handleOk,
  handleCancelEdit,
  selectedTask,
}) => {
  return (
    <div>
      <Modal
        title={selectedTask?.title}
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <div>
          <input
            type="text"
            className=" h-12 p-2 border outline-0 rounded w-full my-3"
            defaultValue={selectedTask?.title}
          />
          <textarea
            name=""
            id=""
            className=" h-full p-2 border outline-0 rounded w-full"
            defaultValue={selectedTask?.body}
          ></textarea>
          <button className=" bg-orange-500 py-2 px-7 rounded-lg text-small font-bold mt-2">
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EditModel;
