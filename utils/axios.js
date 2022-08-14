import axios from 'axios';
import getConfig from 'next/config';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.defaults.headers.common['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
instance.defaults.headers.post['Content-Type'] = 'application/json';