import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/ProfileScreenStyles';
import ProfileCustomScreen from './ProfileCustomScreen';
import PostCard from '../components/PostCard';
import CommentCard from '../components/CommentCard';
import ComplaintCard from '../components/ComplaintCard';
import { apiService } from '../services/apiService';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Publicaciones');
  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState('Magdalena');
  const [apellido, setApellido] = useState('Morquecho Reyes');
  const [matricula, setMatricula] = useState('246534');
  const [descripcion, setDescripcion] = useState('Hola amigos, hablen más soy buena onda siempre estoy activaaa');
  
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
    console.log('Reaccionó al post:', postId);
  };

  const handleComment = (postId) => {
    console.log('Comentó el post:', postId);
  };

  const handleShare = (postId) => {
    console.log('Compartió el post:', postId);
  };

  const handleDelete = async (postId) => {
    try {
      await apiService.deletePost(postId, 'posts');
      setUserPosts(userPosts.filter(post => post.id !== postId));
    } catch (e) {
      console.error('Error eliminando post:', e);
    }
  };

  // Fetch de datos
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
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

      {/* Información del perfil */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/icons/defaultavatar.png')}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.userName}>{nombre} {apellido}</Text>
        <Text style={styles.userMatricula}>Matrícula: {matricula}</Text>
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
          ListEmptyComponent={renderEmptyState('No hay publicaciones aún')}
          showsVerticalScrollIndicator={false}
        />
      ) : activeTab === 'Comentarios' ? (
        <FlatList
          data={userComments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState('No hay comentarios aún')}
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
