/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Message extends Component {
  render() {
    const { text, userName } = this.props;

    return (
      <div>
        <b>{userName}</b>
        <br></br>
        {text}
      </div>
    );
  }
}

export default Message;
