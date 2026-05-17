import React from 'react';

interface Props {
  hint: string;
  phase: string;
  isDrawer: boolean;
  currentWord?: string;
}

const HintDisplay: React.FC<Props> = ({ hint, phase, isDrawer, currentWord }) => {
  if (phase === 'word_selection') {
    return (
      <div className="hint-display">
        <div className="hint-waiting">
          {isDrawer ? 'Pick a word to draw!' : 'Waiting for drawer to pick a word...'}
        </div>
      </div>
    );
  }

  if (isDrawer && currentWord) {
    return (
      <div className="hint-display">
        <div className="hint-word">{currentWord}</div>
        <div className="hint-length">({currentWord.length} letters)</div>
      </div>
    );
  }

  const letterCount = hint ? hint.split(' ').filter(c => c !== '').length : 0;

  return (
    <div className="hint-display">
      <div className="hint-text">{hint || '...'}</div>
      {letterCount > 0 && <div className="hint-length">({letterCount} letters)</div>}
    </div>
  );
};

export default HintDisplay;
