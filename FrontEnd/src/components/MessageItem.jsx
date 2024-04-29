 
const MessageItem = ({ownMessage}) => {
  return (
    <>
    {ownMessage ? (
      <div className="flex flex-row items-end gap-1 w-full  justify-end  ">
        <h1 className="max-w-[300px] bg-purple-600 bg-opacity-25 p-2 rounded-lg rounded-br-none">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam ea velit nam esse eum reiciendis!</h1>
        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="pfp" className="w-[45px] h-[45px] rounded-full" />
      </div>
    ) : (
      <div className="flex flex-row items-end gap-1 w-full  justify-start  ">
        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="pfp" className="w-[45px] h-[45px] rounded-full " />
        <h1 className="max-w-[280px] bg-purple-600 p-2 rounded-lg rounded-bl-none">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam ea velit nam esse eum reiciendis!</h1>
      </div>
    )}

    </>
  )
}

export default MessageItem