import { PFP , HOME } from "../utils";

import { TfiMoreAlt } from "react-icons/tfi";

const Posts = () => {
  return (
    <div className="h-full mt-5 flex gap-4 ">
        <div className="flex flex-col items-center gap-2 " >
        <img src={PFP} alt="pfp" className="h-[50px] w-[50px]  md:h-[70px] md:w-[70px] object-cover rounded-full " />
        <div className="w-[1px] h-full bg-white"></div>
        </div>
        <div className="w-3/4 flex flex-col gap-5">
            <div className=" flex items-center justify-between gap-5">
            <h1>Username</h1>
            <div className="flex items-center gap-5">
                <h1>1d</h1>
            <TfiMoreAlt />
            </div>
            </div>
            <h1 className="text-sm text-slate-500 ">Lorem ipsum dolor sit amet.</h1>
            <img src={HOME} alt="Post" className="rounded-md" />
        </div>
    </div>
  )
}

export default Posts
