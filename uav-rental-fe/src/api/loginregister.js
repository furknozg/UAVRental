export const loginUser = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: username,
        password: password
      });
      return response.data.token;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
  

export const registerUser = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username: username,
        password: password
      });
      return response.data.token;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
  
