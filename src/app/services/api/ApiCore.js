import { get, post, put } from 'axios';
import { settings as s } from '../Settings';

export const getUrl = (path) => s.baseUrl + path;

export const getUserInfo = () => {
  const user = JSON.parse(localStorage.getItem(s.userObj));
  if (user) {
    return user;
  }
  return null;
};

export const isLogin = () => {
  const user = getUserInfo();
  if (user && user.token && user.login_time) {
    const tokenCreationDate = new Date(user.login_time);
    const day = 86400000;
    const now = new Date();
    const diff = now - tokenCreationDate;
    if (diff < day) {
      return true;
    }
    return false;
  }
  return false;
};

// export const getAuthToken = () => {
//   const userObj = getUserInfo();
//   if (userObj && userObj.token && userObj.login_time) {
//     const tokenCreationDate = new Date(userObj.login_time);
//     const day = 86400000;
//     const now = new Date();
//     const diff = now - tokenCreationDate;
//     if (diff < day) {
//       return userObj.token;
//     }
//   }
//   // delete user object from storage and reload windows
//   localStorage.removeItem(s.userObj);
//   window.location.reload();
// };

export const getData = async (relativeUrl, params = null) => {
  const url = getUrl(relativeUrl, params);
  const response = await get(url);
  return response;
};

export const postData = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  const response = await post(url, data);
  return response;
};

export const putData = async (relativeUrl, data) => {
  const url = getUrl(relativeUrl);
  const response = await put(url, data);
  return response;
};

// export const postData = async (
//   relativeUrl,
//   data,
//   noToken = false,
//   withFormData = false,
//   multipart = false
// ) => {
//   const url = getUrl(relativeUrl);
//   const options = {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": multipart
//         ? "multipart/form-data"
//         : "application/json; charset=utf-8"
//     },
//     redirect: "follow",
//     referrer: "no-referrer",
//     body: withFormData ? data : JSON.stringify(data)
//   };
//   if (withFormData && !multipart) {
//     delete options.headers["Content-Type"];
//   }
//   if (!noToken) {
//     const token = getAuthToken();
//     options.headers.Authorization = `token ${token}`;
//   }
//   try {
//     const response = await fetch(url, options);
//     if (response.status === 401) {
//       localStorage.removeItem(s.userObj);
//       window.location.reload();
//     }
//     const jsonData = await response.json();
//     return jsonData;
//     // eslint-disable-next-line
//   } catch (err) {}
//   return null;
// };

// export const postDataWithStatusCode = async (
//   relativeUrl,
//   data,
//   noToken = false,
//   withFormData = false,
//   multipart = false
// ) => {
//   const url = getUrl(relativeUrl);
//   const options = {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": multipart
//         ? "multipart/form-data"
//         : "application/json; charset=utf-8"
//     },
//     redirect: "follow",
//     referrer: "no-referrer",
//     body: withFormData ? data : JSON.stringify(data)
//   };
//   if (withFormData && !multipart) {
//     delete options.headers["Content-Type"];
//   }
//   if (!noToken) {
//     const token = getAuthToken();
//     options.headers.Authorization = `token ${token}`;
//   }
//   let status = 200;
//   let ok = true;
//   let response = null;
//   try {
//     response = await fetch(url, options);
//     if (response.status === 401) {
//       localStorage.removeItem(s.userObj);
//       window.location.reload();
//     }
//     status = response.status;
//     ok = response.ok;
//     try {
//       const jsonData = await response.json();
//       return { status, ok, data: jsonData };
//     } catch (err) {
//       return { status, data: null };
//     }
//   } catch (err) {
//     return { status: null, data: null };
//   }
// };

// export const putDataWithStatusCode = async (
//   relativeUrl,
//   data,
//   noToken = false,
//   withFormData = false,
//   multipart = false
// ) => {
//   const url = getUrl(relativeUrl);
//   const options = {
//     method: "PUT",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": multipart
//         ? "multipart/form-data"
//         : "application/json; charset=utf-8"
//     },
//     redirect: "follow",
//     referrer: "no-referrer",
//     body: withFormData ? data : JSON.stringify(data)
//   };
//   if (withFormData && !multipart) {
//     delete options.headers["Content-Type"];
//   }
//   if (!noToken) {
//     const token = getAuthToken();
//     options.headers.Authorization = `token ${token}`;
//   }
//   let status = 200;
//   let ok = true;
//   let response = null;
//   try {
//     response = await fetch(url, options);
//     if (response.status === 401) {
//       localStorage.removeItem(s.userObj);
//       window.location.reload();
//     }
//     status = response.status;
//     ok = response.ok;
//     try {
//       const jsonData = await response.json();
//       return { status, ok, data: jsonData };
//     } catch (err) {
//       return { status, data: null };
//     }
//   } catch (err) {
//     return { status: null, data: null };
//   }
// };

// export const postFiles = async (relativeUrl, data) => {
//   const url = getUrl(relativeUrl);
//   const token = getAuthToken();
//   try {
//     const options = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `token ${token}`
//       },
//       redirect: "follow",
//       referrer: "no-referrer",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: "same-origin"
//     };
//     const result = await post(url, data, options);
//     return result;
//   } catch (error) {
//     return null;
//   }
// };

// export const getData = async (relativeUrl, noToken = false) => {
//   const url = getUrl(relativeUrl);
//   const options = {
//     method: "GET",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8"
//     }
//   };
//   if (!noToken) {
//     const token = getAuthToken();
//     options.headers.Authorization = `token ${token}`;
//   }
//   try {
//     const response = await fetch(url, options);
//     if (response.status === 401) {
//       localStorage.removeItem(s.userObj);
//       window.location.reload();
//     }
//     const jsonData = await response.json();
//     return jsonData;
//     // eslint-disable-next-line
//   } catch (err) {}
//   return null;
// };

// export const putData = async (relativeUrl, data) => {
//   const url = getUrl(relativeUrl);
//   const token = getAuthToken();
//   try {
//     const options = {
//       method: "PUT",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: "same-origin",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//         Authorization: "token " + token
//       },
//       redirect: "follow",
//       referrer: "no-referrer",
//       body: JSON.stringify(data)
//     };
//     const response = await fetch(url, options);
//     if (response.status === 401) {
//       localStorage.removeItem(s.userObj);
//       window.location.reload();
//     }
//     return await response.json();
//     // eslint-disable-next-line
//   } catch (err) {}
//   return null;
// };

// export const patchData = async (relativeUrl, data, noToken = false) => {
//   const url = getUrl(relativeUrl);
//   const options = {
//     method: "PATCH",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8"
//     },
//     redirect: "follow",
//     referrer: "no-referrer",
//     body: JSON.stringify(data)
//   };
//   if (!noToken) {
//     const token = getAuthToken();
//     options.headers.Authorization = `token ${token}`;
//   }
//   try {
//     const response = await fetch(url, options);
//     if (response.status === 401) {
//       localStorage.removeItem(s.userObj);
//       window.location.reload();
//     }
//     const jsonData = await response.json();
//     return jsonData;
//     // eslint-disable-next-line
//   } catch (err) {}
//   return null;
// };

// export const deleteData = async (relativeUrl, noToken = false) => {
//   const url = getUrl(relativeUrl);
//   const options = {
//     method: "DELETE",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8"
//     }
//   };
//   if (!noToken) {
//     const token = getAuthToken();
//     options.headers.Authorization = `token ${token}`;
//   }
//   let status = 200;
//   let ok = true;
//   let response = null;
//   try {
//     response = await fetch(url, options);
//     if (response.status === 401) {
//       localStorage.removeItem(s.userObj);
//       window.location.reload();
//     }
//     status = response.status;
//     ok = response.ok;
//     try {
//       if (status === 204) {
//         return { status, ok, data: null };
//       } else {
//         const jsonData = await response.json();
//         return { status, ok, data: jsonData };
//       }
//     } catch (err) {
//       return { status, data: null };
//     }
//   } catch (err) {
//     return { status: null, data: null };
//   }
// };
