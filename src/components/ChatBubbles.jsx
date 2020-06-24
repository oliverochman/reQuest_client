import React from 'react'
import SingleChatBubble from './SingleChatBubble'

const ChatBubbles = ({ messages }) => {
  const chatBubbles = messages.map((message) => (
    <SingleChatBubble message={message}/>
  ))

  return (
    chatBubbles
  )
}

export default ChatBubbles
