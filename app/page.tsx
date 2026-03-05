'use client'
import Image from "next/image";
import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react'





function Focus({focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime}) {
  let hoursF = (Math.floor(focusTime/60/60)).toString().padStart(2, "0");
  let minsF = ((Math.floor(focusTime/60)%60)).toString().padStart(2, "0");
  let secF = Math.floor((focusTime%60)).toString().padStart(2, "0");
  let focusColor = 'lime'
  return (
    <div className="flex items-center content-center flex-col place-content-center align-middle pb-[15vh] gap-y-[15vh] pt-[10vh]">
      <div className={`${focus ? `text-${focusColor}-500` : 'text-olive-500/75'} ${focus ? 'text-[150px]' : 'text-[100px]'} font-sans flex text-center`}>{hoursF}:{minsF}:{secF}</div>
      <div className="flex flex-row gap-x-[3vw]">
        <button className="bg-gradient-to-r from-lime-500 via-green-500 to-lime-800 text-[40px] font-sans text-(--background) flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:shadow-lg focus:shadow-lime-500/27" 
          onClick={()=>handleFocus(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime)}>Focus</button>
        <button className={`bg-gradient-to-r from-yellow-500 via-amber-600 to-yellow-800 text-[40px] font-sans text-(--background) flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:shadow-lg focus:shadow-yellow-500/27`}
          onClick={()=>{
            handlePause(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime)
            }}>Pause</button>
        <button className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-800 text-[40px] font-sans text-(--background) flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:shadow-lg focus:shadow-orange-500/27"
          onClick={()=>{
            handleStop(focus, focusTime, setFocusTime, setFocus, setBreakTime, intervalTime, setTakeBreak, takeBreak, intervalBreak, breakTime)
          }}>Reset</button>
          <button className="bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-900 text-[40px] font-sans text-(--background) flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:shadow-lg focus:shadow-sky-500/27"
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
      <div className={`${takeBreak ? `${notNeg ? 'text-sky-500' : 'text-orange-600'}` : 'text-mist-500/75'} ${takeBreak ? 'text-[150px]' : 'text-[100px]'} font-sans flex text-center`}>{`${notNeg ? '' : '-'}${hours}:${mins}:${sec}`}</div>
      

    </div>
  )
}

function Tasks({breakTime, setBreakTime}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as Task[]);
    }
  }, []);
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isMounted]);

    const addTask = () => {
      if (newTask.trim() !== "") {
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
        setNewTask("")
      }
  }

  const startEditingTask = (id, text) => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  }

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, completed: !task.completed} : task
      )
    )
    deleteTask(id)
    setBreakTime((prev)=>prev+10)
  }

  const updateTask = () => {
    if (editedTaskText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: editedTaskText } : task
        )
      )
      setEditingTaskId(null)
      setEditedTaskText("")
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  

  return ( 
    <div className="items-center justify-center flex flex-col pt-[15vh]">
      <div className={`bg-gradient-to-br from-mist-800 to-mist-900 flex-col drop-shadow-lg text-white rounded-4xl p-6 w-9/10 flex overflow-auto`}>
      <h1 className="text-zinc-200 text-2xl font-bold mb-2">Tasks</h1>
        <div className="mb-4 w-full flex items-center">
          <input type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      addTask()
                    }
                  }}
          className="rounded-md flex-1 mr-2 px-3 py-2 w-full shadow-sm shadow-zinc-800/80 focus:shadow-zinc-700/70 focus:border-none focus:outline-none text-zinc-200"></input>
          <button
          onClick={addTask}
          className="bg-gradient-to-r from-slate-600 via-mist-600 to-slate-900 font-sans text-mist-200 flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:shadow-md focus:shadow-slate-700/27">
            Add</button>
        </div>
        <div>
          {tasks.map((task)=> (
            <div key={task.id} className="flex justify-between items-center rounded-md px-4 py-2 bg-mist-800/40">
              <div>
              <input type="checkbox" 
              defaultChecked={task.completed} 
              onChange={() => completeTask(task.id)} 
              className="w-4 h-4 outline-none border-none rounded-full bg-zinc-200 accent-mist-600"></input>
              {editingTaskId === task.id ? (
                <input type="text" value={editedTaskText}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedTaskText(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      updateTask()
                    }
                  }}
                className="flex-1 px-3 py-2 rounded-md text-zinc-200 ml-2 shadow-md shadow-zinc-700/40 focus:shadow-zinc-700/70 outline-none border-none"></input>) : (
                  <span className={`flex-1 ml-2 text-zinc-200 ${task.completed ? 'line-through text-zinc-400': ''}`}>{task.text}</span>
                )
              }
              </div>
              <div className="flex items-center">
                {editingTaskId === task.id ? (
                  <button onClick={updateTask}
                  className="mr-2 bg-gradient-to-r from-slate-600 via-mist-600 to-slate-900 font-sans text-mist-200 flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:shadow-md focus:shadow-slate-700/20">
                    Save
                  </button>
                ): (<button
                onClick={() => startEditingTask(task.id, task.text)}
                className="bg-gradient-to-r mr-2 from-slate-500 via-mist-600 to-slate-900 font-sans text-mist-200 flex text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:shadow-md focus:shadow-slate-700/20">
                  Edit
                </button>)}
                <button
                onClick={() => deleteTask(task.id)}
                className="bg-gradient-to-r fill-mist-200 from-taupe-500 via-mauve-600 to-taupe-900 flex text-mist-900 text-center rounded-3xl items-center hover:bg-gradient-to-br px-5 py-1.5 focus:shadow-md focus:shadow-taupe-700/20"><img src="trash_colored.svg"></img></button>
              </div>
            </div>
          ))}
        </div>
      </div>
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

interface Task {
  id: number;
  text: string;
  completed: boolean;
}



export default function Home() {
  
  const [focusTime, setFocusTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [focus, setFocus] = useState(false);
  const [takeBreak, setTakeBreak] = useState(false);
  const intervalTime = useRef(null);
  const intervalBreak = useRef(null);




  return (
    <main className="">
      <div className="bg-gradient-to-br from-mist-800 via-mist-900 to-mist-950 h-dvh w-dvw flex flex-row">
        <div className="w-[35vw]">
        <Tasks
        breakTime={breakTime}
        setBreakTime={setBreakTime}/>
        </div>
        <div className="flex-col w-[65vw]">
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
      
      </div>
    </main>
  );
}
