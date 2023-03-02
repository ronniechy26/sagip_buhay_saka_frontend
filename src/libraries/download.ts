import axios from "axios";
import { notification } from "antd";
import * as dotenv from 'dotenv';

const config = { timeout: 0 };
dotenv.config();

const Download = ({ params = {} }, filename, setDownloading) => {
  const base_url = process.env.REACT_APP_API_ENDPOINT;
  setDownloading(true);
  axios
    .get(`${base_url}/api/file`, {
      ...config,
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
    })
    .then((res) => new Blob([res.data]))
    .then((blob) => {
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = filename;
      link.click();
    })
    .catch((error) => {
      notification.error({
        message: "Download failed!",
        description: error.message,
      });
    })
    .finally(() => setDownloading(false));
};

export default Download;
