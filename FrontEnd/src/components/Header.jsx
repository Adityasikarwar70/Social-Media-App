import { userAtom } from "../atoms/userAtom"
import { useRecoilValue } from "recoil"
import LogoutButton from "./LogoutButton"

const Header = () => {
  const user = useRecoilValue(userAtom)
  return (
    <nav className=" w-full my-5 text-center text-2xl font-semibold text-white flex items-center justify-between ">
        <h1>LOGO</h1>
        {user && <LogoutButton/>}
    </nav>
  )
}

export default Header