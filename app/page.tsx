'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from 'react'


function Focus({focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime}) {
  let hoursF = (Math.floor(focusTime/60/60)).toString().padStart(2, "0");
  let minsF = ((Math.floor(focusTime/60)%60)).toString().padStart(2, "0");
  let secF = Math.floor((focusTime%60)).toString().padStart(2, "0");
  return (
    <div className="flex items-center content-center flex-col place-content-center align-middle pb-[15vh] gap-y-[15vh] pt-[10vh]">
      <div className={`${focus ? 'text-lime-500' : 'text-olive-500'} text-[150px] font-sans flex text-center`}>{hoursF}:{minsF}:{secF}</div>
      <div className="flex flex-row gap-x-[3vw]">
        <button className="bg-gradient-to-r from-lime-500 via-lime-600 to-lime-800 text-[40px] font-sans text-(--background) flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:bg-lime-500 focus:bg-none" 
          onClick={()=>handleFocus(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime)}>Focus</button>
        <button className={`bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-800 text-[40px] font-sans text-(--background) flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:bg-yellow-500 focus:bg-none`}
          onClick={()=>{
            handlePause(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime)
            }}>Pause</button>
        <button className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-800 text-[40px] font-sans text-(--background) flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:bg-orange-500 focus:bg-none"
          onClick={()=>{
            handleStop(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime)
          }}>Reset</button>
          <button className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-900 text-[40px] font-sans text-(--background) flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:bg-sky-500 focus:bg-none"
        onClick={()=>{
         handleBreak(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime)
          }}>Break</button>


      </div>
    </div>
  )
}

function Break({focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime}) {
  let notNeg = true;
  if (breakTime<0) {
    notNeg = false;
  }
  let bT = Math.abs(Math.floor(breakTime))
  let hours = (Math.floor(bT/60/60)).toString().padStart(2, "0");
  let mins = ((Math.floor(bT/60)%60)).toString().padStart(2, "0");
  let sec = Math.floor((bT%60)).toString().padStart(2, "0");
 
  
  
  return (
    <div className="flex items-center content-center flex-col place-content-center align-middle">
      <div className={`${takeBreak ? `${notNeg ? 'text-sky-500' : 'text-orange-600'}` : 'text-mist-500'}  text-[150px] font-sans flex text-center`}>{`${notNeg ? '' : '-'}${hours}:${mins}:${sec}`}</div>
      

    </div>
  )
}

function handleFocus(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime) {
  if (focus) return;
  clearInterval(intervalBreak.current);
  clearInterval(intervalTime.current)
  setFocus(true);
  setTakeBreak(false);

    intervalTime.current = setInterval(()=>{
        setFocusTime((prev)=>prev+1)
        setBreakTime((bprev)=>bprev+0.2)
      }, 1000)


}

function handlePause(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime) {
  clearInterval(intervalBreak.current);
  clearInterval(intervalTime.current);
  setFocus(false);
  setTakeBreak(false);

}

function handleStop(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime) {
  setFocus(false);
  setTakeBreak(false);
  clearInterval(intervalTime.current)
  clearInterval(intervalBreak.current);
  setFocusTime(0);
  setBreakTime(0);

}

function handleBreak(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime) {
  if (takeBreak) return;
  setFocus(false);
  clearInterval(intervalTime.current);
  
  
  setTakeBreak(true);

    
    intervalBreak.current = setInterval(()=>{
      
        setBreakTime((prev)=>prev-1)
      }, 1000)

}

export default function Home() {
  const [focusTime, setFocusTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [focus, setFocus] = useState(false);
  const [takeBreak, setTakeBreak] = useState(false);
  // const [pause, setPause] = useState(false);
  // const [stop, stopIt] = useState(true);
  const intervalTime = useRef(null);
  const intervalBreak = useRef(null);
  // useEffect(() => {
  //   let interval;
  //   if (focus === true && stop===false && pause===false) {
  //     interval = setInterval(()=>{
  //       setFocusTime((prev)=>prev+1)
  //       if ((focusTime % 5)===0) {
  //         setBreakTime((prev)=>+1)
  //       }
  //     }, 1000)
  //   } else if (pause === true) {
  //     clearInterval(interval);
  //   } else if (stop === true) {
  //     clearInterval(interval);
  //     setFocusTime(0);

  //   } 

  // }

  // )
  // useEffect(()=> {
  //   let breakInterval;
  //   if (takeBreak === true && focus === false) {

  //     breakInterval = setInterval(()=>{
  //       setFocusTime((breakTime)=>breakTime-1)

  //     }, 1000)
      
  //   }
  //   else if (stop === true) {
  //       clearInterval(breakInterval);
  //       setBreakTime(0);
  //     }
  // })
  // Inside handleFocus




  return (
    <main>
      <div className="bg-color-background h-full flex flex-col">
        <Focus 
        focus={focus}
        focusTime={focusTime}
        setFocusTime={setFocusTime}
        setFocus={setFocus}
        setBreakTime={setBreakTime}
        intervalTime={intervalTime}
        setTakeBreak={setTakeBreak}
        takeBreak={takeBreak}
        intervalBreak={intervalBreak}
        breakTime={breakTime}/>
        <Break
        focus={focus}
        focusTime={focusTime}
        setFocusTime={setFocusTime}
        setFocus={setFocus}
        setBreakTime={setBreakTime}
        intervalTime={intervalTime}
        setTakeBreak={setTakeBreak}
        takeBreak={takeBreak}
        intervalBreak={intervalBreak}
        breakTime={breakTime}/>
      </div>
    </main>
  );
}
