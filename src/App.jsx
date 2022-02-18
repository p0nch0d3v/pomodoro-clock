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

  const tickSound = new Audio('./sounds/pomodoro_tick.mp3');
  tickSound.preload = "auto";
  const endSound = new Audio('./sounds/pomodoro_end.mp3');
  endSound.preload = "auto";

  const second = 1000;
  const minute = second * 60;

  const setPomodoroTickAudio = () => {
    var new_audio = tickSound;
    new_audio.loop = true;
    set_audio(new_audio);
  };

  const setPomodoroEndAudio = () => {
    var new_audio = endSound;
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

  const onCancelAction = () => {
    set_isTimerRunning(false);
    set_time(0);
    if (audio) {
      audio.pause();
      set_audio(null);
    }
  };

  useEffect(() => {
    let interval = null;

    if (isTimerRunning) {
      if (time >= 1000) {
        interval = setInterval(() => {
          set_time(time => time - 1000);
        }, 1000);
      }
      else  {
        // Finished
        clearInterval(interval);
        set_isTimerRunning(false); 
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
      {!isTimerRunning && time === 0 && 
      <PomodoroHeader className="h-2/5 m-0 p-0 flex justify-around justify-items-center content-around items-center"
                      isTimerRunning={isTimerRunning}
                      setPomodoro={setPomodoroTime} 
                      setShortBreak={setShortBreak}
                      setLongBreak={setLongBreak} /> 
      }
      { time > 0 && 
      <PomodoroContent className="h-3/5 flex justify-center justify-items-center content-center items-center" 
                      time={time} /> 
      }
      {(isTimerRunning || time > 0 )  && 
      <PomodoroFooter className="h-2/5 flex justify-center justify-items-center content-center items-center text-4xl"
                      time={time}
                      onTimerAction={onTimerAction} 
                      onCancelAction={onCancelAction}
                      isTimerRunning={isTimerRunning} /> 
      }
    </PomodoroWrapper>
  )
}

export default App
