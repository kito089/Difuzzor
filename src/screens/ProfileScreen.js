import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import postcard from "../styles/PostCard";
import styles from "../styles/ProfileScreenStyles";

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

  const tabs = ['Publicaciones', 'Comentarios', 'Quejas'];

  const renderPost = ({ item }) => (
    <View style={postcard.postCard}>
      <Text style={postcard.postContent}>{item.content}</Text>
      <Text style={postcard.postTime}>{item.time}</Text>

      {item.image && (
        <Image source={item.image} style={postcard.postImage} />
      )}

      <View style={postcard.actionsContainer}>
        <TouchableOpacity style={postcard.actionButton}>
          <Image
            source={require('../../assets/reaction.png')}
            style={postcard.actionIcon}
          />
          <Text style={postcard.actionText}>Reaccionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={postcard.actionButton}>
          <Image
            source={require('../../assets/comment.png')}
            style={postcard.actionIcon}
          />
          <Text style={postcard.actionText}>Comentar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={postcard.actionButton}>
          <Image
            source={require('../../assets/share.png')}
            style={postcard.actionIcon}
          />
          <Text style={postcard.actionText}>Compartir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={postcard.actionButton}>
          <Image
            source={require('../../assets/report.png')}
            style={postcard.actionIcon}
          />
          <Text style={postcard.actionText}>Descartar</Text>
        </TouchableOpacity>
      </View>

      <View style={postcard.statsContainer}>
        <Text style={postcard.statsText}>{item.reactions} reacciones</Text>
        <Text style={postcard.statsText}>{item.comments} comentarios</Text>
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

        <Text style={styles.userName}>Magdalena Morquecho Reyes</Text>
        <Text style={styles.userMatricula}>Matrícula: 246534</Text>
        <Text style={styles.userBio}>
          Hola amigos, hablen más soy buena onda siempre estoy facherita
        </Text>

        <TouchableOpacity style={styles.editButton}>
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