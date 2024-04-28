
import ActionsButtons from "./ActionsButtons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";

const UserPosts = ({post , postedBy }) => {
  
    const [user, setUser] = useState(null)
    const toast =useToast();
    const navigate = useNavigate();
    const currentUser = useRecoilValue(userAtom);
    const [posts, setPosts] = useRecoilState(postsAtom)

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
                // console.log(data);

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

    
    const handleDeletePost =async(e)=>{
      try {
        e.preventDefault();
        if(!window.confirm("You want to delete Your post ?")) return;
        const res = await fetch(`/api/posts/${post._id}`,{
          method:"DELETE",
        })
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
      toast({
        title:"Post deleted Successfully",
        status:"success",
        duration:3000,
        description:data.error,
        isClosable:true,  
    });
    setPosts(posts.filter((p)=>p._id !==post._id));
    console.log(data);
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
    <Link to={`/${user?.username}/post/${post._id}`} className="w-full" >
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
            <h1 className=" text-xl mt-3 font-semibold text-rose-200" onClick={(e)=>{
                e.preventDefault();
                navigate(`/${user.username}`)
            }} >{user?.name}</h1>
            <div className="flex items-center gap-2">
              <h1 className="text-xs opacity-50">{formatDistanceToNow(new Date(post.createdAt))} ago</h1>
              {currentUser?._id === user?._id && 
              (<MdDeleteForever onClick={handleDeletePost} className="text-2xl text-rose-500 hover:text-rose-600"/>)
              }
            </div>
          </div>
          <h1 className="text-ld text-slate-300 font-semibold ">
            {post.text}
          </h1>
          {post.image && (

            <img src={post.image} alt="Post" className="rounded-md w-full   md:h-[400px] object-cover" />
          )}
          

          <ActionsButtons post={post} />
          
        </div>
      </div>
    </Link>

  );
};

export default UserPosts;
