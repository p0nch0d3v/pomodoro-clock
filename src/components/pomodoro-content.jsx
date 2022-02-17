import 'react';

export default function PomodoroContent ({ className, time }) {
    const totalSeconds = time / 1000;
    const minutes =  Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formatDigit = (digit) => {
        if (digit < 10) {
            return `0${digit}`; 
        }
        return digit;
    };
    return (
        <section className={"pomodoro-content " + className}>
            <section className="text-48vh text-center">
                {`${formatDigit(minutes)}:${formatDigit(seconds)}`}
            </section>
        </section>
    );
}