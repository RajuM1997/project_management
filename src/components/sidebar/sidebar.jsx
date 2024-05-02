"use client";
import useProjectStore from "@/store/projectStore";
import {
  ProjectOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { Button, Menu } from "antd";
import Link from "next/link";
import { useState } from "react";

const items = [
  {
    key: "sub2",
    label: "Project",
    icon: <ProjectOutlined />,
    children: [
      { key: "5", label: "Tour lover" },
      { key: "6", label: "Warehouse" },
      { key: "7", label: "Project 3" },
      { key: "8", label: "Project 4" },
    ],
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={
        collapsed
          ? "sidebar_bg fixed top-0 min-h-full pt-5"
          : "sidebar_bg_after  pt-5"
      }
    >
      <div>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
          className="ml-3"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>

        <div className="menu_item">
          <ul className=" mx-3 my-1">
            <li>
              <Link
                href={"/project"}
                className=" text-small mx-auto text-center"
              >
                Project
              </Link>
            </li>
            <li>
              <Link href={"/"} className=" text-small mx-auto text-center">
                list of Project
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
