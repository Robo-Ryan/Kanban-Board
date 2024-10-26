import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  // return the response
try{
  const response = await fetch('/auth/login',{ //the result of the fetch call is stored in the response variable
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
    // Throw error if response status is not OK (200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response as JSON
      throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message   
    }
  
  
  // parse the response as JSON
const data = await response.json();
return data; // return the data from the server
  } catch (error) {
    console.error(error);
  }
}
export { login };
