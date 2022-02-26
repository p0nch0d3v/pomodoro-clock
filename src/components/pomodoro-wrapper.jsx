import 'react';

export default function PomodoroWrapper(props) {
    return (
        <div className={' ' + props.className}>
            {props.children}
        </div>
    )
}