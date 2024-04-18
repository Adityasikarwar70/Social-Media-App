import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { useToast } from "@chakra-ui/react";

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom)
    const toast =useToast();
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
            
    }catch (error) {
            console.log(error);
        }
    }
  return (
    <div className=" flex">
        <button onClick={handleLogout} className="bg-slate-400 text-sm px-2 py-1  rounded-md hover:bg-slate-500 ">
        Logout
        </button>
    </div>
  )
}

export default LogoutButton