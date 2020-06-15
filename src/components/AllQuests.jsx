import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getQuests from "../modules/getQuests"

const AllQuests = () => {
const dispatch = useDispatch();
const quests = useSelector((state)=>state.quests)

 useEffect(()=>{
     getQuests(dispatch)
 },[])



  return (

    


  )
};

export default AllQuests;
