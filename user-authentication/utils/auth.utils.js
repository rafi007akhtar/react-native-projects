import { apiConstants } from "../constants/apis";
import { privateConstants } from "../constants/private";
import axios from "axios";

const apiURL = `${apiConstants.FIREBASE_SIGNUP_URL}${privateConstants.WEB_API_KEY}`;

async function authenticate(email, password, mode) {
  const apiURLWithMode = apiURL.replace(apiConstants.MODE_PLACEHOLDER, mode);
  let response, error;
  try {
    response = await axios.post(apiURLWithMode, {
      email,
      password,
      returnSecureToken: true,
    });
    console.log({ response });
  } catch (e) {
    error = e;
  }
  return [response, error];
}

export async function createUser(email, password) {
  return await authenticate(email, password, apiConstants.SIGNUP_MODE);
}

export async function loginUser(email, password) {
  return await authenticate(email, password, apiConstants.SINGIN_MODE);
}
