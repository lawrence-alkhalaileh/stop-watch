import { useState, useEffect, useRef } from 'react'

function Watch() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElampsedTime] = useState(0)
  const intervalIDRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(() => {
    if (isRunning) {
      intervalIDRef.current = setInterval(() => {
        setElampsedTime(Date.now() - startTimeRef.current)
      }, 80)

      return () => {
        clearInterval(intervalIDRef.current)
      }
    }
  }, [isRunning])

  function start() {
    setIsRunning(true)
    startTimeRef.current = Date.now() - elapsedTime
  }

  function stop() {
    setIsRunning(false)
  }

  function reset() {
    setElampsedTime(0)
    setIsRunning(false)
  }


  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60)
    let seconds = Math.floor(elapsedTime / (1000) % 60)
    let milliSeconds = Math.floor((elapsedTime % 1000) /10)

    hours = String(hours).padStart(2, "0")
    minutes = String(minutes).padStart(2, "0")
    seconds = String(seconds).padStart(2, "0")
    milliSeconds = String(milliSeconds).padStart(2, "0")
    
    
    return `${hours}:${minutes}:${seconds}:${milliSeconds}`
  }
  return (
    <div className='watch'>
      <h1 className="time">{formatTime()}</h1>
      <div className="controls">
        <button onClick={stop} className='stop'>Stop</button>
        <button onClick={start} className='start'>Start</button>
        <button onClick={reset} className='reset'>Reset</button>
      </div>
    </div>
  )
}

export default Watch