import { useState, useEffect } from 'react'
import PomodoroWrapper from './components/pomodoro-wrapper';
import PomodoroHeader from './components/pomodoro-header';
import PomodoroContent from './components/pomodoro-content';
import './App.css';
import PomodoroFooter from './components/pomodoro-footer';

function App() {
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const minute = 1000 * 60;

  const setPomodoroTime = () => {
    let newTime = (minute * 25);
    setTime(newTime);
  };
  
  const setShortBreak = () => {
    let newTime = (minute * 5);
    setTime(newTime);
  };

  const setLongBreak = () => {
    let newTime = (minute * 15);
    setTime(newTime);
  };

  const onTimerAction = () => {
    if (isTimerRunning) {
      setTime(0);
    }
    setIsTimerRunning(isTimerRunning => !isTimerRunning);
  };
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      if (time >= 1000) {
        interval = setInterval(() => {
          setTime(time => time - 1000);
        }, 1000);
      }
      else if (interval) {
        clearInterval(interval);
        setIsTimerRunning(false); 
      }
    }
    else if (!isTimerRunning) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, time]);

  return (
    <PomodoroWrapper className="text-white bg-black h-screen w-screen">
      <PomodoroHeader className="h-1/5 m-0 p-0 flex justify-around justify-items-center content-around items-center"
                      isTimerRunning={isTimerRunning}
                      setPomodoro={setPomodoroTime} 
                      setShortBreak={setShortBreak}
                      setLongBreak={setLongBreak} />
      <PomodoroContent className="h-3/5 flex justify-center justify-items-center content-center items-center" time={time} />
      <PomodoroFooter className="h-1/5 flex justify-center justify-items-center content-center items-center text-4xl"
                      time={time}
                      onTimerAction={onTimerAction} 
                      isTimerRunning={isTimerRunning} />
    </PomodoroWrapper>
  )
}

export default App
