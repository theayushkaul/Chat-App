import React, { useState } from 'react'
import { ChatState } from "../Context/ChatProvider"
import { Box } from "@chakra-ui/react"
import SideDrawer from "../Components/ChatComponents/SideDrawer"
import MyChats from "../Components/ChatComponents/MyChats"
import MyChatSpace from "../Components/ChatComponents/MyChatSpace"

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <MyChatSpace fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}

export default ChatPage
