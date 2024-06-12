import { userAtom } from "../atoms/userAtom.js"
import { useRecoilValue } from "recoil"
import LogoutButton from "./LogoutButton"
import CreatePost from "./CreatePost"
import {Link} from "react-router-dom"
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BsChatDotsFill } from "react-icons/bs";

 
const Header = () => {
  const users = useRecoilValue(userAtom)

  return (
    <div className="flex flex-col ">
    <nav className=" w-full my-5 text-center text-2xl font-semibold text-white flex items-center justify-between ">
        <img src="/assets/LOGO2.png" alt="LOGO" className=" h-[30px]" />
        <div className=" flex gap-2">
        {!users && (
          <Link to={'/auth'} className="bg-blue-700 text-sm px-2 py-2  rounded-md hover:bg-blue-800 drop-shadow-xl">
          SignIn
          </Link>
        )}
        {users && <CreatePost />}
        {users && <LogoutButton/>}
        </div>
        
    </nav>
    
      {users && (
        <div className=" text-3xl text-white  flex flex-row  items-center justify-between px-5 pb-2 mb-2 border-gray-600 border-b-2 border-opacity-25">
          <Link to={'/'}>
          <AiFillHome className=" hover:text-gray-200 " />
          </Link>
          <div className=" flex items-center justify-between gap-10">
          <Link to={`${users.username}`}>
          <CgProfile className=" hover:text-gray-200 " />
          </Link>
          <Link to={'/chat'}>
          <BsChatDotsFill className=" hover:text-gray-200 text-rose-300 " />
          </Link>

          </div>
        </div>
      )}
    
    </div>
  )
}

export default Header