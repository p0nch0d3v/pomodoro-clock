import 'react';

export default function PomodoroFooter ({ className, time, isTimerRunning, onTimerAction}) {
    const commonButtonClass = "text-white font-bold py-2 px-4 rounded text-6vw disabled:opacity-50"
    return (
        <sectiom className={"pomodoro-footer " + className}>
        { isTimerRunning ?
            <button disabled={time <= 0} 
                    className={"bg-red-500 hover:bg-red-700 " + commonButtonClass}
                    onClick={onTimerAction}>
                {isTimerRunning ? 'Stop': 'Start'}
            </button> : 
            <button disabled={time <= 0} 
                    className={"bg-green-500 hover:bg-green-700 " + commonButtonClass}
                    onClick={onTimerAction}>
                {isTimerRunning ? 'Stop': 'Start'}
            </button> }
        </sectiom>
    );
}