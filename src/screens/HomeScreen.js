import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/HomeScreenStyles";
import postcard from "../styles/PostCard";

// Datos de ejemplo para las publicaciones
const POSTS_DATA = [
  {
    id: '1',
    user: {
      name: 'Conferencia de viajes',
      avatar: require('../../assets/icons/defaultavatar.png'),
      time: 'Hace 3 horas',
    },
    category: 'UTA',
    content: 'Conferencia magistral sobre las últimas tendencias en IA y machine learning aplicado a la industria.',
    image: null,
    reactions: 20,
    comments: 10,
  },
  {
    id: '2',
    user: {
      name: 'Julión Álvarez',
      avatar: require('../../assets/icons/defaultavatar.png'),
      time: 'Hace 24 horas',
    },
    category: null,
    content: 'Se venden ricos burritos, en tan solo 15 pesitos compren, manden mensaje si gustan comprar.',
    image: null,
    reactions: 60,
    comments: 12,
  },
  {
    id: '3',
    user: {
      name: 'Deportes UTA',
      avatar: require('../../assets/icons/defaultavatar.png'),
      time: 'Hace 1 día',
    },
    category: 'Deportes',
    content: 'Partido de Fútbol entre los Lobos y Lobas',
    image: null,
    reactions: 45,
    comments: 8,
  },
];

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filters = ['Todos', 'UTA', 'Culturales', 'Deportivos'];

  const renderPost = ({ item }) => (
    <View style={postcard.postCard}>
      {/* Header del post */}
      <View style={postcard.postHeader}>
        <Image source={item.user.avatar} style={postcard.avatar} />
        <View style={postcard.userInfo}>
          <Text style={postcard.userName}>{item.user.name}</Text>
          <Text style={postcard.postTime}>{item.user.time}</Text>
        </View>
        {item.category && (
          <View style={postcard.categoryBadge}>
            <Text style={postcard.categoryText}>{item.category}</Text>
          </View>
        )}
      </View>

      {/* Contenido del post */}
  <Text style={postcard.postContent}>{item.content}</Text>

      {/* Imagen del post (si existe) */}
      {item.image && (
        <Image source={item.image} style={postcard.postImage} />
      )}

      {/* Stats */}
      <View style={postcard.statsContainer}>
        <Text style={postcard.statsText}>{item.reactions} reacciones</Text>
        <Text style={postcard.statsText}>{item.comments} comentarios</Text>
      </View>

      {/* Separador */}
  <View style={postcard.divider} />

      {/* Botones de acción */}
      <View style={postcard.actionsContainer}>
        <TouchableOpacity style={postcard.actionButton}>
          <Image
            source={require('../../assets/reaction.png')}
            style={postcard.actionIcon}
          />
          <Text style={postcard.actionText}>Reaccionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../assets/comment.png')}
            style={postcard.actionIcon}
          />
          <Text style={postcard.actionText}>Comentar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../assets/share.png')}
            style={postcard.actionIcon}
          />
          <Text style={postcard.actionText}>Compartir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={require('../../assets/report.png')}
            style={postcard.actionIcon}
          />
          <Text style={postcard.actionText}>Reportar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Título de la sección */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Eventos</Text>
        <TouchableOpacity>
          <Image
            source={require('../../assets/megafono.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../../assets/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Buscar publicaciones, personas..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de publicaciones */}
      <FlatList
        data={POSTS_DATA}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;