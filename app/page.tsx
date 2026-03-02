'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from 'react'


function Focus({focusTime}) {
  let hours = ("0"+Math.floor(focusTime/60/60)).slice(-2);
  let mins = ("0"+(Math.floor(focusTime/60)%60)).slice(-2);
  let sec = ("0"+focusTime%60).slice(-2)
  return (
    <div className="flex items-center content-center flex-col">
      <div className="text-lime-500 text-[100px] font-sans flex text-center">{hours}:{mins}:{sec}</div>
      <button className="bg-gradient-to-r from-lime-500 via-lime-600 to-lime-800 text-[40px] font-sans text-(--background) flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:bg-lime-500 focus:bg-none">Focus</button>
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
      <div className="bg-color-background h-1 flex place-content-center">
        <Focus 
        focusTime={focusTime}/>
        <Break
        breakTime={breakTime}/>
      </div>
    </main>
  );
}
