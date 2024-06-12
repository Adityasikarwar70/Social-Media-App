import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messageAtom";
import { userAtom } from "../atoms/userAtom";

 
const MessageItem = ({ownMessage , messages}) => {
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
  const currentUser = useRecoilValue(userAtom)
  console.log(currentUser);
  return (
    <>
    {ownMessage ? (
      <div className="flex flex-row items-end gap-1 w-full  justify-end  ">
        <h1 className="max-w-[300px] bg-purple-600 bg-opacity-25 p-2 rounded-lg rounded-br-none">{messages.text}</h1>
        <div className="rounded-full border-[1px] border-white border-opacity-25">

        <img src={currentUser.profileimage} alt="pfp" className="w-[40px] h-[40px] rounded-full object-contain" />
        </div>
      </div>
    ) : (
      <div className="flex flex-row items-end gap-1 w-full  justify-start  ">
        <div className="rounded-full border-[1px] border-white border-opacity-25">

        <img src={selectedConversation.userProfilePic} alt="pfp" className="w-[40px] h-[40px] rounded-full object-contain  " />
        </div>
        <h1 className="max-w-[280px] bg-purple-600 p-2 rounded-lg rounded-bl-none">{messages.text}</h1>
      </div>
    )}

    </>
  )
}

export default MessageItem