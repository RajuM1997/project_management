import { useState } from "react";
import AddProjectModel from "../modal/addProjectModal";

const AddProject = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleCancel = () => {
    setIsAddModalOpen(false);
  };
  const showModal = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="pt-5">
      <div className="flex justify-center items-center">
        <button
          className=" bg-yellow-500 p-2 rounded-lg text-slate-800 font-semibold text-small"
          onClick={showModal}
        >
          Add a Project
        </button>
      </div>
      <AddProjectModel
        isAddModalOpen={isAddModalOpen}
        showModal={showModal}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AddProject;
