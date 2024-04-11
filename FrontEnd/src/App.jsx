import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import User from "./pages/User";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";



function App() {
  

  return (
    <BrowserRouter>
    <ChakraProvider>
   <div className='w-full h-full min-h-[100vh] flex justify-center bg-black '>
    <div className=' max-w-[720px] h-full w-full px-2 '>
    <Header/>
    <Routes>
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
