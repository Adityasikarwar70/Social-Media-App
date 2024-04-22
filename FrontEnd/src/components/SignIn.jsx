import {Link} from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { authScreenAtom } from "../atoms/authAtom"
import { useToast } from "@chakra-ui/react"
import { userAtom } from "../atoms/userAtom"
import { useState } from "react"
const SignIn = () => {
    const setAuthScreen = useSetRecoilState(authScreenAtom)
    const setUser = useSetRecoilState(userAtom)
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(null)
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
  const toast =useToast();
  // console.log(formData);
    
    const handleLogin=async(e)=>{
      e.preventDefault();
      setLoading(true)
      try {
        const res = await fetch('/api/users/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
    
        });
        const data = await res.json();
        if(data.error){
          toast({
            title:"Error",
            description:data.error,
            status:"error",
            duration:3000,
            isClosable:true,
          })
          return
        }
        console.log(data);
        localStorage.setItem("user-threads",JSON.stringify(data));
        setUser(data)
        
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    return (
        <div className="w-full py-10 flex items-center justify-center">

          <div className="flex max-w-[400px] min-h-full flex-1 flex-col justify-center bg-white px-6 py-2 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleLogin} >
               
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Username
                    </label>
                    
                  </div>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                   
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    
                  >
                    {loading ? "Signing Up .." : "Signup"}
                  </button>
                </div>
              </form>
    
              <p className="m-5 text-center text-sm text-gray-500">
                Not a member?
                <Link  onClick={()=>setAuthScreen("signup")} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )
    }

export default SignIn
