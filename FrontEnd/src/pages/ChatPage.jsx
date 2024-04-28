import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import Message from "../components/Message";
import { BiSolidMessageSquareX } from "react-icons/bi";
import MessageItem from "../components/MessageItem";

const ChatPage = () => {
  return (
    <div className=" flex flex-row gap2 items-center text-white">
      <div className=" flex flex-col gap-2  w-[220px] h-[550px] border-white border-r-[1px] border-opacity-10">
        <h1 className="">Messages</h1>
        <form className="flex items-center border-b-[1px] border-white border-opacity-50 mr-1">
          <input
            type="text"
            placeholder="Search"
            className="py-2 pr-1 text-gray-4ac00 bg-transparent  focus:outline-none"
          />
          <MdOutlineScreenSearchDesktop className="text-2xl cursor-pointer hover:text-gray-700 " />
        </form>
        <div className=" px-2 flex flex-col gap-4">
          {false &&
            [0, 1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="rounded-full">
                  <SkeletonCircle size={"10"} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Skeleton h={"10px"} w={"100px"} />
                  <Skeleton h={"8px"} w={"120px"} />
                </div>
              </div>
            ))}
        </div>
        <div className=" flex flex-col gap-2">
          <Message />
          <Message />
          <Message />
        </div>
      </div>
      <div className="  w-[500px] h-[550px] px-2 ">
        {false && (
          <>
            <h1 className="">Messages</h1>
            <div className=" w-full h-full flex flex-col items-center justify-center gap-5 text-gray-700">
              <BiSolidMessageSquareX className=" text-6xl" />
              <h1 className="text-2xl">Select any message</h1>
            </div>
          </>
        )}

        <div className="w-full h-full  ">
          <div className="flex gap-2 items-center font-semibold border-white border-b-[1px] border-opacity-20 p-2">
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
              alt="pfp"
              className="w-[45px]"
            />
            <h1>Aditya Singh</h1>
          </div>
          <div className=" w-full h-[450px]  flex flex-col gap-4 py-5 overflow-auto  no-scrollbar">
            {false &&
              [...Array(20)].map((_, i) => (
                <Flex
                  key={i}
                  gap={3}
                  alignItems={"center"}
                  p={1}
                  borderRadius={"md"}
                  alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
                >
                  {i % 2 === 0 && <SkeletonCircle size={7} />}
                  <div className=" flex flex-col gap-2">
                    <Skeleton h="8px" w="250px" />
                    <Skeleton h="8px" w="250px" />
                    <Skeleton h="8px" w="250px" />
                  </div>
                  {i % 2 !== 0 && <SkeletonCircle size={7} />}
                </Flex>
              ))}
              <MessageItem/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
