import { FaCircle } from "react-icons/fa";


const Message = () => {
  return (
    

    <div  className="flex items-center gap-3 hover:bg-gray-900 rounded-md p-1 ">
                <div className=" relative rounded-full">
                  <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="pfp" className="w-[45px]" />
                  <FaCircle className="absolute bottom-0 right-0 text-green-500  border-[3px] text-lg border-black rounded-full" />
                  
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-sm font-bold  ">Aditya Singh</h1>
                  <h1 className="text-[12px] font-normal ">Hello bhay Kaisa ...</h1>
                </div>
              </div>
  
  )
}

export default Message