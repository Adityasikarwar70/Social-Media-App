import { useEffect, useState } from "react"
import Posts from "../components/Posts"
import UserHeader from "../components/UserHeader"
import { useParams } from "react-router-dom"
import { useToast } from "@chakra-ui/react"




const User = () => {
  const [user, setUser] = useState(null)
const {username} = useParams();
const toast =useToast();

  useEffect(()=>{
    const getUser = async()=>{
      try {
        const res = await fetch(`/api/users/profile/${username}`);
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
        setUser(data)
        console.log(data);
      } catch (error) {
        toast({
          title:"Error",
          status:"error",
          description:error,
          duration:3000,
          isClosable:true, 
           
        });
      }
     
    }
    getUser();
  },[toast, username])
  if(!user) return null
  
  return (
    <div className="text-white w-full ">
      <UserHeader user={user}  />
      <Posts likes={1500} replies={488} postTitle="Lorem ipsum dolor sit amet" postImg="/assets/home.jpg"  />
      <Posts likes={1500} replies={488} postTitle="Lorem ipsum dolor sit amet" postImg="/assets/home.jpg"  />
      <Posts likes={1500} replies={488} postTitle="Lorem ipsum dolor sit amet" postImg="/assets/home.jpg"  />
      <Posts likes={1500} replies={488} postTitle="Lorem ipsum dolor sit amet" postImg=""  />
      
    </div>
  )
}

export default User