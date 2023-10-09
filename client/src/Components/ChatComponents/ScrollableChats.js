import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";

const ScrollableChats = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} hasArrow placement="bottom-start">
                <Avatar
                  mt="7px"
                  mr={1}
                  cursor="pointer"
                  size="sm"
                  name={m.sender.name}
                  src={m.sender.profilePic}
                />
              </Tooltip>
            )}
            <span
              style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                backgroundColor: `${
                  m.sender._id === user._id ? "#B9F5D0" : "#BEE3F8"
                }`, 
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft : isSameSenderMargin(messages,m,i, user._id),
                marginTop : isSameUser(messages,m,i,user._id) ? 3 : 10,
                fontSize:"small",
                fontWeight:"500"
              }}
            >{m.content}</span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChats;