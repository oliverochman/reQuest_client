import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'

const SpecificRequest = () => {
  const selectedRequest = useSelector(state => state.requests.selectedRequest)
  const user = useSelector(state => state.authentication.uid)

  const contactButton = selectedRequest && user ? selectedRequest.offerable ?
    <Button id="contact-button">Contact</Button> :
    <h5 id="selected-info">You cannot make an offer on this request</h5> :
    <h5 id="selected-info">Log in or sign up to offer your help</h5>

  const render = selectedRequest ? (
    <div id="selected-request">
      <h3 id="selected-title">{selectedRequest.title}</h3>
      <p id="selected-requester">{selectedRequest.requester}</p>
      <p id="selected-description">{selectedRequest.description}</p>
      {contactButton}
    </div>
  ) : (
    <>
      <div id="about-request">
        <h3>The big idea - You get what you give</h3>
        <p>reQuest is an app for people helping each other with an in-app currency (karma points) as reward.</p>
        <p>So in order to have people help you with reQuests, you need to help others with their Quests.</p>
        <p>
          You can post a reQuest for a certain task to be done.
          People  can respond to reQuests and say that they can do it.   You both agree on the reward.
        </p>
        <p>
          When the task is done you pay the person that performed the task with in-app currency (karma points).
          Then you can rate each other, so that trust-worthy people will get a higher rating.
        </p>
        <p>
          In order to  get started , you will need to create an account to post and respond to reQuests.
        </p>
      </div>
    </>
  )

  return (
    <div id="specific-component">
      {render}
    </div>
  )
}

export default SpecificRequest
