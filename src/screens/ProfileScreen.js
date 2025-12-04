import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommentCard from '../components/CommentCard';
import ComplaintCard from '../components/ComplaintCard';
import PostCard from '../components/PostCard';
import { apiService } from '../services/apiService';
import { authService } from '../services/authService';
import styles from '../styles/ProfileScreenStyles';
import ProfileCustomScreen from './ProfileCustomScreen';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Publicaciones');
  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [matricula, setMatricula] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userComplaints, setUserComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Manejadores de acciones del post
  const handleReact = (postId) => {
    console.log('Reaccion� al post:', postId);
  };

  const handleComment = (postId) => {
    console.log('Coment� el post:', postId);
  };

  const handleShare = (postId) => {
    console.log('Comparti� el post:', postId);
  };

  const handleDelete = async (postId) => {
    try {
      await apiService.deletePost(postId, 'posts');
      setUserPosts(userPosts.filter(post => post.id !== postId));
    } catch (e) {
      console.error('Error eliminando post:', e);
    }
  };

  // Fetch de datos del usuario y posts
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Obtener información del usuario autenticado
      const currentUser = await authService.getCurrentUser();
      
      if (currentUser) {
        setNombre(currentUser.nombre || '');
        setApellido(currentUser.apellido || '');
        setMatricula(currentUser.matricula || '');
        setDescripcion(currentUser.descripcion || '');
      } else {
        setError('No se pudo obtener la información del usuario');
      }

      // Obtener posts, comentarios y quejas del usuario
      const [postsData, commentsData, complaintsData] = await Promise.all([
        apiService.getPosts('posts').catch(() => []),
        apiService.getPosts('comentarios').catch(() => []),
        apiService.getPosts('quejas').catch(() => []),
      ]);

      setUserPosts(Array.isArray(postsData) ? postsData : []);
      setUserComments(Array.isArray(commentsData) ? commentsData : []);
      setUserComplaints(Array.isArray(complaintsData) ? complaintsData : []);
    } catch (e) {
      console.error('Error al obtener datos:', e);
      setError('No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
    <PostCard
      post={item}
      onReact={handleReact}
      onComment={handleComment}
      onShare={handleShare}
      onDelete={handleDelete}
    />
  );

  const renderComment = ({ item }) => <CommentCard comment={item} />;
  const renderComplaint = ({ item }) => <ComplaintCard complaint={item} />;

  const renderHeader = () => (
    <>
      {/* Banner azul */}
      <View style={styles.banner} />

      {/* Informaci�n del perfil */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/icons/defaultavatar.png')}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.userName}>{nombre} {apellido}</Text>
        <Text style={styles.userMatricula}>Matr�cula: {matricula}</Text>
        <Text style={styles.userBio}>{descripcion}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>Editar Perfil </Text>
        </TouchableOpacity>

        <Text style={styles.postsCount}>{userPosts.length} Publicaciones</Text>
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
              {tab === 'Publicaciones' && ' '}
              {tab === 'Comentarios' && ' '}
              {tab === 'Quejas' && ' '}
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderEmptyState = (message) => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#092468" />
        </View>
      ) : activeTab === 'Publicaciones' ? (
        <FlatList
          data={userPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState('No hay publicaciones a�n')}
          showsVerticalScrollIndicator={false}
        />
      ) : activeTab === 'Comentarios' ? (
        <FlatList
          data={userComments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState('No hay comentarios a�n')}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={userComplaints}
          renderItem={renderComplaint}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState('No hay quejas registradas')}
          showsVerticalScrollIndicator={false}
        />
      )}
      {error && (
        <View style={{position:'absolute', bottom:20, left:20, right:20}}>
          <Text style={{color:'red', textAlign:'center'}}>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
