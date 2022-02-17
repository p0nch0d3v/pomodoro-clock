import { useState, useEffect } from 'react'
import PomodoroWrapper from './components/pomodoro-wrapper';
import PomodoroHeader from './components/pomodoro-header';
import PomodoroContent from './components/pomodoro-content';
import PomodoroFooter from './components/pomodoro-footer';
import './App.css';

function App() {
  const [time, set_time] = useState(0);
  const [isTimerRunning, set_isTimerRunning] = useState(false);
  const [audio, set_audio] = useState(null);
  const [pulse, set_pulse] = useState(true);

  const second = 1000;
  const minute = second * 60;

  const setPomodoroTickAudio = () => {
    var new_audio = new Audio('./sounds/pomodoro_tick.mp3');
    new_audio.loop = true;
    set_audio(new_audio);
  };

  const setPomodoroEndAudio = () => {
    var new_audio = new Audio('./sounds/pomodoro_end.mp3');
    new_audio.loop = false;
    new_audio.play();
    set_audio(audio);
  };

  const setPomodoroTime = () => {
    let newTime = (minute * 25);
    set_time(newTime);
    setPomodoroTickAudio();
  };
  
  const setShortBreak = () => {
    let newTime = (minute * 5);
    set_time(newTime);
    setPomodoroTickAudio();
  };

  const setLongBreak = () => {
    let newTime = (minute * 15);
    set_time(newTime);
    setPomodoroTickAudio();
  };

  const onTimerAction = () => {
    if (isTimerRunning) {
      set_time(0);
      if (audio) {
        audio.pause();
      }
    }
    else {
      if (audio) {
        audio.play();
      }
    }
    set_isTimerRunning(isTimerRunning => !isTimerRunning);
  };

  useEffect(() => {
    let interval = null;

    if (isTimerRunning) {
      if (time >= 1000) {
        interval = setInterval(() => {
          set_time(time => time - 1000);
        }, 1000);
        set_pulse(!pulse);
      }
      else  {
        // Finished
        clearInterval(interval);
        set_istimerRunning(false); 
        audio.pause();
        setPomodoroEndAudio();
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
      <PomodoroContent className="h-3/5 flex justify-center justify-items-center content-center items-center" 
                      time={time} 
                      pulse={pulse ? ":" : " "} />
      <PomodoroFooter className="h-1/5 flex justify-center justify-items-center content-center items-center text-4xl"
                      time={time}
                      onTimerAction={onTimerAction} 
                      isTimerRunning={isTimerRunning} />
    </PomodoroWrapper>
  )
}

export default App
