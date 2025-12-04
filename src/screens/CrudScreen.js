// screens/CrudCardScreen.js
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
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
import MainLayout from "../layouts/MainLayout";
import { apiService } from '../services/apiService';

const CrudCardScreen = ({ route }) => {
  const { tabla } = route.params || { tabla: 'Departamentos' };

  const [atributos, setAtributos] = useState([]);
  const [campoId, setCampoId] = useState('id');
  const [datos, setDatos] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchText, setSearchText] = useState('');

  // 🔥 Extraer atributos y campo ID del primer registro
  const extraerAtributos = (datos) => {
    if (datos.length > 0) {
      const primerRegistro = datos[0];
      const atributosArray = Object.keys(primerRegistro);
      
      // Encontrar el campo que sea ID (busca cualquier campo que contenga "id" o "Id")
      const idField = atributosArray.find(attr => 
        attr.toLowerCase().includes('id') || 
        attr.toLowerCase().endsWith('id')
      ) || atributosArray[0];
      
      return {
        atributos: atributosArray,
        campoId: idField
      };
    }
    return { atributos: [], campoId: 'id' };
  };

  // 🔥 Cargar datos de la API usando apiCrud
  const cargarDatos = async () => {
    try {
      setLoading(true);

      // Obtener datos de la tabla usando /obtener/:tabla
      const datosResponse = await apiService.apiCrud('/obtener', tabla);
      
      // Si la respuesta es exitosa, extraer atributos
      if (Array.isArray(datosResponse)) {
        const { atributos: atributosExtraidos, campoId: idField } = extraerAtributos(datosResponse);
        
        setAtributos(atributosExtraidos);
        setCampoId(idField);
        setDatos(datosResponse);
        setDatosFiltrados(datosResponse);
      } else {
        throw new Error("Formato de respuesta inválido");
      }

    } catch (error) {
      Alert.alert("Error", error.message || "Error al cargar datos");
      setAtributos([]);
      setDatos([]);
      setDatosFiltrados([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [tabla]);

  // 🔥 Filtro de búsqueda dinámico
  useEffect(() => {
    if (searchText.trim() === "") {
      setDatosFiltrados(datos);
      return;
    }

    const filtro = datos.filter(item =>
      atributos.some(attr =>
        String(item[attr] || "").toLowerCase().includes(searchText.toLowerCase())
      )
    );

    setDatosFiltrados(filtro);

  }, [searchText, datos, atributos]);

  const onRefresh = () => {
    setRefreshing(true);
    cargarDatos();
  };

  // 🔥 Abrir modal para editar
  const handleEditar = async (item) => {
    try {
      setLoading(true);
      
      // Obtener el registro completo por ID usando /obtenerId/:tabla
      const id = item[campoId];
      const registroCompleto = await apiService.apiCrud('/obtenerId', tabla, id);
      
      if (registroCompleto) {
        setEditingItem(registroCompleto);
        setFormData({ ...registroCompleto });
        setModalVisible(true);
      } else {
        Alert.alert("Error", "No se pudo cargar el registro para editar");
      }
    } catch (error) {
      Alert.alert("Error", "Error al cargar datos para editar");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Nuevo registro
  const handleNuevo = () => {
    const nuevo = {};
    
    // Crear objeto vacío para todos los atributos excepto el ID
    atributos.forEach(attr => {
      if (attr !== campoId) {
        nuevo[attr] = "";
      }
    });

    setEditingItem(null);
    setFormData(nuevo);
    setModalVisible(true);
  };

  // 🔥 Eliminar registro
  const handleEliminar = (item) => {
    const id = item[campoId];

    Alert.alert(
      "Confirmar eliminación",
      "¿Seguro que quieres eliminar este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarRegistroHandler(id),
        }
      ]
    );
  };

  const eliminarRegistroHandler = async (id) => {
    try {
      // Usar /eliminar/:tabla
      const resp = await apiService.apiCrud('/eliminar', tabla, id);

      if (!resp.success) {
        throw new Error(resp.error || "Error al eliminar");
      }

      Alert.alert("Éxito", resp.message || "Registro eliminado");
      cargarDatos();

    } catch (error) {
      Alert.alert("Error", error.message || "Error al eliminar el registro");
    }
  };

  // 🔥 Manejar cambios del formulario
  const handleInputChange = (attr, value) => {
    setFormData(prev => ({ ...prev, [attr]: value }));
  };

  // 🔥 Validar campos requeridos
  const validarFormulario = () => {
    // El campo ID no es requerido para nuevos registros
    const atributosRequeridos = atributos.filter(attr => attr !== campoId);
    
    for (const attr of atributosRequeridos) {
      if (formData[attr] === undefined || formData[attr] === null || formData[attr].toString().trim() === "") {
        Alert.alert("Error", `El campo "${attr}" es requerido`);
        return false;
      }
    }
    return true;
  };

  // 🔥 Guardar (insertar o actualizar)
  const guardarCambios = async () => {
    try {
      // Validar campos requeridos
      if (!validarFormulario()) {
        return;
      }

      const id = editingItem ? editingItem[campoId] : null;
      let datosParaEnviar = { ...formData };

      // Si es nuevo registro, quitar el campo ID si existe
      if (!editingItem && datosParaEnviar[campoId]) {
        delete datosParaEnviar[campoId];
      }

      let resp;

      if (editingItem) {
        // Actualizar usando /actualizar/:tabla
        resp = await apiService.apiCrud('/actualizar', tabla, id, datosParaEnviar);
      } else {
        // Insertar usando /insertar/:tabla
        resp = await apiService.apiCrud('/insertar', tabla, null, datosParaEnviar);
      }

      if (!resp.success) {
        throw new Error(resp.error || "Error en la operación");
      }

      Alert.alert("Éxito", resp.message || (editingItem ? "Actualizado" : "Insertado"));
      setModalVisible(false);
      cargarDatos();

    } catch (error) {
      Alert.alert("Error", error.message || "Error al guardar");
    }
  };

  // 🔥 Tarjetas
  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>ID: {item[campoId]}</Text>
        </View>
        <Text style={styles.timeText}>{new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.cardContent}>
        {atributos
          .filter(attr => attr !== campoId)
          .map(attr => (
            <View key={attr} style={styles.fieldRow}>
              <Text style={styles.fieldLabel}>{attr}:</Text>
              <Text style={styles.fieldValue}>
                {String(item[attr] || "N/A")}
              </Text>
            </View>
          ))
        }
      </View>

      <View style={styles.divider} />

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

  // 🔥 Generar formulario dinámico basado en atributos
  const renderFormulario = () => {
    return atributos.map((attr) => {
      // Determinar si este campo es el ID
      const esId = attr === campoId;
      
      // Para nuevos registros, no mostrar el campo ID
      if (!editingItem && esId) {
        return null;
      }

      return (
        <View key={attr} style={styles.inputGroup}>
          <Text style={styles.label}>
            {attr} {esId && editingItem ? "(ID - Solo lectura)" : ""}
          </Text>

          {/* Campo ID solo lectura en edición */}
          {esId && editingItem ? (
            <View style={styles.readOnlyContainer}>
              <Text style={styles.readOnlyText}>{formData[attr] || ""}</Text>
            </View>
          ) : (
            <TextInput
              style={styles.textInput}
              value={String(formData[attr] || "")}
              onChangeText={(text) => handleInputChange(attr, text)}
              placeholder={`Ingrese ${attr}`}
              multiline={String(formData[attr] || "").length > 50}
              numberOfLines={String(formData[attr] || "").length > 50 ? 3 : 1}
            />
          )}
        </View>
      );
    });
  };

  // 🔥 Pantalla mientras carga
  if (loading && !refreshing)
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando {tabla}...</Text>
      </View>
    );

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        {/* Título */}
        <View style={styles.titleContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{tabla}</Text>
            <Text style={styles.subtitle}>
              {datos.length} registro{datos.length !== 1 ? 's' : ''} encontrado{datos.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleNuevo}>
            <Text style={styles.addButtonText}>+ Nuevo</Text>
          </TouchableOpacity>
        </View>

        {/* Búsqueda */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder={`Buscar en ${tabla}...`}
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
          {searchText !== "" && (
            <TouchableOpacity onPress={() => setSearchText("")} style={styles.clearButton}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Lista de tarjetas */}
        <FlatList
          data={datosFiltrados}
          keyExtractor={(item) => String(item[campoId])}
          renderItem={renderCard}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#007AFF']} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyText}>
                {searchText ? `No se encontraron resultados para "${searchText}"` : `No hay datos en ${tabla}`}
              </Text>
              {!searchText && (
                <TouchableOpacity style={styles.emptyButton} onPress={handleNuevo}>
                  <Text style={styles.emptyButtonText}>Crear primer registro</Text>
                </TouchableOpacity>
              )}
            </View>
          }
          contentContainerStyle={datosFiltrados.length === 0 ? styles.emptyListContainer : styles.listContainer}
        />

        {/* Modal form */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {editingItem ? `Editar ${tabla}` : `Nuevo ${tabla}`}
              </Text>

              <ScrollView 
                style={styles.formContainer}
                showsVerticalScrollIndicator={false}
              >
                {renderFormulario()}
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
                    {editingItem ? "Actualizar" : "Crear"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </MainLayout>
  );
};

// 🔥 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
    fontSize: 18,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  clearIcon: {
    fontSize: 18,
    color: '#999',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  idBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  idText: {
    color: '#1976d2',
    fontWeight: '600',
    fontSize: 14,
  },
  timeText: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
  cardContent: {
    marginBottom: 15,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  fieldLabel: {
    fontWeight: '600',
    color: '#555',
    fontSize: 15,
    flex: 1,
  },
  fieldValue: {
    color: '#333',
    fontSize: 15,
    flex: 2,
    textAlign: 'right',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  editActionButton: {
    backgroundColor: '#ff9800',
  },
  deleteActionButton: {
    backgroundColor: '#f44336',
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
    marginTop: 50,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  formContainer: {
    maxHeight: 450,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  readOnlyContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#f0f0f0',
  },
  readOnlyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 15,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default CrudCardScreen;