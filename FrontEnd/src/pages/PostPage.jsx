 
import ActionsButtons from "../components/ActionsButtons";

import { Divider, Flex, Spinner, useToast } from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";

import useGetUserProfile from "../Hooks/useGetUserProfile";
import { useEffect  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  formatDistanceToNow } from "date-fns";
import { MdDeleteForever } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import Comments from "../components/Comments";


// import { useRecoilState } from "recoil";

const PostPage = () => {
  const {user , loading} = useGetUserProfile()
  const [post, setPost] = useRecoilState(postsAtom);
  const {pid} = useParams()
  const toast =useToast();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate()
  const currentPost = post[0];

  useEffect(() => {
		const getPost = async () => {
		
			try {
				const res = await fetch(`/api/posts/${pid}`);
				const data = await res.json();
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
				setPost([data]);
			} catch (error) {
				toast({
          title:"Error",
          status:"error",
          description:error,
          duration:3000,
          isClosable:true, 
           
        });
			}
		};
		getPost();
	}, [pid, toast ,setPost ]);

  const handleDeletePost =async(e)=>{
    try {
      e.preventDefault();
      if(!window.confirm("You want to delete Your post ?")) return;
      const res = await fetch(`/api/posts/${post.id}`,{
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
  navigate(`/${user.username}`)
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

  if(!user && loading) {
    return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
  }
  
  if (!user && !loading) return <h1>User not found</h1>;


  if(!post) return null;


  return (
    <section className="flex flex-col gap-3 text-white ">
      <div className="flex  justify-between mt-10 ">
        <div className="flex items-center gap-5 text-white text-lg">
          <img
            src={user.profileimage}
            alt="pfp"
            className="h-[50px] w-[50px]  md:h-[60px] md:w-[60px] object-cover rounded-full"
          />
          <h1>{user.username}</h1>
        </div>
        <div className="flex items-center gap-2">
              <h1 className="text-xs opacity-50">{formatDistanceToNow(new Date(currentPost?.createdAt))} ago</h1>
              {currentUser._id === user?._id && 
              (<MdDeleteForever onClick={handleDeletePost} className="text-2xl text-rose-500 hover:text-rose-600"/>)
              }
            </div>
      </div>
      <h1>
        {currentPost.text} 
      </h1>
      {currentPost.image ? (<img src={currentPost.image} alt="image" className=" rounded-lg w-full h-[400px] object-cover" />) : null}
      
      <div>
        <ActionsButtons post={currentPost} />
        
      </div>
      <Divider />
      <div className="flex justify-end">
        <div className=" flex  items-center gap-3 p-1 pl-2 bg-slate-900 rounded-full">
          <h1>Get Notifications</h1>
          <button className=" p-2 bg-slate-500 hover:bg-black hover:text-yellow-600 rounded-full"><IoNotifications /></button>
        </div>
      </div>
      <div>
        {currentPost.replies.map((reply=>(
          <Comments  key={reply._id} reply={reply}
           />
        )))}
      </div>
      
    </section>
  );
};

export default PostPage;
