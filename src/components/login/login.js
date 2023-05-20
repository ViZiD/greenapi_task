import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './login.css';
import { formatApiToken, isEmpty } from '../../utils';
import { setWebhookSetting } from '../../api';

export const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useLocalStorage('loginData', {});
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  useEffect(() => {
    if (!isEmpty(loginData)) {
      navigate('/user');
    }
  }, [loginData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idInstance && apiTokenInstance) {
      setLoginData({
        idInstance,
        apiTokenInstance,
      });
      const webHookSetting = {
        webhookUrl: '',
        outgoingWebhook: 'yes',
        stateWebhook: 'yes',
        incomingWebhook: 'yes',
      };
      await setWebhookSetting({
        setting: webHookSetting,
        idInstance,
        apiTokenInstance,
      });
    } else {
      alert('Type something first');
    }
  };
  return (
    <div className="login">
      <form>
        <label className="login_input_label">
          IdInstance:
          <input
            className="login_input"
            autoComplete="off"
            required
            type="text"
            name="IdInstance"
            value={idInstance}
            onChange={(e) => setIdInstance(formatApiToken(e.target.value))}
          />
        </label>
        <label className="login_input_label">
          ApiTokenInstance:
          <input
            className="login_input"
            autoComplete="off"
            required
            type="text"
            name="ApiTokenInstance"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(formatApiToken(e.target.value))}
          />
        </label>
        <input type="submit" value="Войти" onClick={handleSubmit} className="login_submit" />
      </form>
    </div>
  );
};
