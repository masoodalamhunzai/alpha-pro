import { settings as s } from 'app/services/Settings';
import axios from './axios';

const getUrl = (ep) => `${s.baseUrl}${ep}`;

export const getData = async (relativeUrl) => {
  const url = getUrl(relativeUrl);
  try {
    const response = await axios.get(url).then((res) => res);
    return { status: response.status, data: response.data };
  } catch (err) {
    console.error('error', err);
    return null;
  }
};

export const getDataAnonymously = async (relativeUrl) => {
  const url = getUrl(relativeUrl);
  try {
    const response = await axios.get(url).then((res) => res);
    console.log('response getDataAnonymously in',response)
    return { status: response.status, data: response.data };
  } catch (err) {
    console.error('error', err);
    return null;
  }
};

export const postData = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  try {
    const response = await axios.post(url, data);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('error', err);
    return null;
  }
};

export const postFormData = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.post(url, data, config);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('error', err);
    return null;
  }
};

export const postDataAnonymously = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);

  try {
    const response = await axios.post(url, data);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('error', err);
    return null;
  }
};

export const resetPassword = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  try {
    const response = await axios.post(url, data);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('error', err);
    return null;
  }
};

export const postFile = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);

  try {
    const response = await axios.post(url, data);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('error', err);
    return null;
  }
};

export const putData = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);

  try {
    const response = await axios.put(url, data);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('error', err);
    return null;
  }
};

export const putFormData = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.put(url, data, config);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('error', err);
    return null;
  }
};

export const deleteData = async (relativeUrl) => {
  const url = getUrl(relativeUrl);
  try {
    const response = await axios.delete(url);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error('error', err);
    return null;
  }
};
