import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom)
    const toast =useToast();
    const navigate = useNavigate()
    const handleLogout =async()=>{
        try {

            const res = await fetch('/api/users/logout', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await res.json();
              console.log(data);
              if(data.error){
                toast({
                  title:"Error",
                  description:data.error,
                  status:"error",
                  duration:3000,
                  isClosable:true,  
                });
                return
            } 
            localStorage.removeItem("user-threads")
            setUser(null)
            navigate('/auth')
           
            
    }catch (error) {
            console.log(error);
        }
    }
  return (
    <div className=" flex">
        <button onClick={handleLogout} className="bg-rose-400 text-sm px-2 py-2  rounded-md hover:bg-rose-500 drop-shadow-xl">
        Logout
        </button>
    </div>
  )
}

export default LogoutButton