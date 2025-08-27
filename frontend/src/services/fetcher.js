import API from "./api";

// fetcher untuk SWR
export const fetcher = (url) => API.get(url).then((res) => res.data);
