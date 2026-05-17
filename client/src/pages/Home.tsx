import React, { useState, useEffect } from 'react';
import socket from '../socket';

interface Props {
  initialRoomCode?: string;
}

const Home: React.FC<Props> = ({ initialRoomCode }) => {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState(initialRoomCode || '');
  const [tab, setTab] = useState<'create' | 'join'>(initialRoomCode ? 'join' : 'create');

  // Prefill room code from ?room= query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
      setTab('join');
      setRoomCode(roomParam.toUpperCase());
    }
  }, []);

  // Settings state
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [rounds, setRounds] = useState(3);
  const [drawTime, setDrawTime] = useState(80);
  const [wordCount, setWordCount] = useState(3);
  const [hints, setHints] = useState(2);
  const [wordMode, setWordMode] = useState<'normal' | 'hidden' | 'combination'>('normal');
  const [isPrivate, setIsPrivate] = useState(false);
  const [customWordsText, setCustomWordsText] = useState('');

  const avatarUrl = name.trim()
    ? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(name.trim())}`
    : `https://api.dicebear.com/7.x/pixel-art/svg?seed=player`;

  const handleCreate = () => {
    if (!name.trim()) return alert('Enter your name');
    const customWords = customWordsText
      .split(',')
      .map(w => w.trim())
      .filter(Boolean);

    if (!socket.connected) socket.connect();
    socket.emit('create_room', {
      name: name.trim(),
      settings: { maxPlayers, rounds, drawTime, wordCount, hints, wordMode, isPrivate, customWords },
    });
  };

  const handleJoin = () => {
    if (!name.trim()) return alert('Enter your name');
    if (!roomCode.trim()) return alert('Enter room code');
    if (!socket.connected) socket.connect();
    socket.emit('join_room', { roomId: roomCode.trim().toUpperCase(), name: name.trim() });
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Skribbl Clone</h1>
      <p className="home-subtitle">Draw, guess, and have fun with friends!</p>

      <div className="home-card">
        <div className="avatar-preview">
          <img src={avatarUrl} alt="avatar" />
          <span>{name.trim() || 'Your Avatar'}</span>
        </div>

        <input
          className="name-input"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
        />

        <div className="tab-bar">
          <button className={`tab-btn ${tab === 'create' ? 'active' : ''}`} onClick={() => setTab('create')}>
            Create Room
          </button>
          <button className={`tab-btn ${tab === 'join' ? 'active' : ''}`} onClick={() => setTab('join')}>
            Join Room
          </button>
        </div>

        {tab === 'create' ? (
          <>
            <div className="settings-grid">
              <div className="field">
                <label>Max Players</label>
                <input type="number" min={2} max={20} value={maxPlayers} onChange={e => setMaxPlayers(+e.target.value)} />
              </div>
              <div className="field">
                <label>Rounds</label>
                <input type="number" min={2} max={10} value={rounds} onChange={e => setRounds(+e.target.value)} />
              </div>
              <div className="field">
                <label>Draw Time (s)</label>
                <input type="number" min={15} max={240} value={drawTime} onChange={e => setDrawTime(+e.target.value)} />
              </div>
              <div className="field">
                <label>Word Count</label>
                <input type="number" min={1} max={5} value={wordCount} onChange={e => setWordCount(+e.target.value)} />
              </div>
              <div className="field">
                <label>Hints</label>
                <input type="number" min={0} max={5} value={hints} onChange={e => setHints(+e.target.value)} />
              </div>
              <div className="field">
                <label>Word Mode</label>
                <select value={wordMode} onChange={e => setWordMode(e.target.value as typeof wordMode)}>
                  <option value="normal">Normal</option>
                  <option value="hidden">Hidden</option>
                  <option value="combination">Combination</option>
                </select>
              </div>
              <div className="field field-full checkbox-field">
                <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
                <label>Private Room</label>
              </div>
              <div className="field field-full">
                <label>Custom Words (comma separated)</label>
                <textarea value={customWordsText} onChange={e => setCustomWordsText(e.target.value)} placeholder="word1, word2, word3..." />
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCreate}>
              Create Room
            </button>
          </>
        ) : (
          <div className="join-section">
            <input
              placeholder="ROOM CODE"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
            />
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleJoin}>
              Join Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
