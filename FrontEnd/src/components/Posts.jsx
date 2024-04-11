import { PFP } from "../utils";

import { TfiMoreAlt } from "react-icons/tfi";
import ActionsButtons from "./ActionsButtons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Posts = ({postImg ,postTitle,likes,replies}) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/user/post/1"}>
      <div className="h-full mt-5 flex gap-4 my-10 ">
        <div className="flex flex-col items-center gap-2 ">
          <img
            src={PFP}
            alt="pfp"
            className="h-[50px] w-[50px]  md:h-[70px] md:w-[70px] object-cover rounded-full "
          />
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
          <h1 className="text-sm text-slate-500 ">
            {postTitle}
          </h1>
          {postImg && (

            <img src={postImg} alt="Post" className="rounded-md" />
          )}
          <ActionsButtons liked={liked} setLiked={setLiked} />
          <div className=" flex items-center  gap-3 text-sm text-gray-500">
            <h1>{replies} replies</h1>
            <div className="h-[8px] w-[8px] rounded-full bg-gray-500"></div>
            <h1>{likes} likes</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Posts;
