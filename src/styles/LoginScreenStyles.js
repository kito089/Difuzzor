import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#16232C",
    paddingTop: 90,
    paddingBottom: 28,
    paddingHorizontal: 138,
    marginBottom: 166,
  },
  logo: {
    borderRadius: 10,
    width: 154,
    height: 157,
    marginBottom: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  formContainer: {
    marginBottom: 103,
    marginHorizontal: 31,
  },
  label: {
    color: "#000000",
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    height: 48,
    backgroundColor: "#D9D9D917",
    borderColor: "#B5B6BF",
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#000000",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 97,
  },
  publishButton: {
    backgroundColor: "#0E86DB",
    borderColor: "#0E86DB",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 76,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;