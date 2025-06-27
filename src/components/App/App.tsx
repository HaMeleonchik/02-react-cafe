import css from "./App.module.css"
import CafeInfo from "../CafeInfo/CafeInfo"
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification"
import { VoteType, Votes } from "../../types/votes";
import { useState } from "react";

export default function App() {
  const [votes, setvotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 })

  function handleVote(voteType: VoteType) {
    setvotes({
      ...votes,
     [voteType]: votes[voteType] +1,
    })
  }
  
  function resetVotes() {
    setvotes({good: 0, neutral: 0, bad: 0})
 }

 const totalVotes = votes.good + votes.neutral + votes.bad
 const positiveRate = totalVotes
 ? Math.round((votes.good / totalVotes) * 100)
 : 0

   let resetState = false;
  if (totalVotes === 0) {
    resetState = false;
  } else {
    resetState = true;
}
  
  return <div className={css.app}>
<CafeInfo/>
    <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={resetState} />
    {totalVotes === 0 ? <Notification/> : <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />}
  </div>
  
}
