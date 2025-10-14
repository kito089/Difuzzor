// Codigo para manejar el almacenamiento en la app
// Nota: Aqui se implementara la logica de almacenamiento para chats, perfil, etc.

import AsyncStorage from "@react-native-async-storage/async-storage";

// Claves para AsyncStorage
const STORAGE_KEYS = {
  ACCES_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ID_TOKEN: 'id_token',
  EXPIRES_AT: 'expires_at',
  USER_INFO: 'user_profile',
};

// Crear metodo para guardar el perfil de la persona

export const storeTokens = async (tokenData) => { // guardar token para mantener sesion
  try{
    const expiresAt = Date.now() + (tokenData.expires_in * 1000); // calcular tiempo de expiracion

    await AsyncStorage.multiSet([
      [STORAGE_KEYS.ACCES_TOKEN, tokenData.access_token],
      [STORAGE_KEYS.REFRESH_TOKEN, tokenData.refresh_token || ''],
      [STORAGE_KEYS.ID_TOKEN, tokenData.id_token || ''],
      [STORAGE_KEYS.EXPIRES_AT, expiresAt.toString()],
    ]);
    console.log("Tokens guardados correctamente");
  } catch (error) {
    console.error("Error guardando tokens:", error);
  }
};

export const getStoredTokens = async () => { // obtener token para usar en peticiones
  try {
    const values = await AsyncStorage.multiGet([
      STORAGE_KEYS.ACCES_TOKEN, 
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.ID_TOKEN, 
      STORAGE_KEYS.EXPIRES_AT
    ]);

    const tokens = Object.fromEntries(values); // convertir de lista a diccionario

    return {
      ...tokens,
      expires_at: tokens.expires_at ? parseInt(tokens.expires_at) : null,
    }
  } catch (error) {
    console.error("Error obteniendo tokens:", error);
    return null;
  }
};

export const clearTokens = async () => { // eliminar token al cerrar sesion
  try{
    await AsyncStorage.multiRemove([STORAGE_KEYS.ACCES_TOKEN, STORAGE_KEYS.REFRESH_TOKEN, 
                                                STORAGE_KEYS.ID_TOKEN, STORAGE_KEYS.EXPIRES_AT]);
    console.log("Tokens eliminados correctamente");
  } catch (error) {
    console.error("Error eliminando tokens:", error);
  }
};

export const storeUserProfile = async (profile) => { // guardar perfil de usuario
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(profile));
    console.log("Perfil guardado correctamente");
  } catch (error) {
    console.error("Error guardando perfil:", error);
  }
};

export const getStoredUserProfile = async () => { // obtener perfil de usuario
  try {
    const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_INFO);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    return null;
  }
};