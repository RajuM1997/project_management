"use client";
import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  FolderViewOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import useProjectStore from "@/store/projectStore";
import ProjectHeader from "@/components/projectHeader/projectHeader";
import ViewModal from "@/components/modal/viewModal";
import EditModel from "@/components/modal/editModel";
import AddTask from "@/components/modal/AddTask";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/loader/loader";

const fetchTasks = async () => {
  const response = await fetch("/api/task", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json(); // Return the JSON data
};

const ProjectDetailsTask = ({ params }) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { slug } = params;

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(task));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData("text/plain"));
    const updatedTasks = tasks.map((task) =>
      task.id === droppedTask.id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const showModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const showEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };
  const renderTasks = (status) => {
    return data
      ?.filter((task) => task.status === status)
      ?.map((task) => (
        <>
          {task.projectName === slug && (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              className="bg-slate-800 p-5 rounded-md mb-5 text-white"
            >
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-justify py-3 text-sm">{task.body}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="text-amber-600 bg-green-400 p-1 rounded-full w-9 h-9 flex justify-center items-center">
                    <FolderViewOutlined
                      className="text-xl cursor-pointer"
                      onClick={() => showModal(task)}
                    />
                  </div>
                  <p className=" text-sm">
                    Status:{" "}
                    <span className=" font-semibold">{task.status}</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="text-amber-600 bg-green-400 p-1 rounded-full w-9 h-9 flex justify-center items-center">
                    <EditOutlined
                      className="text-xl cursor-pointer"
                      onClick={() => showEditModal(task)}
                    />
                  </div>
                  <div className="text-red-600 bg-green-400 p-1 rounded-full w-9 h-9 flex justify-center items-center">
                    <DeleteOutlined className="text-xl cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ));
  };
  const filterData = data?.filter((item) => item.projectName === slug);
  const allMembers = filterData?.flatMap((task) => task.members);
  const uniqueMembers = [...new Set(allMembers)];
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };
  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div>
      <ProjectHeader uniqueMembers={uniqueMembers} />
      <div className="grid grid-cols-3 gap-4 p-5 mt-14" onClick={showAddModal}>
        <div></div>
        <div className="border flex flex-col justify-center items-center p-10 rounded cursor-pointer">
          <FolderAddOutlined className=" text-2xl" />
          Add a new task
        </div>
        <div></div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-3 gap-4 p-5 mt-14">
          {/* do column */}
          <div
            className=" bg-slate-700 p-5 rounded-md"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "todo")}
          >
            <h5 className="text-center text-xl mb-4 font-bold">To do</h5>
            {renderTasks("todo")}
          </div>

          {/* In Progress column */}
          <div
            className=" bg-slate-700 p-5 rounded-md"
            onDragOver={handleDragOver} // Allow drag over
            onDrop={(e) => handleDrop(e, "inProgress")} // Handle drop event
          >
            <h5 className="text-center text-xl mb-4 font-bold">In Progress</h5>
            {renderTasks("inProgress")}
          </div>

          {/* Done column */}
          <div
            className=" bg-slate-700 p-5 rounded-md"
            onDragOver={handleDragOver} // Allow drag over
            onDrop={(e) => handleDrop(e, "done")} // Handle drop event
          >
            <h5 className="text-center text-xl mb-4 font-bold">Done</h5>
            {renderTasks("done")}
          </div>

          <ViewModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            showModal={showModal}
            handleOk={handleOk}
            handleCancel={handleCancel}
            selectedTask={selectedTask}
          />
          <EditModel
            isEditModalOpen={isEditModalOpen}
            showModal={showModal}
            handleOk={handleOk}
            handleCancelEdit={handleCancelEdit}
            selectedTask={selectedTask}
          />
        </div>
      )}
      <AddTask
        isAddModalOpen={isAddModalOpen}
        showModal={showAddModal}
        handleOk={handleOk}
        handleCancel={handleAddCancel}
      />
    </div>
  );
};

export default ProjectDetailsTask;
