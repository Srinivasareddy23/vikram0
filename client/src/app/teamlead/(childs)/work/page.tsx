import Link from "next/link";
import React from "react";
import AssignWork from "@/components/teamlead/assignWork";

const Work = () => {

  return (
    <div className="container mx-auto p-6">
      <Link href={'/teamlead/work/assignedworks'}>
      <button className="text-xl rounded-lg text-center float-right bg-blue-500 hover:bg-blue-700 text-white mb-10 p-2">
        Assigned Works
      </button>
      </Link>
       
     <AssignWork />
    </div>
  );
};

export default Work;
