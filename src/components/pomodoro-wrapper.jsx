import 'react';

export default function PomodoroWrapper(props) {
    return (
        <div className={'pomodoro-wrapper ' + props.className}>
            {props.children}
        </div>
    )
}