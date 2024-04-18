import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import User from "./pages/User";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import {  useRecoilValue} from 'recoil';
import { userAtom } from './atoms/userAtom.js';
import UpdateProfile from './pages/UpdateProfile.jsx';
// import LogoutButton from './components/LogoutButton.jsx';



function App() {
const user = useRecoilValue(userAtom)
  return (
    <BrowserRouter>
    
    <ChakraProvider>
   <div className='w-full h-full min-h-[100vh] flex justify-center bg-black '>
    <div className=' max-w-[720px] h-full w-full px-2 '>
    <Header/>
    
    <Routes>
    <Route path='/' element={user ? <HomePage/> :<Navigate to={'auth'} /> } />
    <Route path='/auth' element={!user ? <AuthPage/> : <Navigate to={'/'} /> } />
    <Route path='/update' element={user ? <UpdateProfile/> : <Navigate to={'/'} /> } />
    <Route path='/:username' element={<User/>} />
    <Route path="/:username/post/:pid" element={<PostPage/>} />
    </Routes>
    </div>
   </div>
   </ChakraProvider>
 
   </BrowserRouter>
  )
}

export default App
