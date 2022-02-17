import 'react';

export default function PomodoroHeader({ className, isTimerRunning, setPomodoro, setShortBreak, setLongBreak }) {
    const commonButtonClass = "text-4xl text-white font-bold py-2 px-4 rounded text-ellipsis overflow-hidden max-w-fit whitespace-nowrap text-5vw disabled:opacity-50"
    return (
        <section className={'pomodoro-header ' + className}>
            <button disabled={isTimerRunning} 
                    className={"bg-gray-500 hover:bg-gray-700 " + commonButtonClass}
                    onClick={setPomodoro}>Pomodoro</button>
            <button disabled={isTimerRunning}
                    className={"bg-gray-500 hover:bg-gray-700 " + commonButtonClass}
                    onClick={setShortBreak}>Short Break</button>
            <button disabled={isTimerRunning} 
                    className={"bg-gray-500 hover:bg-gray-700 " + commonButtonClass}
                    onClick={setLongBreak}>Long Break</button>
        </section>
    )
}