import React from 'react';
import type { RoomState } from '../types';
import AvatarDisplay from '../components/AvatarDisplay';
import socket from '../socket';

interface Props {
  room: RoomState;
  myId: string;
}

const Lobby: React.FC<Props> = ({ room, myId }) => {
  const isHost = myId === room.hostId;

  const copyInvite = () => {
    const url = `${window.location.origin}?room=${room.id}`;
    navigator.clipboard.writeText(url).then(() => alert('Invite link copied!'));
  };

  const handleStart = () => {
    if (room.players.length < 2) return;
    socket.emit('start_game', {});
  };

  const handleKick = (targetId: string) => {
    socket.emit('kick_player', { targetId });
  };

  const s = room.settings;

  return (
    <div className="lobby-container">
      <h1 className="home-title" style={{ fontSize: 36 }}>Skribbl Clone</h1>

      <div className="home-card lobby-card">
        <div className="room-code-section">
          <div className="room-code-label">Room Code</div>
          <div className="room-code">{room.id}</div>
          <button className="btn btn-secondary btn-sm copy-btn" onClick={copyInvite}>
            📋 Copy Invite Link
          </button>
        </div>

        <div className="player-grid">
          {room.players.map((p) => (
            <div key={p.id} className="lobby-player-row">
              <AvatarDisplay avatar={p.avatar} name={p.name} size={36} />
              <span className="player-name">{p.name}</span>
              {p.id === room.hostId && <span className="badge badge-host">Host</span>}
              {p.id === myId && <span className="badge badge-you">You</span>}
              {isHost && p.id !== myId && (
                <button className="btn btn-danger btn-sm" onClick={() => handleKick(p.id)}>Kick</button>
              )}
            </div>
          ))}
        </div>

        {room.spectators.length > 0 && (
          <div className="spectators-section">
            <h4>👁 Spectators</h4>
            {room.spectators.map((s) => (
              <div key={s.id} className="lobby-player-row" style={{ opacity: 0.7 }}>
                <AvatarDisplay avatar={s.avatar} name={s.name} size={28} />
                <span className="player-name">{s.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="settings-summary">
          <h3>Settings</h3>
          <div className="settings-tags">
            <span className="settings-tag">👥 {s.maxPlayers} max</span>
            <span className="settings-tag">🔄 {s.rounds} rounds</span>
            <span className="settings-tag">⏱ {s.drawTime}s</span>
            <span className="settings-tag">📝 {s.wordCount} words</span>
            <span className="settings-tag">💡 {s.hints} hints</span>
            <span className="settings-tag">🔤 {s.wordMode}</span>
            {s.isPrivate && <span className="settings-tag">🔒 Private</span>}
          </div>
        </div>

        {isHost ? (
          <div className="lobby-actions">
            <button
              className="btn btn-primary"
              onClick={handleStart}
              disabled={room.players.length < 2}
            >
              {room.players.length < 2 ? 'Need 2+ players' : 'Start Game'}
            </button>
          </div>
        ) : (
          <div className="waiting-msg">Waiting for host to start the game...</div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
