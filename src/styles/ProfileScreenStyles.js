import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  // Banner
  banner: {
    height: 120,
    backgroundColor: "#092468",
  },

  // Sección de perfil
  profileSection: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  avatarContainer: {
    marginTop: -50,
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },
  userMatricula: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  userBio: {
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    paddingHorizontal: 30,
    marginBottom: 16,
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 60,
    marginBottom: 12,
  },
  editButtonText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  postsCount: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "600",
  },

  // Tabs
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#092468",
  },
  tabText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#092468",
    fontWeight: "bold",
  },

  // Lista
  listContainer: {
    paddingVertical: 10,
  },

  // Tarjeta de publicación
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
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
  postContent: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 4,
  },
  postTime: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#E0E0E0",
  },

  // Acciones
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 8,
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
    fontSize: 11,
    color: "#16232C",
    fontWeight: "500",
  },

  // Stats
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statsText: {
    fontSize: 12,
    color: "#999999",
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#999999",
  },
});

export default styles;