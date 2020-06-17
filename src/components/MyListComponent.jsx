import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react';
import RequestCard from './RequestCard'
import { getMyQuestsOrRequests } from '../modules/getRequests'
import axios from 'axios'

const MyListComponent = ({type}) => {
  const [list, setList] = useState([])

  const getList = async () => {
    const theList = await getMyQuestsOrRequests(type)
    setList(theList)
  }

  useEffect(() => {
    getList()
  }, [])
  
  debugger

  const cards = list.map(request => (
    <RequestCard key={request.id} request={request} />
  ))

  return (
    <Grid columns={1}>
      {cards}
    </Grid>
  )
}

export default MyListComponent;
