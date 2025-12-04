import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/PostCardStyles';

const PostCard = ({ 
  post,
  onReact,
  onComment,
  onShare,
  onDelete 
}) => {
  return (
    <View style={styles.postCard}>
      {/* Header del post */}
      <View style={styles.postHeader}>
        <Image 
          source={post.userAvatar ? { uri: post.userAvatar } : require('../../assets/icons/defaultavatar.png')}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.postTime}>{post.time}</Text>
        </View>
      </View>

      {/* Contenido */}
      <Text style={styles.postContent}>{post.content}</Text>
      
      {post.image && (
        <Image 
          source={{ uri: post.image }} 
          style={styles.postImage} 
        />
      )}

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>{post.reactions || 0} reacciones</Text>
        <Text style={styles.statsText}>{post.comments || 0} comentarios</Text>
      </View>

      <View style={styles.divider} />

      {/* Acciones */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onReact && onReact(post.id)}
        >
          <Text style={styles.actionText}> Reaccionar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onComment && onComment(post.id)}
        >
          <Text style={styles.actionText}> Comentar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onShare && onShare(post.id)}
        >
          <Text style={styles.actionText}> Compartir</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onDelete && onDelete(post.id)}
        >
          <Text style={styles.actionText}> Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostCard;
