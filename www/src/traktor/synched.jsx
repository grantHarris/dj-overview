import React from 'react';

class Synched extends React.Component {

  render() {
    if (this.props.isSynced){
      return (
        <h1 style={{"color": "green"}}>
          SYNCHED
        </h1>
      );
    }else{
      return (
        <h1 >
          SYNCHED
        </h1>
      );
    }
  }
}

export default Synched;
