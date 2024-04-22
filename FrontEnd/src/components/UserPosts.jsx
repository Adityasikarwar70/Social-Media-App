
import ActionsButtons from "./ActionsButtons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

const UserPosts = ({post , postedBy}) => {
    const [liked, setLiked] = useState(false);
    const [user, setUser] = useState(null)
    const toast =useToast();
    const navigate = useNavigate();

    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await fetch('/api/users/profile/'+ postedBy)
                const data = await res.json();
                
                if(data.error){
                    toast({
                        title:"Error",
                        status:"error",
                        duration:3000,
                        description:data.error,
                        isClosable:true,  
                    });
                    return
                }
                setUser(data)
                console.log(data);

            } catch (error) {
                toast({
                    title:"Error",
                    status:"error",
                    duration:3000,
                    isClosable:true,  
                });
                setUser(null)
                
            }
            
        }
        getUser()
    },[postedBy , toast])


  return (
    <Link to={`/${postedBy}/post/${post._id}`} className="w-full" >
      <div className="h-full mt-5 flex gap-4 my-10 ">
        <div className="flex flex-col items-center gap-2 ">
          <img
            src={user?.profileimage}
            onClick={(e)=>{
                e.preventDefault();
                navigate(`/${user.username}`)
            }}
            alt="pfp"
            className="h-[50px] w-[50px]  md:h-[70px] md:w-[70px] object-cover rounded-full "
          />
          <div className="w-[1px] h-full bg-white"></div>
        </div>
        <div className="w-3/4 flex flex-col gap-5">
          <div className=" flex items-center justify-between gap-5">
            <h1 className=" text-xl mt-3 font-semibold" onClick={(e)=>{
                e.preventDefault();
                navigate(`/${user.username}`)
            }} >{user?.name}</h1>
            <div className="flex items-center gap-5">
              <h1 className="text-xs opacity-50">{formatDistanceToNow(new Date(post.createdAt))} ago</h1>
              
            </div>
          </div>
          <h1 className="text-sm text-slate-500 ">
            {post.text}
          </h1>
          {post.image && (

            <img src={post.image} alt="Post" className="rounded-md w-full   md:h-[400px] object-cover" />
          )}
          <ActionsButtons liked={liked} setLiked={setLiked} />
          <div className=" flex items-center  gap-3 text-sm text-gray-500">
            <h1>{post.replies.length} replies</h1>
            <div className="h-[8px] w-[8px] rounded-full bg-gray-500"></div>
            <h1>{post.likes.length} likes</h1>
          </div>
        </div>
      </div>
    </Link>

  );
};

export default UserPosts;
