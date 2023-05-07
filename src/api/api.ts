import axios from "axios";

export function checkAuthStatus() {
  return fetch(import.meta.env.VITE_BACKEND_URL + "auth/status", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});
// api.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const isAuthenticated = await checkAuthStatus();
//       if (isAuthenticated) {
//         return api(originalRequest);
//       } else {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { api };
