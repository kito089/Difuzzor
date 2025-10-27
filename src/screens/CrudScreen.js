// screens/CrudCardScreen.js
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { apiService } from '../services/apiService';


const CrudTableScreen = ({ route }) => {
  const { tabla } = route.params || { tabla: 'Clubs' }; // Tabla por defecto
  const [atributos, setAtributos] = useState([]);
  const [datos, setDatos] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchText, setSearchText] = useState('');

  // Cargar datos de la API
  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      const atributosResponse = await apiService.apiCrud('/atributos', tabla);
      if (atributosResponse.success) {
        setAtributos(atributosResponse.data);
        
        const datosResponse = await apiService.apiCrud('/obtener', tabla);
        if (datosResponse.success) {
          setDatos(datosResponse.data);
          setDatosFiltrados(datosResponse.data);
        } else {
          throw new Error(datosResponse.message);
        }
      } else {
        throw new Error(atributosResponse.message);
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
      Alert.alert('Error', error.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [tabla]);

  // Filtrar datos según búsqueda
  useEffect(() => {
    if (searchText.trim() === '') {
      setDatosFiltrados(datos);
    } else {
      const filtrados = datos.filter(item => {
        return atributos.some(attr => {
          const valor = String(item[attr] || '').toLowerCase();
          return valor.includes(searchText.toLowerCase());
        });
      });
      setDatosFiltrados(filtrados);
    }
  }, [searchText, datos, atributos]);

  const onRefresh = () => {
    setRefreshing(true);
    cargarDatos();
  };

  // Manejar edición
  const handleEditar = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setModalVisible(true);
  };

  // Manejar nuevo registro
  const handleNuevo = () => {
    setEditingItem(null);
    const nuevoData = {};
    atributos.forEach(attr => {
      if (attr !== atributos[0]) {
        nuevoData[attr] = '';
      }
    });
    setFormData(nuevoData);
    setModalVisible(true);
  };

  // Manejar eliminación
  const handleEliminar = (item) => {
    const id = item[atributos[0]];
    
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de eliminar este registro?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => eliminarRegistroHandler(id)
        }
      ]
    );
  };

  const eliminarRegistroHandler = async (eid) => {
    try {
      const response = await apiService.apiCrud('/eliminar', tabla, eid);
      if (response.success) {
        Alert.alert('Éxito', 'Registro eliminado correctamente');
        cargarDatos();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error al eliminar el registro');
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (atributo, valor) => {
    setFormData(prev => ({
      ...prev,
      [atributo]: valor
    }));
  };

  // Guardar cambios
  const guardarCambios = async () => {
    try {
      let response;
      
      if (editingItem) {
        const id = editingItem[atributos[0]];
        response = await apiService.apiCrud('/actualizar', tabla, id, formData);
      } else {
        response = await apiService.apiCrud('/insertar', tabla, null, formData);
      }

      if (response.success) {
        Alert.alert('Éxito', editingItem ? 'Registro actualizado' : 'Registro creado');
        setModalVisible(false);
        cargarDatos();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error al guardar los datos');
    }
  };

  // Renderizar cada tarjeta
  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {/* Header de la tarjeta con ID */}
      <View style={styles.cardHeader}>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>ID: {item[atributos[0]]}</Text>
        </View>
        <Text style={styles.timeText}>
          {new Date().toLocaleDateString()}
        </Text>
      </View>

      {/* Contenido de la tarjeta - Mostrar todos los atributos excepto el ID */}
      <View style={styles.cardContent}>
        {atributos.slice(1).map((atributo, index) => (
          <View key={atributo} style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>{atributo}:</Text>
            <Text style={styles.fieldValue} numberOfLines={2}>
              {String(item[atributo] || 'N/A')}
            </Text>
          </View>
        ))}
      </View>

      {/* Separador */}
      <View style={styles.divider} />

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editActionButton]}
          onPress={() => handleEditar(item)}
        >
          <Text style={styles.actionText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteActionButton]}
          onPress={() => handleEliminar(item)}
        >
          <Text style={styles.actionText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando {tabla}...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Título de la sección */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{tabla}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleNuevo}>
          <Text style={styles.addButtonText}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder={`Buscar en ${tabla}...`}
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Lista de tarjetas */}
      <FlatList
        data={datosFiltrados}
        renderItem={renderCard}
        keyExtractor={(item) => String(item[atributos[0]] || Math.random())}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchText ? 'No se encontraron resultados' : 'No hay datos disponibles'}
            </Text>
          </View>
        }
      />

      {/* Modal para editar/crear */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingItem ? '✏️ Editar Registro' : '➕ Nuevo Registro'}
            </Text>
            
            <ScrollView style={styles.formContainer}>
              {atributos.map((atributo, index) => {
                if (index === 0 && editingItem) {
                  return (
                    <View key={atributo} style={styles.inputGroup}>
                      <Text style={styles.label}>{atributo}</Text>
                      <Text style={styles.readOnlyText}>
                        {editingItem[atributo]}
                      </Text>
                    </View>
                  );
                } else if (index !== 0 || !editingItem) {
                  return (
                    <View key={atributo} style={styles.inputGroup}>
                      <Text style={styles.label}>{atributo}</Text>
                      <TextInput
                        style={styles.textInput}
                        value={String(formData[atributo] || '')}
                        onChangeText={(text) => handleInputChange(atributo, text)}
                        placeholder={`Ingrese ${atributo}`}
                        placeholderTextColor="#999"
                      />
                    </View>
                  );
                }
                return null;
              })}
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={guardarCambios}
              >
                <Text style={styles.modalButtonText}>
                  {editingItem ? 'Actualizar' : 'Crear'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  clearIcon: {
    fontSize: 20,
    color: '#999',
    paddingHorizontal: 8,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  idBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  idText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  cardContent: {
    marginBottom: 12,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 120,
  },
  fieldValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  editActionButton: {
    backgroundColor: '#FFA500',
  },
  deleteActionButton: {
    backgroundColor: '#FF3B30',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  readOnlyText: {
    padding: 12,
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#8E8E93',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CrudScreen;