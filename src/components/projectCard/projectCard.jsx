"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  EditOutlined,
  DeleteOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Loader from "../loader/loader";
import EditProject from "../modal/editProject";
import { useState } from "react";

const fetchProjects = async () => {
  const response = await fetch("/api/project", {
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

const deleteProject = async (id) => {
  try {
    const response = await fetch(`/api/project`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    console.log({ response });
    if (!response.ok) {
      const errorText = await response.text(); // Get additional error information
      throw new Error(`Request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json(); // Parse the response as JSON
    return data; // Return the parsed data
  } catch (error) {
    console.error("Error during DELETE request:", error);
    throw error; // Re-throw the error to handle it in the mutation
  }
};

const ProjectCard = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["projects"], // Correct query key format
    queryFn: fetchProjects, // The function to fetch data
  });

  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showModal = (data) => {
    setEditData(data);
    setIsEditModalOpen(true);
  };
  const handleCancel = () => {
    setIsEditModalOpen(false);
    setEditData(null);
  };
  const handleDelete = (id) => {
    deleteProject(id);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        data?.map((item) => (
          <div
            draggable
            className="bg-slate-800 p-5 rounded-md mb-5 text-white"
            key={item.id}
          >
            <h3 className="font-bold py-3">{item.name}</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className=" text-slate-50 bg-green-600 p-1 rounded-full w-9 h-9 flex justify-center items-center">
                  <Link href={`/project/${item?.name}`}>
                    <FolderViewOutlined className="text-xl cursor-pointer" />
                  </Link>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-slate-50 bg-green-600 p-1 rounded-full w-9 h-9 flex justify-center items-center">
                  <EditOutlined
                    className="text-xl cursor-pointer"
                    onClick={() => showModal(item)}
                  />
                </div>
                <div className="text-red-600 bg-green-600 p-1 rounded-full w-9 h-9 flex justify-center items-center">
                  <DeleteOutlined
                    className="text-xl cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <EditProject
        isEditModalOpen={isEditModalOpen}
        handleCancel={handleCancel}
        showModal={showModal}
        editData={editData}
      />
    </>
  );
};

export default ProjectCard;
