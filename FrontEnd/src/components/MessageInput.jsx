import { BsSendFill } from "react-icons/bs";
const MessageInput = () => {
  return (
    <form action="" className="w-full border-t-2 border-opacity-20 border-rose-300 pt-2 flex gap-2 items-start  ">
        <textarea name="" placeholder="Start typing..." className="w-full h-[60px] text-white leading-[15px] p-1 bg-transparent focus:outline-none "></textarea>
        <button className="text-3xl p-2 hover:text-rose-300 cursor-pointer rounded-full"><BsSendFill /></button>
    </form>
  )
}

export default MessageInput