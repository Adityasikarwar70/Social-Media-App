import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import { useRecoilValue } from "recoil"
import { authScreenAtom } from "../atoms/authAtom"

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom)
  // console.log(authScreenState);
  return (
    <>
     {authScreenState === "signin" ? <SignIn/> : <SignUp/> }
    </>
  )
}
 
export default AuthPage
