import { Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserPosts from "../components/UserPosts";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom.js";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const toast =useToast();
  
useEffect(() => {
  const getFeedPosts = async()=>{
    setLoading(true);
    setPosts([]);
    try {
      const res = await fetch('/api/posts/feed');
      const data = await res.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      toast({
        title:"Error",
        status:"error",
        duration:3000,
        isClosable:true,  
      });
    }finally{ 
      setLoading(false);
    }
  }
  getFeedPosts();
}, [toast , setPosts]);
console.log(posts);

if(!posts) return null
  return (
    <div className=" flex justify-center items-center text-white">
    {loading && (
      <div className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Spinner size={'xl'} />
      </div>
    )}
 
    {!loading && posts.length ==0 && (
      <div className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><h1 className="text-center">Follow Some Users to see their Posts</h1></div>
    )}
    <div className="w-full flex flex-col">
    
    {
      posts.map((post)=>(
        <UserPosts key={post._id}  post={post} postedBy={post.postedBy}/>
      ))
    } 
    </div>
    </div>
  )
}

export default HomePage
