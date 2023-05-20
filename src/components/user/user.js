import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './user.css';
import { formatNumber, isEmpty } from '../../utils';
// import { getChatHistory } from '../../api';

export const UserNumberInput = () => {
  const navigate = useNavigate();
  const [loginData] = useLocalStorage('loginData', {});
  // const [, setChatHistory] = useLocalStorage('chatHistory', {});
  const [savedNumber, saveUserNumber] = useLocalStorage('userNumber', '');
  const [userNumber, setUserNumber] = useState('');

  useEffect(() => {
    if (savedNumber) navigate('/chat');
    if (isEmpty(loginData)) navigate('/auth');
  }, [savedNumber, loginData]);

  const numberHandler = async (e) => {
    e.preventDefault();
    const number = formatNumber(userNumber);
    if (number) {
      saveUserNumber(number);
      // const chatHistory = await getChatHistory({
      //   chatId: number,
      //   count: 10,
      //   idInstance: loginData.idInstance,
      //   apiTokenInstance: loginData.apiTokenInstance,
      // });
    } else {
      alert('Неправильно набран номер!');
    }
  };
  return (
    <div className="user">
      <form>
        <label className="user_input_label">
          Номер пользователя:
          <input
            className="user_input"
            required
            type="text"
            name="userNumber"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
          />
        </label>
        <input type="submit" value="Сохранить" onClick={numberHandler} className="user_submit" />
      </form>
    </div>
  );
};
