import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { MdOutlineDone } from "react-icons/md";
import UsePreviewImage from "../Hooks/UsePreviewImage";
import { useToast } from "@chakra-ui/react";

const UpdateProfile = () => {
  const [user, setUser ] = useRecoilState(userAtom)
  const [formData, setFormData] = useState({});
  const imgRef = useRef(null)
  const toast =useToast();
  const {handleImageChange , imgUrl} = UsePreviewImage()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formData);

const handleSubmit= async (e) =>{
  e.preventDefault();
  try {
    const res = await fetch(`/api/users/update/${user._id}`,{
    method: "PUT",
    headers: {
    "Content-Type": "application/json",
    },
    body:JSON.stringify({...formData,profileimage:imgUrl}),
  })
  const data = await res.json();
  if(data.error){
    toast({
      title:"Error",
      status:"error",
      duration:3000,
      isClosable:true,  
    });
    return
  }
  toast({
    title:"Profile Updated Successfully",
    status:"success",
    duration:3000,
    isClosable:true,  
  });
  setUser(data);
  localStorage.setItem("user-threads",JSON.stringify(data));
  
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
   
    <>
    <div className="w-full flex  flex-col justify-center items-center gap-5">
      <h1 className=" text-white text-2xl text-center">
        Update Profile
      </h1>
      <form   className="flex flex-col gap-3 py-3 w-[400px] " onSubmit={handleSubmit}>
            
            <div
              className="w-full flex items-center justify-center gap-3 " >
              <div className=" flex flex-row gap-2 items-center justify-start rounded-full overflow-hidden">
                <img src={imgUrl || user.profileimage} alt="" onClick={() => imgRef.current.click()}   className=" w-[100px] h-[100px] rounded-full cursor-pointer "/>
                
              </div>
             
              <input
                hidden
                id="Avtar"
                type="file"
                onChange={handleImageChange}
                
                ref={imgRef} 
                accept="image/*"
              />
            </div>
            <div className=" p-1 border-[1px] border-opacity-25 border-white ">
            <p className="px-2 text-white text-[10px]">Full Name</p>
            <input
              type="text "
              placeholder={user.name}
              className="  p-2 bg-[#13394e]  focus:outline-none w-full"
              id="name"
              onChange={handleChange}
              
              />
              </div>
              <div className=" p-1 border-[1px] border-opacity-25 border-white ">
            <p className="px-2 text-white text-[10px]">Username</p>
            <input
              type="text "
              placeholder={user.username}
              className="p-2 bg-[#13394e]   focus:outline-none w-full"
              id="username"
              onChange={handleChange}
              
              />
              </div>
              <div className=" p-1 border-[1px] border-opacity-25 border-white ">
            <p className="px-2 text-white text-[10px]">Email</p>
            <input
              type="text "
              placeholder={user.email}
              className="p-2 bg-[#13394e]  focus:outline-none w-full"
              id="email"
              onChange={handleChange}
              
              />
              </div>

              <div className=" p-1 border-[1px] border-opacity-25 border-white ">
            <p className="px-2 text-white text-[10px]">Password</p>
            <input
              type="text "
              placeholder="Password"
              className="p-2 bg-[#13394e]  focus:outline-none w-full"
              id="password"
              onChange={handleChange}
              
              />
              </div>
              <div className="p-1  border-[1px] border-opacity-25 border-white ">
            <p className="px-2 text-white text-[10px]">Mobile No.</p>
            <input
              type="number "
              placeholder={user.mobile || 'Mobile No.'}
              className="p-2 bg-[#13394e]  focus:outline-none w-full" 
              id="mobile"
              onChange={handleChange}
              
              />
              </div>
              <div className=" p-1 border-[1px] border-opacity-25 border-white ">
            <p className="px-2 text-white text-[10px]">Bio</p>
            <input
              type="text "
              placeholder={user.bio || 'Bio'}
              className="p-2 bg-[#13394e]  focus:outline-none w-full"
              id="bio"
              onChange={handleChange}
              
              />
              </div>
            
           
            <button
              type="submit"
              className=" bg-green-500 flex items-center justify-center text-3xl text-white rounded-lg p-2 font-bold  uppercase hover:opacity-80 disabled:opacity-60"
            >
             <MdOutlineDone />
            </button>
            <p className="text-[10px]  font-semibold text-white text-center">
              After Updation you can&apos;t roll back
            </p>
          </form>
    </div>
    </>
  )
}

export default UpdateProfile