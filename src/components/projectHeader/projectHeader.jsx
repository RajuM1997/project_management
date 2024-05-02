import { useState } from "react";

const ProjectHeader = ({ uniqueMembers }) => {
  const [value, setValue] = useState("");
  const [shawMembers, setShawMembers] = useState(false);
  const [shawActivities, setShawActivities] = useState(false);
  return (
    <div className="main_layout ml-auto bg-slate-700">
      <div className=" flex justify-between items-center px-6 py-2">
        <div>
          <div className="flex gap-1 relative">
            {uniqueMembers?.slice(0, 2)?.map((item) => (
              <div
                key={item}
                className=" h-12 w-12 bg-slate-200 p-2 rounded-full flex justify-center items-center"
              >
                <h6 className=" text-sm text-black ">{item.slice(0, 2)}</h6>
              </div>
            ))}
            <div className=" h-12 w-12 bg-slate-200 p-2 rounded-full flex justify-center items-center">
              <h6
                className=" text-sm text-black cursor-pointer"
                onClick={() => setShawMembers((prev) => !prev)}
              >
                More
              </h6>
            </div>
          </div>
          {shawMembers && (
            <div className=" bg-slate-100 text-black p-2 rounded absolute">
              <ul className="">
                {uniqueMembers.map((item) => (
                  <li key={item} className="py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            className="h-10 p-2 border outline-0 rounded w-full my-3"
            placeholder="search here"
            value={value}
            onClick={(e) => setValue(e.target.value)}
          />
        </div>
        <div className=" relative">
          <button onClick={() => setShawActivities((prev) => !prev)}>
            Activities
          </button>
          {shawActivities && (
            <div className="bg-slate-800 absolute right-2 w-fit">
              <div className="w-60 h-full bg-slate-600  p-2 m-2 rounded">
                <h5 className=" text-base">title</h5>
                <p className=" text-xs py-1">Lorem ipsum dolor sit,</p>
                <p className=" text-xs">date</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
