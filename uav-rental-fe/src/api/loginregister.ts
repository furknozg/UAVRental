import axios, { AxiosError } from "axios";


export const api_host = 'localhost:8000';

export interface LoginResponse {
  token: string;
}

// The form data generic is piped into these two types depending on the operation
interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface LoginFormData {
  username: string;
  password: string;
}


export async function loginUser(formdata: LoginFormData): Promise<LoginResponse> {
  try {
    const response = await axios.post('http://' + api_host + '/api/login/', formdata);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


export async function registerUser(formData: RegisterFormData): Promise<void> {
  try {
    await axios.post('http://' + api_host + '/api/register/', formData);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new Error(axiosError.toString());
    } else {
      throw new Error('An error occurred');
    }
  }
}

