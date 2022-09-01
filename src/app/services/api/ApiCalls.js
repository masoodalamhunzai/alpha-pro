import axios, { get } from "axios";
import { settings as s } from "app/services/Settings";

const getUrl = (ep) => `${s.baseUrl}${ep}`;

export const getData = async (relativeUrl, user) => {
  const url = getUrl(relativeUrl);
  const options = {
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json-patch+json",
      Accept: "*/*",
    },
  };
  try {
    const response = await get(url, options).then((res) => res);
    return { status: response.status, data: response.data };
  } catch (err) {
    if (err.response) {
      return { status: err.response.status, data: [] };
    }
    return { status: 0, data: [] };
  }
};
export const getDataAnonymously = async (relativeUrl) => {
  const url = getUrl(relativeUrl);
  const options = {
    headers: {
      "Content-Type": "application/json-patch+json",
      Accept: "*/*",
    },
  };
  try {
    const response = await get(url, options).then((res) => res);
    return { status: response.status, data: response.data };
  } catch (err) {
    if (err.response) {
      return { status: err.response.status, data: [] };
    }
    return { status: 0, data: [] };
  }
};

export const postData = async (relativeUrl, user, data) => {
  const url = getUrl(relativeUrl);
  const config = {
    method: "post",
    url,
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    data,
  };
  try {
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const postFormData = async (relativeUrl, user, data) => {
  const url = getUrl(relativeUrl);
  const config = {
    method: "post",
    url,
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "multipart/form-data",
      Accept: "*/*",
    },
    data,
  };

  try {
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const postDataAnonymously = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  const config = {
    method: "post",
    url,
    headers: {
      //'Content-Type': 'application/json-patch+json',
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    data,
  };

  try {
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const resetPassword = async (relativeUrl, user, data) => {
  const url = getUrl(relativeUrl);
  const config = {
    method: "post",
    url,
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json-patch+json",
      Accept: "*/*",
    },
    data,
  };

  try {
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const postFile = async (relativeUrl, user, data) => {
  const url = getUrl(relativeUrl);
  const config = {
    method: "post",
    url,
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json-patch+json",
      Accept: "*/*",
    },
    data,
  };

  try {
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const putData = async (relativeUrl, user, data) => {
  const url = getUrl(relativeUrl);
  const config = {
    method: "put",
    url,
    headers: {
      // Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ ...data }),
  };

  try {
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const putFormData = async (relativeUrl, user, data) => {
  const url = getUrl(relativeUrl);

  const config = {
    method: "put",
    url,
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "multipart/form-data",
      Accept: "*/*",
    },
    data,
  };

  try {
    const response = await axios(config)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};

export const deleteData = async (relativeUrl) => {
  const url = getUrl(relativeUrl);
  const options = {
    headers: {
      // Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json-patch+json",
      Accept: "*/*",
    },
  };

  try {
    const response = await axios
      .delete(url, options)
      .then((res) => res)
      .catch((error) => error);
    return response;
  } catch (err) {
    return { status: null };
  }
};
