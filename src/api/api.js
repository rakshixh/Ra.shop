import { toast } from "react-toastify";

const API_BASE_URL = "https://fakeauthentication-api.onrender.com";
const API_END_POINT = "/api/staticUsers/login";

export const LoginApi = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_END_POINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      toast.error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error(error.message);
  }
};
