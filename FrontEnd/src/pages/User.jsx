import Posts from "../components/Posts"
import UserHeader from "../components/UserHeader"



const User = () => {
  return (
    <div className="text-white w-full ">
      <UserHeader   />
      <Posts likes={1500} replies={488} postTitle="Lorem ipsum dolor sit amet" postImg="/assets/home.jpg"  />
      <Posts likes={1500} replies={488} postTitle="Lorem ipsum dolor sit amet" postImg="/assets/home.jpg"  />
      <Posts likes={1500} replies={488} postTitle="Lorem ipsum dolor sit amet" postImg="/assets/home.jpg"  />
      <Posts likes={1500} replies={488} postTitle="Lorem ipsum dolor sit amet" postImg=""  />
      
    </div>
  )
}

export default User