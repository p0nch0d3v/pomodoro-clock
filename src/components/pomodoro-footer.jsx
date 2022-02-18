import 'react';

export default function PomodoroFooter ({ className, time, isTimerRunning, onTimerAction, onCancelAction }) {
    const commonButtonClass = "text-white font-bold py-2 px-4 rounded text-6vw disabled:opacity-50 text-4.5vw"
    return (
        <sectiom className={"pomodoro-footer " + className}>
            { time > 0 && !isTimerRunning &&
                <button className={"mr-3 bg-gray-500 hover:bg-gray-700 " + commonButtonClass}
                        onClick={onCancelAction}>
                    Cancel
                </button>
            }
            <button disabled={time <= 0} 
                    className={
                        (isTimerRunning ? 
                        "bg-red-500 hover:bg-red-700 " :
                        "bg-green-500 hover:bg-green-700 " )
                        + commonButtonClass}
                    onClick={onTimerAction}>
                {isTimerRunning ? 'Stop': 'Start'}
            </button>
        </sectiom>
    );
}