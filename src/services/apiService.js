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

  async apiCrud(uri, tabla, id = null, datos = null){
    let url = API_BASE_URL + '/' + 'crud' + uri + '/' + tabla;
    if (id){
      url += `/${id}`;
    }
    if (datos){
      const param = datos.map(valor => 
        `${encodeURIComponent(clave)}=${encodeURIComponent(valor)}`
      ).join('&');
      url += `?${param}`;
    }
    try{
      console.log(`Accediendo a ${url}`);
      const response = await axios.post(url, { // llamar al endpoint del api
        body : null,
      }); 
      return response.data;
    } catch (error) {
      console.error(`Error en el metodo ${url}: `, error.response?.data || error);
      throw error;
    }
  }
};

// Se agregaran las funciones para interactuar con el backend aqui