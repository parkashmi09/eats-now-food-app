import axios from "axios";
export const baseUrl =
  "http://127.0.0.1:5001/food-ordering-app-f2075/us-central1/app/api";

export const validateJwtToken = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/users/jwtVerification`, {
      headers: { Authorization: "Bearer " +token },
    });
    return response?.data;
  } catch {
    return null;
  }
};
