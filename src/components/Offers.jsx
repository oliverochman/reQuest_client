import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";
import OfferList from "./OfferList";

import updateMyRequest from "../modules/updateMyRequest";
import { useDispatch } from "react-redux";
import {
  updateOffer,
  markRequestCompleted,
  replyToConversation,
} from "../modules/messaging";

import { getSingleRequest } from '../modules/getRequests'

const Offers = ({ req }) => {
  const [showOffer, setShowOffer] = useState(false)
  const [request, setRequest] = useState({})
  const [activeOffer, setActiveOffer] = useState()
  const [statusMessage, setStatusMessage] = useState("")

  const dispatch = useDispatch()

  const checkRequestStatus = () => {
    if (request.status == 'pending') {
      // Render list of offers with email of helper.
      // When offer is clicked, window that displays message
      // from helper appears and option to accept or decline.

      // DONE!
    } else if (request.status == 'active') {
      // Render window message from accepted helper
      // User should be able to message helper and complete the request
      // when helper fulfilled his task.
    } else {
      // When request is completed, the user should see the prior conversation
      // with the helper.
    }
  }
  const fetchRequest = async () => {
    const response = await getSingleRequest(req.id)
    setRequest(response.data.request)
    getAcceptedOffer(response.data.request)
  }

  useEffect(() => {
    fetchRequest()
  }, [])

  const displayOffer = (e) => {
    e.preventDefault()
    let offer = request.offers.find(offer => offer.id === parseInt(e.target.id));
    setActiveOffer(offer)
    setShowOffer(true)
  }

  const offerList = request.status == 'pending' && (
    request.offers.map((offer, index) => (
      <OfferList
        offer={offer}
        displayOffer={displayOffer}
      />
    ))
  )

  const updateOfferStatus = async (e) => {
    e.preventDefault()
    const response = await updateOffer(e.target.id, activeOffer.id);
    setShowOffer(false)
    setStatusMessage(response.data.message)
    dispatch({ type: "FETCH_MY_REQUESTS", payload: { getMyRequests: true } })
  }

  const completeRequest = async (e) => {
    e.preventDefault()
    const response = await markRequestCompleted(request.id);
    if (response.status === 200) {
      setShowOffer(false)
      setStatusMessage(response.data.message);
      dispatch({ type: "FETCH_MY_REQUESTS", payload: { getMyRequests: true } })
    } else {
      setStatusMessage(response.response.data.message);
    }
  };


  const getAcceptedOffer = (request) => {
    if (request.status == 'active') {
      const offer = request.offers.filter(
        (offer) => offer.status === "accepted"
      )[0];

      setActiveOffer(offer)
      setShowOffer(true)
    }
  }

  const offerScenarios = request.status === 'pending' ? (
    <>
      <button onClick={updateOfferStatus} id="accepted" type="submit">Accept</button>
      <button onClick={updateOfferStatus} id="declined" type="submit">Decline</button>
    </>

  ) : (
    <>
      <button onClick={completeRequest} type="submit">Complete</button>
    </>
  )

  return (
    <>
      {offerList}
      {showOffer && (
        <form >
          <p>{activeOffer.email}</p>
          {activeOffer.conversation.messages.map((offer) => {
            return <p>{offer.content}</p>
          })}
          {offerScenarios}
        </form>
      )}
      {statusMessage}
    </>
  )
}

// const Offers = ({ request, selectedStatus }) => {
//   const dispatch = useDispatch();
//   const [showHelperMessage, setShowHelperMessage] = useState(false);
//   const [statusMessage, setStatusMessage] = useState("");
//   const [helperOffer, setHelperOffer] = useState({});
//   const [messagesUpdate, triggerMessagesUpdate] = useState({});
//   const [completedMessage, setCompletedMessage] = useState("");
//   const [error, setError] = useState(false);

//   const onHelperClick = (e) => {
//     setShowHelperMessage(true);
//     setHelperOffer({ ...request.offers[parseInt(e.target.id)] });
//   };

//   const onClickActivity = async (e) => {
//     const response = await updateOffer(e.target.id, helperOffer.id);
//     setStatusMessage(response.data.message);
//     // update_my_requests
//     await updateMyRequest(request, dispatch);
//   };

  // const completeRequest = async () => {
  //   const response = await markRequestCompleted(request.id);
  //   if (!response.isAxiosError) {
  //     setCompletedMessage(response.data.message);
  //     // 
  //     setError(false);
  //   } else {
  //     setCompletedMessage(response.response.data.message);
  //     setError(true);
  //   }
  // };

//   const replyOfferMessage = async (e) => {
//     const message = e.target.replyMessage.value
//     const resp = await replyToConversation(
//       acceptedHelperOffer.id,
//       message
//     );
//     resp && acceptedHelperOffer.conversation.messages.push({me: true, content: message}) && triggerMessagesUpdate(resp)
//   };

//   const myOffers = request.offers.map((offer, index) => (
//     <OfferList
//       offer={offer}
//       requestStatus={request.status}
//       index={index}
//       onHelperClick={onHelperClick}
//     />
//   ));

//   const acceptedHelperOffer = request.offers.filter(
//     (offer) => offer.status === "accepted"
//   )[0];

//   const myOffersActiveComp = (selectedStatus === "active" ||
//     selectedStatus === "completed") && (
//     <OfferMessage
//       helperOffer={acceptedHelperOffer}
//       selectedStatus={selectedStatus}
//       completeRequest={completeRequest}
//       replyOfferMessage={replyOfferMessage}
//       completedMessage={completedMessage}
//       error={error}
//     />
//   );

//   return (
//     <div style={{ display: "flex", flexDirection: "row" }}>
//       {selectedStatus === "pending" && (
//         <>
//           <List divided relaxed id="offers">
//             <h3>Offers</h3>
//             {myOffers}
//           </List>
//           <div
//             style={{
//               marginLeft: "30px",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             {showHelperMessage && (
//               <OfferMessage
//                 helperOffer={helperOffer}
//                 onClickActivity={onClickActivity}
//                 selectedStatus={selectedStatus}
//               />
//             )}
//             <p id="status-message">{statusMessage}</p>
//           </div>
//         </>
//       )}
//       {myOffersActiveComp}
//     </div>
//   );
// };

export default Offers;
