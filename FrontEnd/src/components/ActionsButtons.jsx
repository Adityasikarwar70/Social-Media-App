import { Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { ImCross } from "react-icons/im";
import postsAtom from "../atoms/postsAtom";

const ActionsButtons = ({ post}) => {
  const user = useRecoilValue(userAtom);
  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [posts, setPosts] = useRecoilState(postsAtom);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(null);
  const [show, setShow] = useState(null);
  const [comment, setComment] = useState(null);

  const handleLikeAndUnlike = async () => {
    if (!user) {
      toast({
        title: "You Must be Logged in to like a post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/posts/like/" + post._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast({
          title: "Error",
          status: "error",
          description:data.error,
          duration: 3000,
          isClosable: true,
        });
        return;
      }


      if (!liked) {
        // add the like of the current user who liked post to the likes array
       const updatedPosts = posts.map((p)=>{
        if(p._id === post._id){
          return {...p,likes:[...p.likes,user._id]}
        }
        return p
       })
      setPosts(updatedPosts)
      } else {
        // remove the like if of the current user who liked post to the likes array
        const updatedPosts = posts.map((p)=>{
          if(p._id === post._id){
            return {...p,likes: p.likes.filter((id) => id !== user._id)}
          }
        return p
        })
        setPosts(updatedPosts)
      }

      setLiked(!liked);

      // console.log(data);
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShow = () => {

    setShow(!show);
  };
  // console.log(comment);

  const handleComment =async()=>{
    if(!user){
      return(
        toast({
          title: "Error",
          status: "error",
          description: "You Must be Logged in to comment on post",
          duration: 3000,
          isClosable: true,
        })
      )
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/posts/reply/' + post._id,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({text:comment})
      });

      const data = await res.json();
      if(data.error){
        toast({
          title: "Error",
          status: "error",
          description:data.error,
         duration: 3000,
          isClosable: true,
        });
      }
      const updatedPosts = posts.map((p)=>{
        if(p._id === post._id){
          return {...p,replies: [...p.replies , data]}
        }
      return p
      })
      setPosts(updatedPosts)
      toast({
        title: "comment posted",
        status: "success",
       duration: 3000,
        isClosable: true,
      });

      handleShow();

    } catch (error) {
      toast({
        title: "Error",
        status: "error",
       duration: 3000,
        isClosable: true,
      });
    }finally{
     
    setIsLoading(false);
    }
  }
  return (
    <div onClick={(e) => e.preventDefault()}>
      <Flex gap={3} my={2}>
        <svg
          aria-label="Like"
          color={liked ? "rgb(237, 73, 86)" : ""}
          fill={liked ? "rgb(237, 73, 86)" : "transparent"}
          height="19"
          role="img"
          viewBox="0 0 24 22"
          width="20"
          cursor="pointer"
          onClick={handleLikeAndUnlike}
        >
          <path
            d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
            stroke="currentColor"
            strokeWidth="2"
          ></path>
        </svg>

        <svg
          aria-label="Comment"
          color=""
          fill=""
          height="20"
          role="img"
          viewBox="0 0 24 24"
          width="20"
          onClick={handleShow}
        >
          <title>Comment</title>
          <path
            d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
            // fill='none'
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            cursor="pointer"
          ></path>
        </svg>

        <svg
          aria-label="Repost"
          color="currentColor"
          fill="currentColor"
          height="20"
          role="img"
          viewBox="0 0 24 24"
          width="20"
          cursor="pointer"
        >
          <title>Repost</title>
          <path
            fill=""
            d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"
          ></path>
        </svg>

        <svg
          aria-label="Share"
          color=""
          fill="rgb(243, 245, 247)"
          height="20"
          role="img"
          viewBox="0 0 24 24"
          width="20"
          cursor="pointer"
        >
          <title>Share</title>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="22"
            x2="9.218"
            y1="3"
            y2="10.083"
          ></line>
          <polygon
            fill="none"
            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
          ></polygon>
        </svg>
      </Flex>
      <div className=" flex items-center  gap-3 text-sm text-gray-500">
        <h1>{post.likes.length} likes</h1>
        <div className="h-[8px] w-[8px] rounded-full bg-gray-500"></div>
        <h1>{post.replies.length} replies</h1>
      </div>

      {show && (
        <div className="cursor-default">
          <div onClick={handleShow} className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full h-full bg-slate-700 blur-3xl opacity-70"></div>
          <div className="z-10 fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[300px] md:w-[500px] py-2 rounded-md bg-slate-900">
            <div className=" flex items-center justify-between px-5 py-2">
              <h1>Create comment</h1>
              <ImCross className="hover:text-rose-400" onClick={handleShow} />
            </div>
            <form
              action=""
              className=" p-5 flex flex-col md:flex-row items-center gap-2"
            >
              <input
                type="text"
                placeholder="Write Comment here .."
                onChange={(e)=> setComment(e.target.value)}
                className="w-full p-2 text-gray-100 shadow-inner shadow-black focus:outline-none rounded-md bg-slate-700"
              />
              <div className=" flex items-center gap-3">
                <button
                  onClick={handleShow}
                  className=" md:hidden p-2 bg-rose-500 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" onClick={handleComment} className="p-2 bg-green-500 rounded-lg">{isLoading ? "posting" : "Comment"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsButtons;
