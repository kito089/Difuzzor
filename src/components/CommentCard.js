import { Image, Text, View } from 'react-native';
import styles from '../styles/CommentCardStyles';

const CommentCard = ({ comment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={comment.userAvatar ? { uri: comment.userAvatar } : require('../../assets/icons/defaultavatar.png')}
          style={styles.avatar}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{comment.title}</Text>
          <Text style={styles.text}>{comment.text}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.time}>{comment.time}</Text>
        <View style={styles.reactionContainer}>
          <Image
            source={require('../../assets/reaction.png')}
            style={styles.reactionIcon}
          />
          <Text style={styles.reactionText}>{comment.reactions || 0}</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
