const BASE_URL = 'https://ya-praktikum.tech';

type UrlData = {
  url: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  urlTemplate?: (arg: number | string) => string;
};

type MyUrl = {
  AUTHORIZATION: UrlData;
  REGISTRATION: UrlData;
  CHECK_AUTH: UrlData;
  LOGOUT: UrlData;
  UPDATE_USER: UrlData;
  UPDATE_AVATAR: UrlData;
  UPDATE_PASSWORD: UrlData;
  CREATE_CHAT: UrlData;
  GET_CHATS: UrlData;
  GET_CHAT_USERS: UrlData;
  GET_CHAT_COUNT_MESSAGE: UrlData;
  DELETE_USER_FROM_CHAT: UrlData;
  ADD_USER_IN_CHAT: UrlData;
  FIND_USER_BY_LOGIN: UrlData;
};

export const URL: MyUrl = {
  AUTHORIZATION: {
    url: `${BASE_URL}/api/v2/auth/signin`,
    method: 'POST',
  },
  REGISTRATION: {
    url: `${BASE_URL}/api/v2/auth/signup`,
    method: 'POST',
  },
  CHECK_AUTH: {
    url: `${BASE_URL}/api/v2/auth/user`,
    method: 'GET',
  },
  LOGOUT: {
    url: `${BASE_URL}/api/v2/auth/logout`,
    method: 'POST',
  },
  UPDATE_USER: {
    url: `${BASE_URL}/api/v2/user/profile`,
    method: 'PUT',
  },
  UPDATE_AVATAR: {
    url: `${BASE_URL}/api/v2/user/profile/avatar`,
    method: 'PUT',
  },
  UPDATE_PASSWORD: {
    url: `${BASE_URL}/api/v2/user/password`,
    method: 'PUT',
  },
  CREATE_CHAT: {
    url: `${BASE_URL}/api/v2/chats`,
    method: 'POST',
  },
  GET_CHATS: {
    url: `${BASE_URL}/api/v2/chats`,
    method: 'GET',
  },
  GET_CHAT_USERS: {
    url: `${BASE_URL}/api/v2/chats`,
    method: 'GET',
    urlTemplate: (chatId: number | string): string => `${BASE_URL}/api/v2/chats/${chatId}/users`,
  },
  GET_CHAT_COUNT_MESSAGE: {
    url: `${BASE_URL}/api/v2/chats`,
    method: 'GET',
    urlTemplate: (chatId: number | string): string => `${BASE_URL}/api/v2/chats/new/${chatId}`,
  },
  DELETE_USER_FROM_CHAT: {
    url: `${BASE_URL}/api/v2/chats/users`,
    method: 'DELETE',
  },
  ADD_USER_IN_CHAT: {
    url: `${BASE_URL}/api/v2/chats/users`,
    method: 'PUT',
  },
  FIND_USER_BY_LOGIN: {
    url: `${BASE_URL}/api/v2/user/search`,
    method: 'POST',
  },
};
