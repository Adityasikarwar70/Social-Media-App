import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";

const UpdateProfile = () => {
  const [user ] = useRecoilState(userAtom)
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  return (
   
    <>
    <div className="w-full flex  flex-col justify-center items-center gap-5">
      <h1 className=" text-white text-2xl text-center">
        Update Profile
      </h1>
      <form   className="flex flex-col gap-3 py-3 max-w-[400px] ">
            
            <div
              className="w-full flex flex-col gap-3
            "
            >
              <div className=" flex flex-row gap-2 items-center justify-start">
                <img src="" alt="" />
                
              </div>
              <input
                
                id="Avtar"
                type="file"
                onChange={handleChange}
                accept="image/*"
              />
            </div>

            <input
              type="text "
              placeholder={user.name}
              className="  p-2 bg-transparent border-b-[1px] focus:outline-none"
              id="name"
              onChange={handleChange}
           
            />
            <input
              type="text "
              placeholder={user.username}
              className="p-2 bg-transparent border-b-[1px] focus:outline-none"
              id="username"
              onChange={handleChange}
             
            />
            <input
              type="text "
              placeholder={user.email}
              className="p-2 bg-transparent border-b-[1px] focus:outline-none"
              id="email"
              onChange={handleChange}
               
            />
            <input
              type="text "
              placeholder=" Password"
              className="p-2 bg-transparent border-b-[1px] focus:outline-none"
              id="password"
              onChange={handleChange}
             
            />
            <input
              type="number "
              placeholder={user.mobile || 'Mobile No.'}
              className="p-2 bg-transparent border-b-[1px] focus:outline-none"
              id="mobile"
              onChange={handleChange}
             
            />
            <input
              type="text "
              placeholder={user.bio || 'Bio'}
              className="p-2 bg-transparent border-b-[1px] focus:outline-none"
              id="bio"
              onChange={handleChange}
             
            />
            
           
            <button
              
              className=" bg-slate-800 text-white rounded-lg p-3  uppercase hover:opacity-90 disabled:opacity-80"
            >
              Save Update
            </button>
            <p className="text-[10px]  font-semibold text-white text-center">
              After Updation you will be logged out automatically
            </p>
          </form>
    </div>
    </>
  )
}

export default UpdateProfile