import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },

  // Título
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginVertical: 20,
  },

  // Avatar
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  // Info usuario
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  userMatricula: {
    fontSize: 14,
    color: "#666666",
  },

  // Sección
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 14,
    marginBottom: 8,
  },
  separator: {
    height: 3,
    backgroundColor: "#FFCB52",
    marginBottom: 30,
    marginHorizontal: 14,
  },

  // Labels e inputs
  label: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginHorizontal: 14,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    fontSize: 14,
    color: "#000000",
  },
  textAreaContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginHorizontal: 14,
    marginBottom: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 80,
  },
  textArea: {
    fontSize: 14,
    color: "#000000",
    textAlignVertical: "top",
  },

  // Botones
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 40,
    paddingHorizontal: 14,
  },
  saveButton: {
    backgroundColor: "#0E86DB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
  },
  cancelButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },

  // Separador grande
  largeSeparator: {
    height: 8,
    backgroundColor: "#F0F0F0",
    marginBottom: 30,
  },

  // Sección roles
  roleSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  roleSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  roleQuestion: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 14,
    marginBottom: 16,
  },
  rolesSeparator: {
    height: 2,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 14,
    marginBottom: 20,
  },

  // Tarjetas de roles
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginHorizontal: 14,
    marginBottom: 12,
    padding: 16,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#0E86DB",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0E86DB",
  },
  roleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 13,
    color: "#666666",
  },

  // Motivo
  motivoLabel: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 14,
    marginTop: 20,
    marginBottom: 8,
    fontWeight: "500",
  },
  motivoContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginHorizontal: 14,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 100,
  },
  motivoInput: {
    fontSize: 14,
    color: "#000000",
    textAlignVertical: "top",
  },

  // Botón enviar
  sendButton: {
    backgroundColor: "#0E86DB",
    borderRadius: 8,
    paddingVertical: 14,
    marginHorizontal: 14,
    marginBottom: 20,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;