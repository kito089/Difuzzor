import axios from "axios";
import { API_BASE_URL } from "@env";

export const apiService = {

  async apiAuth(uri, param){
    const url = API_BASE_URL + '/auth/' + uri;
    try{
      console.log(`Accediendo a ${url} con param:`, param);
      const response = await axios.post(url, { // llamar al endpoint del api
        body : param,
      }); 
      return response.data;
    } catch (error) {
      console.error(`Error en el metodo ${url}: `, error.response?.data || error);
      throw error;
    }
  },

  async apiCrud(uri, tabla, _id = null, _datos = null) {
      const url = API_BASE_URL + '/crud' + uri + '/' + tabla;
      const body = { // construir el cuerpo segun los parametros
        ...(_id && { id: _id }),
        ...(_datos && { datos: _datos })
      };
      try {
          console.log(`Accediendo a ${url}`);
          const response = await axios.post(url, body); // llamar al endpoint del api
          return response.data;
      } catch (error) {
          console.error(`Error en el método ${url}: `, error.response?.data || error);
          throw error;
      }
  }
};

// Se agregaran las funciones para interactuar con el backend aqui