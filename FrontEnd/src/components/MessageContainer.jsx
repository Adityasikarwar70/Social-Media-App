import { Flex, Skeleton, SkeletonCircle, useToast } from "@chakra-ui/react"
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedConversationAtom } from "../atoms/messageAtom"
import { userAtom } from "../atoms/userAtom"

const MessageContainer = () => {
  const toast =useToast();
  
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState([]);
  const currentUser = useRecoilValue(userAtom)
  console.log(selectedConversation);


  useEffect(()=>{
    const getMessage = async ()=>{
      try {
        const res =await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if(data.error){
          toast({
            title:"Error",
            status:"error",
            description:data.message,
            duration:3000,
            isClosable:true, 
          });
          return;
        }
        console.log(data);
        setMessage(data);

      } catch (error) {
        toast({
          title:"Error",
          status:"error",
          description:error.message,
          duration:3000,
          isClosable:true, 
           
        });
      }finally{
        setLoading(false)
      }
    }
    getMessage();
  },[selectedConversation.userId, toast])


  return (
    <div className="w-full h-full  ">
          <div className="flex gap-2 items-center font-semibold border-white border-b-[1px] border-opacity-20 px-2 py-1">
            <div className="rounded-full border-[1px] border-white border-opacity-25">

            <img
              src={selectedConversation.userProfilePic}
              alt="pfp"
              className="  w-[45px] h-[45px] rounded-full object-contain "
              />
              </div>
            <h1>{selectedConversation.name}</h1>
          </div>
          <div className=" w-full h-[450px]  flex flex-col gap-4 py-5 px-1 overflow-auto  ">
            {loading &&
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
            {!loading && (
              message.map((messages)=>(
                <MessageItem key={messages} messages={messages} ownMessage={currentUser._id === messages.sender} />
              ))
            )}
            
          </div>
          <MessageInput />
        </div>
  )
}

export default MessageContainer