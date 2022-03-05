import React from 'react';
import moment from 'moment';

import Playback from './playback'
import Synched from './synched'

class Deck extends React.Component {


  render() {
    const deck = this.props.deck;

    const sFormat = (seconds) => {
      return moment().startOf('day').seconds(seconds).format('mm:ss');
    };

    const elapsedTimeFormatted = sFormat(deck.elapsedTime || 0);
    const remainingTimeFormatted = sFormat((deck.trackLength || 0) - (deck.elapsedTime || 0));
    const trackLengthFormatted = sFormat(deck.trackLength || 0);

    const percentage = (deck.elapsedTime / deck.trackLength * 100);
    
    const style = {
      width: percentage + '%',
    };

    return (
      <div className="card">
        <div className="card-body">
          <h1>{this.props.name}</h1>
          <h2>{deck.title} - {deck.artist}</h2>
          <h3>{deck.album} {deck.songKey}</h3>
          <h4>-{remainingTimeFormatted} - {trackLengthFormatted}</h4>
          <h4>Tempo: {deck.tempo}</h4>
          <h4>{Number(deck.bpm).toFixed(2)} BPM</h4>
{/*          <Playback isPlaying={true} />*/}
          <Synched isSynced={deck.isSynced} />
          <div className="progress">
              <div className="progress-bar" role="progressbar" style={style} aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Deck;


// nextCuePos
// resultingKey
// isSynced
// isKeyLockOn