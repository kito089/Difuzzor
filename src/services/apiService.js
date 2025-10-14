import axios from "axios";
import { API_BASE_URL } from "@env";

export const loginAPI_JWT = async (microsoftToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { // login del api, retorna jwt y user
      accessToken: microsoftToken.accessToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error al conectarse con el backend: ", error.response?.data || error);
    throw error;
  }
};

// Se agregaran las funciones para interactuar con el backend aqui