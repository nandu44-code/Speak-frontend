import React from 'react'
import TutorSidebar from '../../components/tutor/TutorSidebar'
import ChatPage from '../Common/ChatPage'
function TutorChatPage() {
  return (
    <div className='flex h-screen'>
        <TutorSidebar/>
        <div className='flex-1'>

        <ChatPage/>
        </div>
    </div>
  )
}

export default TutorChatPage
