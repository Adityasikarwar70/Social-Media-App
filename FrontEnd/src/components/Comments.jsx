// import { TfiMoreAlt } from "react-icons/tfi"
// import ActionsButtons from "./ActionsButtons"
// import { useState } from "react";

const Comments = ({reply}) => {
    // const [liked, setLiked] = useState(false);
  return (
    <div className="p-5 border-b-[1px] border-gray-700 border-opacity-30">
      <div className="flex  justify-between">
        <div className="flex items-start gap-5 text-white text-lg">
          <img
            src={reply.userProfilePic}
            alt="pfp"
            className="h-[30px] w-[30px]  md:h-[50px] md:w-[50px] object-cover rounded-full"
          />
          <div>
          <h1 className="text-md font-semibold">{reply.username}</h1>
          <h1 className="text-[15px] font-semibold text-gray-400">
        {reply.text}
      </h1>
      {/* <ActionsButtons liked={liked} setLiked={setLiked} />
      <h1 className=" text-sm font-semibold text-gray-500">{100 + (liked ? 1 : 0)} likes</h1> */}
      </div>
        </div>
        {/* <div className="flex items-start gap-5 text-gray-400">
          <h1>1d</h1>
          <TfiMoreAlt />
        </div> */}
      </div>
      
      
     
    </div>
  )
}

export default Comments
