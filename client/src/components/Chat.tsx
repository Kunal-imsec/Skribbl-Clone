import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

interface Props {
  messages: ChatMessage[];
  onSendGuess: (text: string) => void;
  onSendChat: (text: string) => void;
  isDrawer: boolean;
  phase: string;
  isSpectator: boolean;
}

const Chat: React.FC<Props> = ({ messages, onSendGuess, onSendChat, isDrawer, phase, isSpectator }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    if (phase === 'drawing' && !isDrawer && !isSpectator) {
      onSendGuess(text);
    } else {
      onSendChat(text);
    }
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const inputDisabled = (isDrawer && phase === 'drawing') || isSpectator;
  const placeholder = isSpectator
    ? 'Spectating...'
    : isDrawer && phase === 'drawing'
      ? 'You are drawing...'
      : 'Type your guess...';

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>
      <div className="chat-messages">
        {messages.map((msg, i) => {
          let cls = 'chat-msg';
          if (msg.isCorrect) cls += ' correct';
          else if (msg.isSystem) cls += ' system';
          else if (msg.isGuess) cls += ' guess';

          return (
            <div key={i} className={cls}>
              {msg.isSystem || msg.isCorrect ? (
                msg.text
              ) : (
                <>
                  <span className="sender">{msg.playerName}: </span>
                  {msg.text}
                </>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={inputDisabled}
        />
        <button className="btn btn-primary btn-sm" onClick={handleSend} disabled={inputDisabled}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
