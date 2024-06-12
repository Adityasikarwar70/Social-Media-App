import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import UserPosts from "../components/UserPosts";
import useGetUserProfile from "../Hooks/useGetUserProfile.js";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom.js";





const User = () => {
const {user , loading} = useGetUserProfile();
const {username} = useParams();
const toast =useToast();
const [posts, setPosts] = useRecoilState(postsAtom);
const [fetching, setFetching] = useState(true);

  useEffect(()=>{
    

    const getPosts = async()=>{
      setFetching(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
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
        setPosts(data);
        console.log(data);
      } catch (error) {
        toast({
          title:"Error",
          status:"error",
          description:error.message,
          duration:3000,
          isClosable:true, 
           
        });
      }finally{
        setFetching(false);
      }
    }


    getPosts()
  },[toast, username ,setPosts]);
  if(!user && loading) {
    return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
  }
  if (!user && !loading) return <h1>User not found</h1>;
   
  return (
    <div className="text-white w-full ">
      <UserHeader user={user}  />
      {!fetching && posts.length ===0 && <h1 className=" text-center mt-4 font-bold text-gray-600">User Don&apos;t have any posts</h1>}
      {fetching && (
        <div className="flex items-center justify-center mt-5">
          <Spinner size={"xl"}/>
        </div>
      )}
      {
      posts.map((post)=>(
        <UserPosts key={post._id}  post={post} postedBy={post.postedBy}   />
      ))
    }
    </div>
  )
}

export default User