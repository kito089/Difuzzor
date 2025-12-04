import { AZURE_CLIENT_ID, AZURE_TENANT_ID } from "@env"; // Variables de entorno para conectar con Microsoft
import * as AuthSession from 'expo-auth-session'; // Libreria para autenticacion con expo
import * as WebBrowser from 'expo-web-browser'; // web view de expo
import { clearTokens, getStoredTokens, storeTokens } from "../utils/storage"; // para verificar si hay token guardado
import { apiService } from "./apiService";

WebBrowser.maybeCompleteAuthSession(); // web view de expo

// creacion de redirect URI
const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({ 
  scheme: 'difuzzor',
  path: 'auth',
  useProxy,
});

// configuracion de auth
const config = {
  clientId: AZURE_CLIENT_ID,
  tenantId: AZURE_TENANT_ID,
  redirectUri: redirectUri,
  scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
};

// endopoints de auth
const discovery = {
  authorizationEndpoint: `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`,
};

export const authService = {
  config,
  discovery,

async signIn() {
    try {
      console.log('Iniciando login...');

      // Crear request de auth sin PKCE
      const request = new AuthSession.AuthRequest({
        clientId: config.clientId,
        scopes: config.scopes,
        redirectUri: config.redirectUri,
        usePKCE: false,
      });
      console.log('redirectUri:', config.redirectUri);
      // Generar URL de autorización
      const authUrl = await request.makeAuthUrlAsync(discovery);
      console.log('Auth URL generada');

      // Ejecutar el flujo de auth
      const result = await request.promptAsync(discovery, { useProxy });

      console.log('Resultado auth:', result.type);

      if (result.type === 'success') {
        console.log('Código de autorización recibido');

        // Intercambiar código por token
        const tokenResult = await apiService.apiAuth(
          'CodeForToken',
          result.params.code
        );
    
        if (tokenResult.success && tokenResult.access_token) {
          // Almacenar tokens
          await storeTokens(tokenResult);
          
          return {
            success: true,
            tokens: tokenResult,
          };
        } else {
          return { 
            success: false, 
            error: tokenResult.error || 'Error obteniendo token' 
          };
        }
      } else if (result.type === 'cancel') {
        return { success: false, error: 'Usuario canceló el login' };
      } else {
        return { success: false, error: `Error: ${result.type}` };
      }
    } catch (error) {
      console.error('Error en signIn:', error);
      return { success: false, error: error.message };
    }
  },

  // ===== MÉTODOS EXISTENTES =====
  async isAuthenticated() {
    console.log(" 1. Iniciando verificación de autenticación");
    try {
      const tokens = await getStoredTokens();
      console.log(" 2. Tokens almacenados:", tokens);
      
      if (!tokens) {
        console.log(" 2.5. No hay tokens almacenados, Usuario no autenticado");
        return null;
      }
          // Verificar si el token está cerca de expirar (5 minutos)
      console.log(" 3. verificando expiracion de token")
      const isExpired = tokens.expires_at && (tokens.expires_at - Date.now() < 5 * 60 * 1000);
      
      if (isExpired) {
        console.log(' 3.5 Token expirado, intentando renovar...');
        await apiService.apiAuth("RefreshToken", tokens.refresh_token);
      }

      // Validar token con Microsoft Graph
      console.log(" 4. validando token con backend")
      const isValid = await apiService.apiAuth("validateToken", tokens.access_token);
      if (!isValid) {
        console.log("Token inválido, Usuario no autenticado");
        return null;
      }

      return true; 

    } catch (error) {
      console.error('Error verificando autenticación:', error);
      console.log("Usuario no autenticado");
      return null; 
    }
  },

  async signOut() {
    try {
      await clearTokens();
      
      const logoutUrl = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${config.redirectUri}`;
      await WebBrowser.openAuthSessionAsync(logoutUrl, config.redirectUri);
      
      // INVESTIGAR FORMA DE CERRAR EL BROWSER, DESPUES DEL CIERRE DE SESION
      //WebBrowser.dismissBrowser();

      return { success: true };
    } catch (error) {
      console.error('Error en signOut:', error);
      return { success: false, error: error.message };
    }
  },

  async getCurrentUser() {
    try {
      const tokens = await getStoredTokens();
      if (tokens && tokens.access_token) {
        const res = await apiService.apiAuth("getUserInfo", tokens.access_token);
        console.log('Información del usuario actual:', res.user);
        return res.user;
      }
      // Manejar caso de no tokens
      console.log('No hay tokens almacenados');
      return null;      
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  },

};