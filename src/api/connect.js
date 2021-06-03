import { API_URL } from './api_keys';

export const getUserTweets = async (username) => await fetch(`${API_URL}/${username}`);