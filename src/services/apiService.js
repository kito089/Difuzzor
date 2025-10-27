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

  async apiCrud(uri, tabla, id = null, datos = null) {
      let url = API_BASE_URL + '/crud' + uri + '/' + tabla;
      if (id) {
          url += `/${id}`;
      }
      if (datos) {
          // Convertir el objeto datos a una string JSON y luego codificarla
          const datosStr = JSON.stringify(datos);
          url += `?datos=${encodeURIComponent(datosStr)}`;
      }
      try {
          console.log(`Accediendo a ${url}`);
          const response = await axios.get(url);
          return response.data;
      } catch (error) {
          console.error(`Error en el método ${url}: `, error.response?.data || error);
          throw error;
      }
  }
};

// Se agregaran las funciones para interactuar con el backend aqui