import React from 'react'
import { Form } from 'semantic-ui-react'

const NewQuest = () => {
  return (
    
      <Form>
        <input id='title' type='text' placeholder='Quest Title' /> 
        <input id='description' type='textArea' placeholder='Quest Description' />
        <input id='submit' type='submit' value="Submit" />
      </Form>
    
  )
}

export default NewQuest
