import { AZURE_CLIENT_ID, AZURE_TENANT_ID } from "@env"; // Variables de entorno para conectar con Microsoft
import * as AuthSession from 'expo-auth-session'; // Libreria para autenticacion con expo
import * as WebBrowser from 'expo-web-browser'; // web view de expo
import { getStoredTokens, storeTokens, clearTokens  } from "../utils/storage"; // para verificar si hay token guardado
import { storeUserProfile, getStoredUserProfile } from "../utils/storage"; // para guardar y obtener perfil de usuario

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({ 
  scheme: 'difuzzor',
  path: 'auth',
  useProxy,
});

const config = {
  clientId: AZURE_CLIENT_ID,
  tenantId: AZURE_TENANT_ID,
  redirectUri: redirectUri,
  scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
};

const discovery = {
  authorizationEndpoint: `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`,
};

export const authService = {
  config,
  discovery,

  // ===== LOGIN =====
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

      // Generar URL de autorización
      const authUrl = await request.makeAuthUrlAsync(discovery);
      console.log('Auth URL generada');

      // Ejecutar el flujo de auth
      const result = await request.promptAsync(discovery, { useProxy });

      console.log('Resultado auth:', result.type);

      if (result.type === 'success') {
        console.log('Código de autorización recibido');

        // Intercambiar código por token
        const tokenResult = await this.exchangeCodeForToken(
          result.params.code
        );
    
        if (tokenResult.success && tokenResult.access_token) {
          // Almacenar tokens
          await storeTokens(tokenResult);
          
          // Obtener y almacenar información del usuario
          const userInfo = await this.getUserInfo(tokenResult.access_token);
          await storeUserProfile(userInfo);
          
          return {
            success: true,
            tokens: tokenResult,
            userInfo: userInfo,
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

  // ===== INTERCAMBIO DE CÓDIGO POR TOKEN CORREGIDO =====
  async exchangeCodeForToken(authorizationCode) {
    try {
      console.log('Intercambiando código por token...');
      
      const tokenUrl = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;
      
      const requestBody = new URLSearchParams({
        client_id: config.clientId,
        code: authorizationCode,
        redirect_uri: config.redirectUri,
        grant_type: 'authorization_code',
         scope: config.scopes.join(' '),
      });

      console.log('Request body:', requestBody.toString());

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody.toString(),
      });

      const responseText = await response.text();
      console.log('Respuesta del servidor:', responseText);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseText}`);
      }

      const tokenData = JSON.parse(responseText);
      console.log('Token recibido exitosamente');
      
      return {
        success: true,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        id_token: tokenData.id_token,
        expires_in: tokenData.expires_in,
      };
    } catch (error) {
      console.error('Error intercambiando código:', error);
      return { success: false, error: error.message };
    }
  },

  // ===== MÉTODOS EXISTENTES =====
  async isAuthenticated() {
    try {
      const tokens = await getStoredTokens();
      
      if (!tokens || !tokens.accessToken) {
        return false;
      }

      // Verificar si el token está cerca de expirar (5 minutos)
      const isExpired = tokens.expiresAt && (tokens.expiresAt - Date.now() < 5 * 60 * 1000);
      
      if (isExpired) {
        console.log('Token expirado, intentando renovar...');
        const refreshed = await this.refreshTokens();
        return refreshed;
      }

      const isValid = await this.validateToken(tokens.accessToken);
      return isValid;
      
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
    }
  },

  async validateToken(accessToken) {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async refreshTokens() {
    try {
      const tokens = await getStoredTokens();
      
      if (!tokens || !tokens.refreshToken) {
        console.log('No hay refresh token disponible');
        return false;
      }

      console.log('Renovando tokens con refresh token...');

      const tokenUrl = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;
      
      const requestBody = new URLSearchParams({
        client_id: config.clientId,
        refresh_token: tokens.refreshToken,
        grant_type: 'refresh_token',
        scope: config.scopes.join(' '),
      });

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody.toString(),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status} al renovar token`);
      }

      const tokenData = await response.json();
      await storeTokens(tokenData);
      
      console.log('Tokens renovados exitosamente');
      return true;
      
    } catch (error) {
      console.error('Error renovando tokens:', error);
      await clearTokens();
      return false;
    }
  },

  async signOut() {
    try {
      await clearTokens();
      
      const logoutUrl = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${config.redirectUri}`;
      await WebBrowser.openAuthSessionAsync(logoutUrl, config.redirectUri);
      
      //WebBrowser.dismissBrowser();

      return { success: true };
    } catch (error) {
      console.error('Error en signOut:', error);
      return { success: false, error: error.message };
    }
  },

  async getCurrentUser() {
    try {
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        return null;
      }

      let userInfo = await getStoredUserProfile();
      
      if (!userInfo) {
        const tokens = await getStoredTokens();
        if (tokens && tokens.accessToken) {
          userInfo = await this.getUserInfo(tokens.accessToken);
          await storeUserProfile(userInfo);
        }
      }
      
      return userInfo;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  },

  async getUserInfo(accessToken) {
    try {
      const response = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getUserInfo:', error);
      return null;
    }
  },
};