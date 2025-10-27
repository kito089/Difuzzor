// screens/CrudTableScreen.js
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { actualizarRegistro, eliminarRegistro, insertarRegistro, obtenerAtributosAPI, obtenerDatosTabla } from '../services/api';

const CrudTableScreen = ({ route }) => {
  const { tabla } = route.params || { tabla: 'Clubes' }; // Tabla por defecto
  const [atributos, setAtributos] = useState([]);
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Cargar atributos y datos
  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Obtener atributos de la tabla
      const atributosResponse = await obtenerAtributosAPI(tabla);
      if (atributosResponse.success) {
        setAtributos(atributosResponse.data);
        
        // Obtener datos de la tabla
        const datosResponse = await obtenerDatosTabla(tabla);
        if (datosResponse.success) {
          setDatos(datosResponse.data);
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
    
    // Crear objeto vacío con los atributos
    const nuevoData = {};
    atributos.forEach(attr => {
      if (attr !== atributos[0]) { // No incluir el ID para nuevo registro
        nuevoData[attr] = '';
      }
    });
    
    setFormData(nuevoData);
    setModalVisible(true);
  };

  // Manejar eliminación
  const handleEliminar = (item) => {
    const id = item[atributos[0]]; // Primero atributo es el ID
    
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de eliminar el registro con ID ${id}?`,
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

  const eliminarRegistroHandler = async (id) => {
    try {
      const response = await eliminarRegistro(tabla, id);
      if (response.success) {
        Alert.alert('Éxito', 'Registro eliminado correctamente');
        cargarDatos(); // Recargar datos
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

  // Guardar cambios (crear o actualizar)
  const guardarCambios = async () => {
    try {
      let response;
      
      if (editingItem) {
        // Actualizar registro existente
        const id = editingItem[atributos[0]];
        response = await actualizarRegistro(tabla, id, formData);
      } else {
        // Crear nuevo registro
        response = await insertarRegistro(tabla, formData);
      }

      if (response.success) {
        Alert.alert('Éxito', editingItem ? 'Registro actualizado' : 'Registro creado');
        setModalVisible(false);
        cargarDatos(); // Recargar datos
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error al guardar los datos');
    }
  };

  // Renderizar cabecera de la tabla
  const renderHeader = () => (
    <View style={styles.headerRow}>
      {atributos.map((atributo, index) => (
        <View key={atributo} style={[
          styles.headerCell,
          index === 0 && styles.idColumn,
          index === atributos.length - 1 && styles.actionsColumn
        ]}>
          <Text style={styles.headerText}>
            {atributo}
          </Text>
        </View>
      ))}
      <View style={[styles.headerCell, styles.actionsColumn]}>
        <Text style={styles.headerText}>Acciones</Text>
      </View>
    </View>
  );

  // Renderizar cada fila de datos
  const renderItem = ({ item }) => (
    <View style={styles.dataRow}>
      {atributos.map((atributo, index) => (
        <View key={atributo} style={[
          styles.dataCell,
          index === 0 && styles.idColumn,
          index === atributos.length - 1 && styles.actionsColumn
        ]}>
          <Text style={styles.cellText} numberOfLines={1}>
            {String(item[atributo] || '')}
          </Text>
        </View>
      ))}
      <View style={[styles.dataCell, styles.actionsCell]}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditar(item)}
        >
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleEliminar(item)}
        >
          <Text style={styles.actionButtonText}>Eliminar</Text>
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.screenHeader}>
        <Text style={styles.title}>CRUD - {tabla}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleNuevo}>
          <Text style={styles.addButtonText}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>

      {/* Tabla */}
      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          data={datos}
          renderItem={renderItem}
          keyExtractor={(item) => String(item[atributos[0]] || Math.random())}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#007AFF']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay datos disponibles</Text>
            </View>
          }
        />
      </View>

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
              {editingItem ? 'Editar Registro' : 'Nuevo Registro'}
            </Text>
            
            <ScrollView style={styles.formContainer}>
              {atributos.map((atributo, index) => {
                if (index === 0 && editingItem) {
                  // Mostrar ID pero no editable
                  return (
                    <View key={atributo} style={styles.inputGroup}>
                      <Text style={styles.label}>{atributo}</Text>
                      <Text style={styles.readOnlyText}>
                        {editingItem[atributo]}
                      </Text>
                    </View>
                  );
                } else if (index !== 0 || !editingItem) {
                  // Campos editables
                  return (
                    <View key={atributo} style={styles.inputGroup}>
                      <Text style={styles.label}>{atributo}</Text>
                      <TextInput
                        style={styles.textInput}
                        value={String(formData[atributo] || '')}
                        onChangeText={(text) => handleInputChange(atributo, text)}
                        placeholder={`Ingrese ${atributo}`}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  tableContainer: {
    flex: 1,
    margin: 16,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 12,
  },
  dataRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
  },
  headerCell: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  dataCell: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
    minHeight: 40,
  },
  idColumn: {
    flex: 0.5,
  },
  actionsColumn: {
    flex: 1.2,
  },
  actionsCell: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cellText: {
    fontSize: 12,
    color: '#333',
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFA500',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: 'white',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
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
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  readOnlyText: {
    padding: 10,
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
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
  },
});

export default CrudTableScreen;