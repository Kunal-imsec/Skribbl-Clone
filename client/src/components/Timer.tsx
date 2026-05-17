import React from 'react';

interface Props {
  timeRemaining: number;
  drawTime: number;
}

const Timer: React.FC<Props> = ({ timeRemaining, drawTime }) => {
  const pct = drawTime > 0 ? (timeRemaining / drawTime) * 100 : 0;
  const colorClass = pct > 50 ? 'green' : pct > 25 ? 'yellow' : 'red';

  return (
    <div className="timer-container">
      <div className="timer-bar-track">
        <div
          className={`timer-bar-fill ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="timer-seconds" style={{ color: pct <= 25 ? 'var(--red)' : 'var(--text-secondary)' }}>
        {timeRemaining}s
      </div>
    </div>
  );
};

export default Timer;
