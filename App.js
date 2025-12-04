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
  const {checkingAuth, setUserAuth, setCheckingAuth } = useSession();
  console.log("Entre al app content")
  useEffect(() => {
    const verifyUser = async () => {
      try{
        setCheckingAuth(true);
        console.log("Entre a useEffect");
        const verify = await authService.isAuthenticated(); // verificar si el usuario existe
        console.log("Usuario verificado:", verify);
        setUserAuth(verify);
      } catch (error) {
        console.error("Error verificando usuario:", error);
        setUserAuth(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    verifyUser();
  }, []);

  if (checkingAuth) {
    console.log("Cargando estado de login...");
    return (
      // CREAR COMPONENTE
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
