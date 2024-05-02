import { Spin } from "antd";

const Loader = () => {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <Spin />
    </div>
  );
};

export default Loader;
