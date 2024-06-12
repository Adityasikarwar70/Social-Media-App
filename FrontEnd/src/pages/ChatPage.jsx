import { Skeleton, SkeletonCircle, useToast } from "@chakra-ui/react";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import Message from "../components/Message";
import { BiSolidMessageSquareX } from "react-icons/bi";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { conversationsAtom, selectedConversationAtom } from "../atoms/messageAtom";
import MessageContainer from "../components/MessageContainer"; 
 
const ChatPage = () => {
  const toast = useToast();
  const [loadingConversations, setLoadingConversations] = useState(true)
  const [conversations, setConversations] = useRecoilState(conversationsAtom)
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  


  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();
        if (data.error) {
          toast({
            title: "Error",
            status: "error",
            description: data.error,
            duration: 3000,
            isClosable: true,
          });
          return;
        }
        setConversations(data)
      } catch (error) {
        toast({
          title: "Error",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }finally{
        setLoadingConversations(false)
      }
    };
    getConversations();
  }, [setConversations, toast]);
  console.log(conversations);

  return (
    <div className=" flex flex-row  items-center  text-white">
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
          {loadingConversations &&
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
          {!loadingConversations && (
            conversations.map(conversation =>(
              <Message key={conversation._id} conversation={conversation} />
            ))
          )
          }
        </div>
      </div>
      <div className="  w-[500px] h-[550px] px-2 ">
        {!selectedConversation._id && (
          <>
            <h1 className="">Messages</h1>
            <div className=" w-full h-full flex flex-col items-center justify-center gap-5 text-gray-700">
              <BiSolidMessageSquareX className=" text-6xl" />
              <h1 className="text-2xl">Select any message</h1>
            </div>
          </>
        )}

          { selectedConversation._id && <MessageContainer/>}
      </div>
    </div>
  );
};

export default ChatPage;
