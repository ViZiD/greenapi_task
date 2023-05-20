import axios from 'axios';

const baseURL = 'https://api.green-api.com/';

const apiInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const setWebhookSetting = async ({ setting, idInstance, apiTokenInstance }) => {
  try {
    const { data } = await apiInstance.post(
      `/waInstance${idInstance}/SetSettings/${apiTokenInstance}`,
      setting,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const sendTextMessage = async ({ chatId, message, idInstance, apiTokenInstance }) => {
  try {
    const msgData = {
      chatId,
      message,
    };
    const { data } = await apiInstance.post(
      `/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      msgData,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const receiveNotification = async ({ idInstance, apiTokenInstance }) => {
  try {
    const { data } = await apiInstance.get(
      `/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotification = async ({ receiptId, idInstance, apiTokenInstance }) => {
  try {
    const { data } = await apiInstance.delete(
      `/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getChatHistory = async ({ chatId, count, idInstance, apiTokenInstance }) => {
  try {
    const reqData = {
      chatId,
      count,
    };
    const { data } = await apiInstance.post(
      `/waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
      reqData,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
