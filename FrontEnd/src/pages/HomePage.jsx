import { Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserPosts from "../components/UserPosts";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  const toast =useToast();

useEffect(() => {
  const getFeedPosts = async()=>{

    setLoading(true);
    try {
      const res = await fetch("/api/posts/feed")
      const data = await res.json();
      console.log(data);
      setPosts(data)
    } catch (error) {
      toast({
        title:"Error",
        status:"error",
        duration:3000,
        isClosable:true,  
      });
    }finally{
      setLoading(false)
    }
  }
  getFeedPosts();
}, [toast])


  return (
    <div className=" flex justify-center items-center text-white">
    {loading && (
      <div>
        <Spinner size={'xl'} />
      </div>
    )}

    {!loading && posts.length ==0 && (
      <div className="text-lg w-full text-center"><h1>Follow Some Users to see their Posts</h1></div>
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
