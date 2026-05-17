import React from 'react';
import type { Player } from '../types';
import AvatarDisplay from './AvatarDisplay';
import socket from '../socket';

interface Props {
  winner: Player | null;
  leaderboard: Player[];
  isHost: boolean;
}

const GameOver: React.FC<Props> = ({ winner, leaderboard, isHost }) => {
  const handlePlayAgain = () => socket.emit('start_game', {});
  const handleLeave = () => { socket.disconnect(); window.location.reload(); };

  const top3 = leaderboard.slice(0, 3);
  // Reorder for podium display: [2nd, 1st, 3rd]
  const podiumOrder = top3.length >= 3
    ? [top3[1], top3[0], top3[2]]
    : top3.length === 2 ? [top3[1], top3[0]] : [top3[0]];

  const barClass = (orig: number) => orig === 0 ? 'first' : orig === 1 ? 'second' : 'third';
  const origIndex = (p: Player) => top3.findIndex(t => t.id === p.id);

  return (
    <div className="overlay-screen">
      <div className="overlay-card game-over-card">
        <h1>🎉 Game Over!</h1>

        {winner && (
          <div className="winner-section">
            <img src={winner.avatar} alt={winner.name} />
            <div className="winner-name">{winner.name}</div>
            <div className="winner-score">{winner.score} points</div>
            <div className="winner-badge">🏆 Winner!</div>
          </div>
        )}

        <div className="podium">
          {podiumOrder.filter(Boolean).map((p) => {
            const idx = origIndex(p);
            return (
              <div className="podium-slot" key={p.id}>
                <AvatarDisplay avatar={p.avatar} name={p.name} size={idx === 0 ? 56 : 44} />
                <div className="podium-name">{p.name}</div>
                <div className="podium-score">{p.score} pts</div>
                <div className={`podium-bar ${barClass(idx)}`}>
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                </div>
              </div>
            );
          })}
        </div>

        <table className="scores-table">
          <thead>
            <tr><th>#</th><th></th><th>Player</th><th>Score</th></tr>
          </thead>
          <tbody>
            {leaderboard.map((p, i) => (
              <tr key={p.id}>
                <td className="rank">{i + 1}</td>
                <td><AvatarDisplay avatar={p.avatar} name={p.name} size={28} /></td>
                <td>{p.name}</td>
                <td style={{ fontWeight: 700, color: 'var(--accent-light)' }}>{p.score}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="game-over-actions">
          {isHost && (
            <button className="btn btn-primary" onClick={handlePlayAgain}>Play Again</button>
          )}
          <button className="btn btn-secondary" onClick={handleLeave}>Leave</button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
