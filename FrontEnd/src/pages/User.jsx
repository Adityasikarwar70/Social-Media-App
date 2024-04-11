import Posts from "../components/Posts"
import UserHeader from "../components/UserHeader"


const User = () => {
  return (
    <div className="text-white w-full ">
      <UserHeader  />
      <Posts/>
    </div>
  )
}

export default User