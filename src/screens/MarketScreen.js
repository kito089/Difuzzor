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

// Datos de ejemplo para productos del mercado
const MARKET_DATA = [
  {
    id: '1',
    user: {
      name: 'Miguel Morales',
      avatar: require('../../assets/defaultavatar.png'),
      time: 'Hace 2 horas',
    },
    category: null,
    content: 'Estoy vendiendo chavas marca chidas en $16, hay variedad de chetos.',
    image: require('../../assets/comida.png'),
    reactions: 15,
    comments: 5,
  },
  {
    id: '2',
    user: {
      name: 'Alexis Mora',
      avatar: require('../../assets/defaultavatar.png'),
      time: 'Hace 3 horas',
    },
    category: null,
    content: 'Se venden ricas galletas de Oataco, cada pieza está en $12, también se venden panes en $7 la pieza.',
    image: require('../../assets/comida.png'),
    reactions: 32,
    comments: 8,
  },
  {
    id: '3',
    user: {
      name: 'María Gómez',
      avatar: require('../../assets/defaultavatar.png'),
      time: 'Hace 5 horas',
    },
    category: null,
    content: 'Vendo tortas preparadas $25, incluye refresco. Entrega en la UTA.',
    image: require('../../assets/comida.png'),
    reactions: 28,
    comments: 12,
  },
];

const MarketScreen = () => {
  const [searchText, setSearchText] = useState('');

  const renderProduct = ({ item }) => (
    <View style={styles.postCard}>
      {/* Header del producto */}
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

      {/* Contenido del producto */}
      <Text style={styles.postContent}>{item.content}</Text>

      {/* Imagen del producto */}
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
        <Text style={styles.title}>Mercado UTA 🛒</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../../assets/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Buscar productos..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      {/* Lista de productos */}
      <FlatList
        data={MARKET_DATA}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MarketScreen;