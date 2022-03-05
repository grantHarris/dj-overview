import React from 'react';

import { PlayBtnFill, StopBtnFill } from 'react-bootstrap-icons';


class Playback extends React.Component {

  render() {
    console.log(this.props.isPlaying);

    if (this.props.isPlaying){
      return (
        <h1>
          <PlayBtnFill color="green" />
        </h1>
      );
    }else{
      return (
        <h1>
          <StopBtnFill color="red" />
        </h1>
      );
    }
  }
}

export default Playback;
