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

// Datos de ejemplo para las publicaciones
const POSTS_DATA = [
  {
    id: '1',
    user: {
      name: 'Conferencia de viajes',
      avatar: require('../../assets/defaultavatar.png'),
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
      avatar: require('../../assets/defaultavatar.png'),
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
      avatar: require('../../assets/defaultavatar.png'),
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
    <View style={styles.postCard}>
      {/* Header del post */}
      <View style={styles.postHeader}>
        <Image source={item.user.avatar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.postTime}>{item.user.time}</Text>
        </View>
        {item.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        )}
      </View>

      {/* Contenido del post */}
      <Text style={styles.postContent}>{item.content}</Text>

      {/* Imagen del post (si existe) */}
      {item.image && (
        <Image source={item.image} style={styles.postImage} />
      )}

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>{item.reactions} reacciones</Text>
        <Text style={styles.statsText}>{item.comments} comentarios</Text>
      </View>

      {/* Separador */}
      <View style={styles.divider} />

      {/* Botones de acción */}
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
          <Text style={styles.actionText}>Reportar</Text>
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