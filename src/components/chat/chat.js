import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteNotification, receiveNotification, sendTextMessage } from '../../api';
import { filterIncomingMessage, filterTextMessage, formatDate, isEmpty } from '../../utils';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './chat.css';
import Message from './message/message';
import { ReactComponent as SendIcon } from '../../assets/send.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';

export const Chat = () => {
  const messageListRef = useRef(null);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useLocalStorage('loginData', {});
  const [userNumber, setUserNumber] = useLocalStorage('userNumber', '');
  const [messages, setMesssages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    if (messageListRef) {
      messageListRef.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  useEffect(() => {
    if (isEmpty(loginData) && !userNumber) {
      navigate('/auth');
    }
  }, [loginData, userNumber]);

  const handleDeleteNotification = async (receiptId) => {
    await deleteNotification({
      receiptId: receiptId,
      idInstance: loginData?.idInstance,
      apiTokenInstance: loginData?.apiTokenInstance,
    });
  };

  useEffect(() => {
    const id = setInterval(async () => {
      const data = await receiveNotification({
        idInstance: loginData?.idInstance,
        apiTokenInstance: loginData?.apiTokenInstance,
      });
      const filterMessage =
        !isEmpty(data) && filterIncomingMessage(data) && filterTextMessage(data);
      if (filterMessage) {
        const newMsg = {
          id: data?.body?.idMessage,
          text: data?.body?.messageData?.textMessageData?.textMessage,
          time: formatDate(new Date(data?.body?.timestamp)),
          incoming: true,
        };
        setMesssages((prevState) => [...prevState, newMsg]);
      }
      if (data?.receiptId) handleDeleteNotification(data?.receiptId);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const onSendMessage = async () => {
    if (messageText.trim().length === 0) return;

    const sendedMessage = await sendTextMessage({
      chatId: userNumber,
      message: messageText,
      idInstance: loginData.idInstance,
      apiTokenInstance: loginData.apiTokenInstance,
    });
    setMesssages((prevState) => [
      ...prevState,
      {
        id: sendedMessage?.idMessage,
        text: messageText,
        time: formatDate(new Date()),
        incoming: false,
      },
    ]);
    setMessageText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSendMessage(e);
    }
  };

  const onLogout = () => {
    setLoginData({});
    setUserNumber('');
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <span className="chat_usernumber">{userNumber.replace('@c.us', '')}</span>
        <span className="chat_logout" onClick={onLogout}>
          <LogoutIcon />
        </span>
      </div>
      <div className="message_list" ref={messageListRef}>
        {messages.map((msg, index) => {
          return <Message key={index} message={msg} />;
        })}
      </div>
      <div className="chat_form">
        <input
          className="chat_input"
          autoComplete="off"
          required
          type="text"
          name="messageText"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Введите сообщение"
          onKeyDown={handleKeyDown}
        />
        <SendIcon onClick={onSendMessage} className="send_button" />
      </div>
    </div>
  );
};
