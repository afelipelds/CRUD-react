import React from 'react';

const Message = ({message, bgColor}) => {
  let styles = {
    padding: '1rem',
    marginBottom: '1rem',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: bgColor,
  }
  return (
    <div style={styles}>
      <h4>{message}</h4>
    </div>
  )
}

export default Message
