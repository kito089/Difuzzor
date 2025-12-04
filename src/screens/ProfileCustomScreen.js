import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/ProfileCustomStyles";
import MainLayout from "../layouts/MainLayout";

const ProfileCustomScreen = ({ nombre: nombreProp, apellido: apellidoProp, descripcion: descripcionProp, onSave, onCancel }) => {
  const [nombre, setNombre] = useState(nombreProp || "Magdalena");
  const [apellido, setApellido] = useState(apellidoProp || "Morquecho Reyes");
  const [descripcion, setDescripcion] = useState(
    descripcionProp || "Estudiante de Ingeniería en Software apasionada por la tecnología."
  );
  const [selectedRole, setSelectedRole] = useState(null);
  const [motivo, setMotivo] = useState("");

  const roles = [
    {
      id: "vendedor",
      title: "Vendedor",
      description: "Publica y vende productos",
      icon: require("../../assets/icons/defaultavatar.png"),
    },
    {
      id: "publisher",
      title: "Publisher",
      description: "Crea avisos y eventos",
      icon: require("../../assets/icons/defaultavatar.png"),
    },
    {
      id: "moderador",
      title: "Moderador",
      description: "Gestiona la comunidad",
      icon: require("../../assets/icons/defaultavatar.png"),
    },
  ];

  const handleSaveChanges = () => {
    if (onSave) {
      onSave({ nombre, apellido, descripcion });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleSendRequest = () => {
    if (!selectedRole || !motivo.trim()) {
      alert("Por favor selecciona un rol y escribe el motivo");
      return;
    }
    alert("Solicitud enviada");
    setSelectedRole(null);
    setMotivo("");
  };

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Título */}
          <Text style={styles.title}>Editar Perfil</Text>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/icons/defaultavatar.png")}
              resizeMode="stretch"
              style={styles.avatar}
            />
          </View>

          {/* Info usuario */}
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>Magdalena Morquecho Reyes</Text>
            <Text style={styles.userMatricula}>Matrícula: 246534</Text>
          </View>

          {/* Sección información personal */}
          <Text style={styles.sectionTitle}>Información Personal</Text>
          <View style={styles.separator} />

          {/* Nombre */}
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          {/* Apellido */}
          <Text style={styles.label}>Apellido</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={apellido}
              onChangeText={setApellido}
            />
          </View>

          {/* Descripción */}
          <Text style={styles.label}>Descripción</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Botones guardar/cancelar */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
            >
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          {/* Separador */}
          <View style={styles.largeSeparator} />

          {/* Sección solicitar rol */}
          <View style={styles.roleSection}>
            <Text style={styles.roleSectionTitle}>Solicitar Nuevo Rol</Text>
          </View>

          <Text style={styles.roleQuestion}>¿A qué rol deseas aplicar?</Text>

          <View style={styles.rolesSeparator} />

          {/* Lista de roles */}
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={styles.roleCard}
              onPress={() => setSelectedRole(role.id)}
            >
              <View style={styles.radioButton}>
                {selectedRole === role.id && <View style={styles.radioSelected} />}
              </View>
              <Image source={role.icon} style={styles.roleIcon} />
              <View style={styles.roleInfo}>
                <Text style={styles.roleTitle}>{role.title}</Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Motivo */}
          <Text style={styles.motivoLabel}>Motivo de la solicitud *</Text>
          <View style={styles.motivoContainer}>
            <TextInput
              style={styles.motivoInput}
              placeholder="¿Por qué quieres este rol?"
              placeholderTextColor="#999"
              value={motivo}
              onChangeText={setMotivo}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Botón enviar solicitud */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendRequest}
          >
            <Text style={styles.sendButtonText}>Enviar solicitud</Text>
          </TouchableOpacity>

          {/* Espacio al final */}
          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </MainLayout>
  );
};

export default ProfileCustomScreen;