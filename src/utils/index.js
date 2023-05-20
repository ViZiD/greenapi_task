export function isEmpty(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

// api utils
export const filterTextMessage = (data) => data?.body?.messageData?.typeMessage === 'textMessage';

export const filterIncomingMessage = (data) =>
  data?.body?.typeWebhook === 'incomingMessageReceived';

export const filterChatBySender = (data, senderId) => data?.body?.senderData?.sender === senderId;

export const formatDate = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatNumber = (rawNumber) => {
  const number = rawNumber.match('^.?([7-9][0-9]{10})$')?.[1];
  if (number) return `${number}@c.us`;
  return null;
};

export const formatApiToken = (data) => data.replace(/\W/g, '');
