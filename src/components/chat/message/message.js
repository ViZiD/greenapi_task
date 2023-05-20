import { memo } from 'react';
import './message.css';

const Message = ({ message }) => {
  return (
    <div className={`message ${message.incoming ? 'incoming' : 'outcoming'}`}>
      <div className="message_content">
        <div className="message_body">
          {message.text}
          <span className="message_time">{message.time}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Message);
