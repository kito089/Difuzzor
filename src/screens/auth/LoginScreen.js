import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert
} from 'react-native';
import { authService } from '../../services/authService';
import { useSession } from "../../utils/SessionContext";

const LoginScreen = () => {
  const { userinfo, setUserInfo, loading, setLoading } = useSession();

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log('Iniciando proceso de login...');
      const result = await authService.signIn(); // inicio uwu
      console.log('Resultado del login:', result);
      console.log("Success:", result.success);
      if (result.success) { // fin
        console.log("Almacenando userInfo en contexto");
        setUserInfo(result.userInfo);
      }else {
        console.error("Error durante el login:", result.error);
      }
    } catch (error) {
      console.error('Error en handleLogin:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Difuzzor</Text>
          <Text style={styles.subtitle}>Inicia sesión con Microsoft</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.microsoftButton]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.microsoftLogo}>Ⓜ️</Text>
              <Text style={styles.buttonText}>Iniciar con Microsoft</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Tu sesión se mantendrá activa automáticamente
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    maxWidth: 300,
  },
  microsoftButton: {
    backgroundColor: '#2F2F2F',
  },
  logoutButton: {
    backgroundColor: '#d13438',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  microsoftLogo: {
    fontSize: 18,
  },
  errorContainer: {
    backgroundColor: '#ffe6e6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    maxWidth: 300,
  },
  errorText: {
    color: '#d13438',
    textAlign: 'center',
    fontSize: 14,
  },
  infoContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e8f4fd',
    borderRadius: 8,
    width: '100%',
    maxWidth: 300,
  },
  infoText: {
    color: '#004578',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
  debugText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 5,
    fontFamily: 'monospace',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 30,
  },
  userInfoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  userJob: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  userId: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});

export default LoginScreen;