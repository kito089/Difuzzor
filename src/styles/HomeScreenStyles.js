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
    marginVertical: .02,
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

  // Tarjeta de publicación
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: 14,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Header del post
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  postTime: {
    color: "#8C7462",
    fontSize: 11,
  },
  categoryBadge: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  categoryText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Contenido
  postContent: {
    color: "#000000",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#D9D9D9",
  },

  // Stats
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statsText: {
    color: "#B5B6BF",
    fontSize: 12,
  },

  // Divisor
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },

  // Acciones
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  actionText: {
    color: "#16232C",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default styles;