import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoImages } from "react-icons/io5";
import UsePreviewImage from "../Hooks/UsePreviewImage";
import { useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";

const MAX_CHAR = 500;
const CreatePost = () => {
    const toast =useToast();
    const user = useRecoilValue(userAtom);
  const [isShown, setIsShown] = useState(null);
  const [postText, setPostText] = useState(null);
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR)
  const imageRef = useRef(null);
  const {handleImageChange , imgUrl , setImgUrl} = UsePreviewImage()
  const [loading, setLoading] = useState(null);


  const handleShown = () => {
    setIsShown(!isShown);
  };

  const handleTextChange =(e)=>{
    const inputText = e.target.value;

    if(inputText.length>MAX_CHAR){
        const text = inputText.slice(0,MAX_CHAR);
        setPostText(text);
        setRemainingChar(0);
    }else{
        setPostText(inputText);
        setRemainingChar(MAX_CHAR - inputText.length)
    }
  };
  const handleCreatePost =async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
        const res = await fetch('/api/posts/create',{
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body:JSON.stringify({postedBy:user._id,text:postText,image:imgUrl}),
      })
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
      toast({
        title:"Post Created Successfully",
        status:"success",
        duration:3000,
        isClosable:true,  
      });
      handleShown() 
      setPostText(null)
      setImgUrl(null)
      
      }catch (error) {
        toast({
          title:"Error",
          
          status:"error",
          duration:3000,
          isClosable:true,  
        });
      }
      setLoading(false)
  }
  return (
    <div>
      <div className=" absolute top-[80vh] right-[20vw]">
        <button
          onClick={handleShown}
          className="bg-gray-700 text-2xl p-3 rounded-full fixed hover:bg-gray-600 "
        >
          <FaPlus />
        </button>
      </div>
      {isShown && (
        <div className=" fixed p-5 z-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  bg-gray-900 w-[350px]  md:w-[600px]  shadow-black shadow-2xl ">
          <div className="flex items-center justify-between">
            <h1>Create Post</h1>
            <ImCross
              onClick={handleShown}
              className=" text-lg text-rose-400 hover:text-rose-500 cursor-pointer"
            />
          </div>
          <form action="" className=" mt-5 flex flex-col">
            <textarea
              id=""
              onChange={handleTextChange}
              value={postText}
              className=" p-2 w-[300px] h-[150px] md:w-[550px]  bg-transparent border-2 border-gray-700 text-lg focus:outline-none rounded-md"
            ></textarea>
            <p className=" text-right text-[12px] mr-5">{remainingChar}/{MAX_CHAR}</p>
            <div className="ml-1 flex flex-col gap-2">
              <IoImages
                onClick={() => imageRef.current.click()}
                className="cursor-pointer hover:opacity-80"
              />
              <input type="file" hidden ref={imageRef} onChange={handleImageChange} />
              {imgUrl && (
                <div className="relative">
                <img src={imgUrl} alt="selected image" className=" w-full h-[250px] object-cover" />
                <div className=" absolute p-2 text-sm top-[5px] right-[5px] cursor-pointer bg-rose-400" onClick={()=>setImgUrl(null)}><ImCross/></div>
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end text-gray-900 text-lg">

            <button className="py-1 px-3 bg-rose-400 rounded-md mt-3 " onClick={handleShown}>Cancel</button>
            <button className="py-1 px-3 bg-green-600 rounded-md mt-3 " onClick={handleCreatePost} >{loading ? "Posting" : "Post"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
