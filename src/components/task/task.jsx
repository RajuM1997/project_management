"use client";
import React, { useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import ViewModal from "../modal/viewModal";
import EditModel from "../modal/editModel";
import ProjectHeader from "../projectHeader/projectHeader";

const initialData = [
  {
    id: 1,
    title: "Price Issue",
    body: "Lorem ipsum dolor sit amet...",
    status: "todo",
    members: ["User1", "User2"],
    project: "Tour lover",
  },
  {
    id: 2,
    title: "Price Issue 2",
    body: "Lorem ipsum dolor sit amet...",
    status: "todo",
    members: ["User3", "User1"],
    project: "Tour lover",
  },
  {
    id: 3,
    title: "Price Issue 3",
    body: "Lorem ipsum dolor sit amet...",
    status: "todo",
    members: ["User4", "User2"],
    project: "Tour lover",
  },
  {
    id: 4,
    title: "Warehouse Issue",
    body: "Lorem ipsum dolor sit amet...",
    status: "todo",
    members: ["User1", "User2"],
    project: "Warehouse",
  },
  {
    id: 5,
    title: "Warehouse Issue 2",
    body: "Lorem ipsum dolor sit amet...",
    status: "todo",
    members: ["User3", "User1"],
    project: "Warehouse",
  },
  {
    id: 6,
    title: "Warehouse Issue 3",
    body: "Lorem ipsum dolor sit amet...",
    status: "todo",
    members: ["User4", "User2"],
    project: "Warehouse",
  },
];

const Task = () => {
  const [tasks, setTasks] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <>
          {task.project && (
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

  return (
    <div>
      <ProjectHeader />
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
    </div>
  );
};

export default Task;
