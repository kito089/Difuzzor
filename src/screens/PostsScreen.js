import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, Text, ActivityIndicator } from 'react-native';
import PostCard from '../components/PostCard';
import styles from '../styles/HomeScreenStyles';
import { apiService } from '../services/apiService';

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getPosts('posts');
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Error fetching posts:', e);
      setError('No se pudieron cargar las publicaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiService.deletePost(id, 'posts');
      setPosts((prev) => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error('Error deleting post:', e);
    }
  };

  const renderItem = ({ item }) => (
    <PostCard post={item} onDelete={handleDelete} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#092468" />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() => (
            <View style={{padding:20}}>
              <Text style={{textAlign:'center', color:'#666'}}>No hay publicaciones todavía</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      {error && <Text style={{color:'red', textAlign:'center'}}>{error}</Text>}
    </SafeAreaView>
  );
};

export default PostsScreen;
