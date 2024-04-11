import { PFP } from "../utils";
import { GoDotFill } from "react-icons/go";
import { AiFillInstagram } from "react-icons/ai";
import { LuLink } from "react-icons/lu";
import { useToast } from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    
  } from '@chakra-ui/react'


const UserHeader = () => {
    const toast = useToast()

    const copylink = ()=>{
       const currentUrl = window.location.href;
       navigator.clipboard.writeText(currentUrl).then(()=>{
        toast({
            title: `URL Copied`,
            status:"success",
            duration:1000,
            isClosable: true,
          })
       })
    }

  return (
    <section>
      <div className=" flex items-center justify-between">
        <div className=" flex flex-col gap-1">
          <h1 className=" text-lg md:text-3xl font-semibold ">FULL NAME</h1>
          <div className="flex  gap-3 text-[10px] md:text-sm items-center">
            <h1>@Username</h1>
            <h1 className="bg-gray-800 px-2 py-1 rounded-full">instagram.net</h1>
          </div>
        </div>
        <div className=" rounded-full overflow-hidden"><img src={PFP} alt="" className=" w-[50px] h-[50px] md:w-[120px] md:h-[120px] object-cover rounded-full" /></div>
      </div>
      <div>
        <p className=" text-sm md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, quidem.</p>
      </div>
      <div className=" flex items-center mt-3 justify-between">
      <div className=" flex  items-center gap-3  text-gray-600 text-[12px] md:text-lg ">
        <h2>2.5K followers</h2>
        <GoDotFill />
        <a href="#" className=" hover:text-gray-500">Instagram.com</a>
      </div>
      <div className=" flex items-center gap-2 text-2xl mr-5">
        <AiFillInstagram className=" hover:scale-105 cursor-pointer"/>
        <Menu>
  <MenuButton cursor={"pointer"}><LuLink className=" hover:scale-105 cursor-pointer"/></MenuButton>
  <MenuList height={10} bg={"#494949"}>
    <MenuItem height={5} fontSize={15} cursor={"pointer"} bg={"#494949"} as='a' onClick={copylink}>Copy Link</MenuItem>
  </MenuList>
</Menu>
      </div>
      </div>

      <div className="w-full mt-3 flex flex-row">
        <div className="flex flex-1 justify-center border-b-2 py-2 cursor-pointer font-semibold">
            <h1>Posts</h1>
        </div>
        <div className="flex flex-1 justify-center text-gray-600 border-gray-600 border-b-2 cursor-pointer font-semibold">
            <h1>Replies</h1>
        </div>

      </div>
    </section>
  );
};

export default UserHeader;
