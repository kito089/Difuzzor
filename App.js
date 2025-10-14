import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import IndexNavigation from "./src/navigation/indexNavigation";
import { authService } from "./src/services/authService";
import { SessionProvider, useSession } from "./src/utils/SessionContext"; // Contexto de autenticación

function AppContent() {
  const { setUserInfo, setLoading, setCheckingAuth, checkingAuth } = useSession();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      setCheckingAuth(true);
      console.log("Verificando autenticación...");

      const isAuthenticated = await authService.isAuthenticated();

      if (isAuthenticated) {
        console.log("Usuario autenticado, obteniendo perfil...");
        const profile = await authService.getCurrentUser();
        setUserInfo(profile);
        console.log("Perfil obtenido:", profile);
      } else {
        console.log("Usuario no autenticado");
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      setUserInfo(null);
    } finally {
      setLoading(false);
      setCheckingAuth(false);
    }
  };

  if (checkingAuth) {
    console.log("Cargando estado de login...");
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0078d4" />
          <Text style={styles.loadingText}>Verificando sesión...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return <IndexNavigation />;
}

export default function App() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
