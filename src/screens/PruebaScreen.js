import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MainLayout from "../layouts/MainLayout";
import { useSession } from "../utils/SessionContext";

const PruebaScreen = () => {
  const { userinfo } = useSession();
  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido {userinfo.displayName || "usuario"} 🎉</Text>
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, marginBottom: 20 },
});


export default PruebaScreen;