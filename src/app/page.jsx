import Sidebar from "@/components/sidebar/sidebar";
import Task from "@/components/task/task";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="main_layout ml-auto">
        <div className="container mx-auto">
          <Task />
        </div>
      </div>
    </main>
  );
}
