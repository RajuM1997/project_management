"use client";
import { Modal } from "antd";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const postProject = async (projectData) => {
  const response = await fetch("/api/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json(); // Parse the response as JSON
};

const AddProjectModel = ({ isAddModalOpen, handleOk, handleCancel }) => {
  const [name, setName] = useState("");
  const mutation = useMutation(postProject);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      name: name,
    };
    mutation.mutate(projectData);
  };

  return (
    <div>
      <Modal
        title={"Add project"}
        open={isAddModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <input
            type="text"
            placeholder="add a project name"
            className=" h-12 p-2 border outline-0 rounded w-full my-3"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className=" bg-orange-500 py-2 px-7 rounded-lg text-small font-bold mt-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddProjectModel;
