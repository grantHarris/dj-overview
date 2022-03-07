import React from 'react';
import moment from 'moment';

import Deck from './deck'

class Traktor extends React.Component {

  render() {
    const traktor = this.props.traktor;
    const name = this.props.name;

    console.log('traktor', traktor);

    return (
      <div>
        <h1>{name}</h1>
        {Object.keys(traktor)
          .map(deck=>(
            <Deck deck={traktor[deck]} name={deck} />
          ))
        }
      </div>
    );
  }
}

export default Traktor;
