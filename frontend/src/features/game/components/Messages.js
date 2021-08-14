/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {
  render() {
    const { messages } = this.props;

    return messages.map((message, i) => (
      <div className={`messages__item ${message.chatClass}`} key={i}>
        <Message text={message.text} userName={message.userName} />
      </div>
    ));
  }
}

export default Messages;
