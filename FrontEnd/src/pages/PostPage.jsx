import { TfiMoreAlt } from "react-icons/tfi";
import ActionsButtons from "../components/ActionsButtons";
import { useState } from "react";
import { Divider } from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";
import Comments from "../components/Comments";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <section className="flex flex-col gap-3 text-white ">
      <div className="flex  justify-between mt-10 ">
        <div className="flex items-center gap-5 text-white text-lg">
          <img
            src="/assets/aditya.jpg"
            alt="pfp"
            className="h-[50px] w-[50px]  md:h-[60px] md:w-[60px] object-cover rounded-full"
          />
          <h1>USERNAME</h1>
        </div>
        <div className="flex items-center gap-5 text-gray-400">
          <h1>1d</h1>
          <TfiMoreAlt />
        </div>
      </div>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
        dolore!
      </h1>
      <img src="/assets/home.jpg" alt="image" className=" rounded-lg" />
      <div>
        <ActionsButtons liked={liked} setLiked={setLiked} />
      </div>
      <div className=" flex items-center  gap-3 text-sm text-gray-500">
        <h1> 101 replies</h1>
        <div className="h-[8px] w-[8px] rounded-full bg-gray-500"></div>
        <h1> {201 + (liked ? 1 : 0)} likes</h1>
      </div>
      <Divider />
      <div className="flex justify-end">
        <div className=" flex  items-center gap-3 p-1 pl-2 bg-slate-900 rounded-full">
          <h1>Get Notifications</h1>
          <button className=" p-2 bg-slate-500 hover:bg-black hover:text-yellow-600 rounded-full"><IoNotifications /></button>
        </div>
      </div>
      <Comments/>
      <Comments/>
      <Comments/>
      <Comments/>
      <Comments/>
      <Comments/>
    </section>
  );
};

export default PostPage;
