import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/ProfileScreenStyles";
import ProfileCustomScreen from "./ProfileCustomScreen";

// Datos de ejemplo para las publicaciones del usuario
const USER_POSTS = [
  {
    id: '1',
    content: 'Hermoso paisaje!',
    time: 'Hace 2 horas',
    image: require('../../assets/paisaje.jpg'),
    reactions: 15,
    comments: 3,
  },
  {
    id: '2',
    content: 'Amigos busco alguien que me venda unos chetos, porfis!!',
    time: 'Hace 1 semana',
    image: null,
    reactions: 8,
    comments: 12,
  },
];

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Publicaciones');
  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState("Magdalena");
  const [apellido, setApellido] = useState("Morquecho Reyes");
  const [descripcion, setDescripcion] = useState("Hola amigos, hablen más soy buena onda siempre estoy activaaa");

  const tabs = ['Publicaciones', 'Comentarios', 'Quejas'];

  const handleSaveProfile = (data) => {
    setNombre(data.nombre);
    setApellido(data.apellido);
    setDescripcion(data.descripcion);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Si está en modo edición, mostrar ProfileCustomScreen
  if (isEditing) {
    return (
      <ProfileCustomScreen
        nombre={nombre}
        apellido={apellido}
        descripcion={descripcion}
        onSave={handleSaveProfile}
        onCancel={handleCancelEdit}
      />
    );
  }

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postTime}>{item.time}</Text>

      {item.image && (
        <Image source={item.image} style={styles.postImage} />
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../assets/reaction.png')}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Reaccionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../assets/comment.png')}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Comentar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../assets/share.png')}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Compartir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../assets/report.png')}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Descartar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>{item.reactions} reacciones</Text>
        <Text style={styles.statsText}>{item.comments} comentarios</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Banner azul */}
      <View style={styles.banner} />

      {/* Información del perfil */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/icons/defaultavatar.png')}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.userName}>{nombre} {apellido}</Text>
        <Text style={styles.userMatricula}>Matrícula: 246534</Text>
        <Text style={styles.userBio}>
          {descripcion}
        </Text>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>Editar Perfil ✏️</Text>
        </TouchableOpacity>

        <Text style={styles.postsCount}>2 Publicaciones</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.tabActive,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab === 'Publicaciones' && '📝 '}
              {tab === 'Comentarios' && '💬 '}
              {tab === 'Quejas' && '⚠️ '}
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderEmptyContent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {activeTab === 'Comentarios' 
          ? 'No hay comentarios aún' 
          : 'No hay quejas registradas'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {activeTab === 'Publicaciones' ? (
        <FlatList
          data={USER_POSTS}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={[]}
          renderItem={() => null}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;