import axios from "axios";

import { backend_url } from "../config/constants";

const api = {
  // @Get user's list
  // @params
  getUsersList: () => axios.get(backend_url),
};

export default api;
