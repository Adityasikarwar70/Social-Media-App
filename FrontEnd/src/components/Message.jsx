import { FaCircle } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/messageAtom";
import { Flex, useColorMode } from "@chakra-ui/react";

const Message = ({ conversation }) => {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const colorMode = useColorMode();


  console.log(selectedConversation);
  return (
    <Flex
      className="flex items-center gap-3 hover:bg-gray-900 rounded-md p-1 cursor-pointer mr-1  "
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          name:user.name,
          userProfilePic: user.profileimage,
          username: user.username,
          mock: conversation.mock, 
        })
      }
      bg={selectedConversation?._id === conversation._id ? (colorMode==="light" ? "gray.900":"gray.900"):""}
    >
      <div className=" relative rounded-full border-[1px] border-white border-opacity-25">
        <img
          src={user.profileimage}
          alt="pfp"
          className="w-[45px] h-[45px] rounded-full object-contain  "
        />
        <FaCircle className="absolute bottom-0 right-0 text-green-500  border-[3px] text-lg border-black rounded-full" />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-sm font-bold  ">
          {user.name.length > 15 ? user.username : user.name}
        </h1>
        <div className="flex items-center gap-1 ">
          {currentUser._id === lastMessage.sender ? (
            <BsCheck2All className="text-[15px] mt-1" />
          ) : (
            ""
          )}
          <h1 className="text-[12px] font-normal ">
            {lastMessage.text.length > 18
              ? lastMessage.text.substring(0, 18) + "..."
              : lastMessage.text}
          </h1>
        </div>
      </div>
    </Flex>
  );
};

export default Message;
