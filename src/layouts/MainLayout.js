import { useNavigation } from '@react-navigation/native';
import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { authService } from "../services/authService";
import { useSession } from "../utils/SessionContext";

import gato from '../../assets/gato.png';

export default function MainLayout({ children }) {
    const navigation = useNavigation();
    const { userinfo, setUserInfo, loading, setLoading } = useSession();

    const handleLogout = async () => {
        try{
            setLoading(true);
            await authService.signOut();
            await setUserInfo(null); // Limpiar la información del usuario en App.js
        }catch(error){
            console.error("Error during sign out:", error);
        }finally{
          setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesLayout.header}>
                <View style={stylesLayout.headerContent}>
                    <Image 
                    source={gato} 
                    style={stylesLayout.headerLogo}
                    resizeMode="contain"
                    />
                    <Text style={stylesLayout.headerTitle}>Difuzzor</Text>
                </View>
                
                <TouchableOpacity 
                    style={stylesLayout.logoutButton}
                    onPress={handleLogout} // cerrar sesion 
                >
                    <Text style={stylesLayout.logoutText}>Salir</Text>
                </TouchableOpacity>
            </View>
            
            <View style={stylesLayout.content}>
                {children}
            </View>

            <View style={stylesLayout.footer}>
                <TouchableOpacity
                    style={stylesLayout.tab}
                    onPress={() => navigation.navigate('Crud', { tabla: 'Departamento' })}
                    >
                    <Image
                        source={require('../../assets/icons/Tienda.png')}
                        style={stylesLayout.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesLayout.tab}
                    onPress={() => navigation.navigate('Home')}
                    >
                    <Image
                        source={require('../../assets/icons/Home.png')}
                        style={stylesLayout.icon}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesLayout.tab}
                    onPress={() => navigation.navigate('Profile')}
                    >
                    <Image
                        source={require('../../assets/icons/defaultavatar.png')}
                        style={stylesLayout.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const stylesLayout = StyleSheet.create({
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16232C',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 12 : 12,
    paddingBottom: 12,
    minHeight: 70,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    alignItems: 'flex-end',
    marginLeft: 16,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Tab bar styles
  footer: {
    backgroundColor: '#22323D',
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  tab: {
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },

  content: {
    flex: 1,          // ocupa todo el espacio restante
    padding: 16,
    backgroundColor: '#fff', // opcional
  },
});