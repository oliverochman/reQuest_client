import React from 'react'
import { useSelector } from 'react-redux'

const SpecificRequest = () => {
  const selectedRequest = useSelector(state => state.requests.selectedRequest)

  const render = selectedRequest ? (
    <div id="selected-request">
    <h3>{selectedRequest.title}</h3>
    <p>{selectedRequest.description}</p>
  </div>
  ) : (
    <>
      <div> Box with info </div>
    </>
  )

  return (
    render
  )
}

export default SpecificRequest
