import { useState, useEffect } from 'react'
import './App.css';
import StopWatch from './images/stop-watch.jsx';

function App() {
  const [time, set_time] = useState(0);
  const [isTimerRunning, set_isTimerRunning] = useState(false);
  const [audio, set_audio] = useState(null);

  const tickSound = new Audio('./sounds/pomodoro_tick.mp3');
  tickSound.preload = "auto";
  const endSound = new Audio('./sounds/pomodoro_end.mp3');
  endSound.preload = "auto";

  const second = 1000;
  const minute = second * 60;

  const totalSeconds = time / 1000;
  const minutes =  Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formatDigit = (digit) => {
      if (digit < 10) {
          return `0${digit}`; 
      }
      return digit;
  };

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

  const commonClasses = "col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3";

  return (
    <div className="pomodoro container-fluid">
      <div className="pomorodo-wrapper row">
        <StopWatch className={commonClasses + "icon"} color={'#FFFFFF'} />
        <span className={commonClasses + "mb-1 mt-1"}>
          <button className="btn btn-danger w-75"
                  disabled={isTimerRunning} 
                  onClick={setPomodoroTime}>25 m</button>
        </span>
        <span className={commonClasses + "mb-1 mt-1"}>
          <button disabled={isTimerRunning}
                  className="btn btn-primary w-75"
                  onClick={setShortBreak}>05 m</button>
        </span>
        <span className={commonClasses + "mb-1 mt-1"}>
          <button disabled={isTimerRunning} 
                  className="btn btn-success w-75"
                  onClick={setLongBreak}>15 m</button>
        </span>
        {time > 0 && 
          <span>
            `${formatDigit(minutes)}:${formatDigit(seconds)}`
          </span>
        }

        { time > 0 && !isTimerRunning &&
          <button className=""
                  onClick={onCancelAction}>
              Cancel
          </button>
        }

        { time > 0 && 
        <button disabled={time <= 0} 
                className=""
                onClick={onTimerAction}>
            {isTimerRunning ? 'Stop': 'Start'}
        </button>
        }
      </div>
    </div>
    // <PomodoroWrapper className="">
    //   {!isTimerRunning && time === 0 && 
    //   <PomodoroHeader className=""
    //                   isTimerRunning={isTimerRunning}
    //                   setPomodoro={setPomodoroTime} 
    //                   setShortBreak={setShortBreak}
    //                   setLongBreak={setLongBreak} /> 
    //   }
    //   { time > 0 && 
    //   <PomodoroContent className="" 
    //                   time={time} /> 
    //   }
    //   {(isTimerRunning || time > 0 )  && 
    //   <PomodoroFooter className=""
    //                   time={time}
    //                   onTimerAction={onTimerAction} 
    //                   onCancelAction={onCancelAction}
    //                   isTimerRunning={isTimerRunning} /> 
    //   }
    // </PomodoroWrapper>
  )
}

export default App
