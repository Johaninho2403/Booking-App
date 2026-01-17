import axios from "./axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const postDetailsLoader = async ({ params }) => {
  const { id } = params;
  const { data } = await axios.get(`${backendUrl}/api/post/single-post/${id}`);
  return data;
};

export const propertiesLoader = async ({ request }) => {
  const url = request.url;
  const query = url.split("?")[1];
  const promise = axios.get(`${backendUrl}/api/post/get-posts?${query}`);
  return { promise };
};

export const profileLoader = async () => {
  const profilePromise =  axios.get(`${backendUrl}/api/user/profile`);
  const chatsPromise = axios.get(`${backendUrl}/api/chat`)
  return {
    profilePromise,
    chatsPromise
  }
};
