'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from 'react'


function Focus({focusTime}) {
  let hours = ("0"+Math.floor(focusTime/60/60)).slice(-2);
  let mins = ("0"+(Math.floor(focusTime/60)%60)).slice(-2);
  let sec = ("0"+focusTime%60).slice(-2)
  return (
    <div>
      <div className="text-(--focus) text-[100px] font-sans flex text-center justify-center align-center font-black">{hours}:{mins}:{sec}</div>
      <button></button>
    </div>
  )
}

function Break({breakTime}) {
  return (
    <div></div>
  )
}
export default function Home() {
  const [focusTime, setFocusTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [focus, setFocus] = useState(false);
  const [takeBreak, setTakeBreak] = useState(false);
  const [pause, setPause] = useState(false);
  const [stop, stopIt] = useState(true);
  useEffect(() => {
    let interval;
    if (focus === true && stop===false && pause===false) {
      interval = setInterval(()=>{
        setFocusTime((focusTime)=>focusTime+1)
        if ((focusTime % 5)===0) {
          setBreakTime((breakTime)=>breakTime+1)
        }
      }, 1000)
    } else if (pause === true) {
      clearInterval(interval);
    } else if (stop === false) {
      setFocusTime(0);
    }

  }

  )
  return (
    <main>
      <div className="bg-color-background">
        <Focus 
        focusTime={focusTime}/>
        <Break
        breakTime={breakTime}/>
      </div>
    </main>
  );
}
