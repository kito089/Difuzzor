import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  
  // Título
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  title: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
  },
  menuIcon: {
    width: 26,
    height: 32,
  },

  // Búsqueda
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#00000080",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 12,
    marginHorizontal: 14,
    marginVertical: 0.02,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#000000",
  },

  // Filtros
  filtersContainer: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  filterButton: {
    backgroundColor: "#D7D7D7B0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#092468",
  },
  filterText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },

  // Lista
  listContainer: {
    paddingVertical: 10,
  },
});

export default styles;