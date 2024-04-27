import { GoDotFill } from "react-icons/go";
import { AiFillInstagram } from "react-icons/ai";
import { LuLink } from "react-icons/lu";
import { useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { userAtom } from "../atoms/userAtom";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom);
  const [following, setfollowing] = useState(user.followers.includes(currentUser?._id));
  
  

  const copylink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: `URL Copied`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    });
  };

  const handleFollowUnfollow = async()=>{
    if (!currentUser) {
      toast({
        title: "You Must be Logged in to like a post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return
    }
    try {
      const res = await fetch(`/api/users/follow/${user._id}`,{
        method:"POST",
       headers:{
        "Content-Type":"application/json",
       },
      });
      const data =await res.json();
      if(data.error){
        toast({
          title:"Error",
          status:"error",
          description:data.error,
          duration:3000,
          isClosable:true, 
        });
        return
      }
      console.log(data);
      if(following){
        toast({
          title:"Success",
          status:"success",
          description:`Unfollowed ${user.name}`,
          duration:3000,
          isClosable:true, 
        });
        user.followers.pop();
      }else{
        toast({
          title:"Success",
          status:"success",
          description:`Followed ${user.name}`,
          duration:3000,
          isClosable:true, 
        });
        user.followers.push(currentUser?._id);
      }
      setfollowing(!following);

      
    } catch (error) {
      toast({
        title:"Error",
        status:"error",
        duration:3000,
        isClosable:true, 
         
      });
    }
  }

  return (
    <section>
      <div className=" flex items-center justify-between">
        <div className=" flex flex-col gap-1">
          <h1 className=" text-lg md:text-3xl font-semibold ">{user.name}</h1>
          <div className="flex mt-2 gap-3 text-[10px] md:text-sm items-center">
            <h1>@{user.username}</h1>
            {currentUser?._id === user._id && ( 
              <Link to={'/update'} className="bg-[#131010] hover:bg-[#1c1818] px-2 py-[7px] rounded-lg">Update Profile</Link>
            )
            }
            {currentUser?._id !== user._id && ( 
              <button onClick={handleFollowUnfollow} className="bg-[#452eb6] hover:bg-[#4b3aa0] px-2 py-[7px] font-semibold rounded-lg">{following ? "Unfollow" : "Follow"}</button>
            )
            }
          </div>
        </div>
        <div className=" rounded-full overflow-hidden">
          <img
            src={user.profileimage}
            alt=""
            className=" w-[70px] h-[70px] md:w-[120px] md:h-[120px] object-cover rounded-full"
          />
        </div>
      </div>
      <div>
        <p className=" text-sm md:text-lg">{user.bio}</p>
      </div>
      <div className=" flex items-center mt-3 justify-between">
        <div className=" flex  items-center gap-3  text-gray-600 text-[12px] md:text-lg ">
          <h2>{user.followers.length} follower</h2>
          <GoDotFill />
          <h2>{user.following.length} following</h2>
        </div>

        <div className=" flex items-center gap-2 text-2xl mr-5">
          <AiFillInstagram className=" hover:scale-105 cursor-pointer" />
          <Menu>
            <MenuButton cursor={"pointer"}>
              <LuLink className=" hover:scale-105 cursor-pointer" />
            </MenuButton>
            <MenuList height={10} bg={"#494949"}>
              <MenuItem
                height={5}
                fontSize={15}
                cursor={"pointer"}
                bg={"#494949"}
                as="a"
                onClick={copylink}
              >
                Copy Link
              </MenuItem>
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
