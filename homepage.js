import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './dashstyle'; // Arquivo de estilos
import { auth } from './firebase.config';

const backgroundImage = require('./assets/cadastro.jpg'); // Imagem de plano de fundo

const Homepage = ({ navigation }) => {
  const [online, setOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado fixo para simular carregamento
  const [location] = useState({ // Localização fixa para Rio de Janeiro
    latitude: -22.906846,
    longitude: -43.172896,
  }); 

  // Partes do código que usam a API foram comentadas abaixo
  /*
  useEffect(() => {
    if (userData && userData.endereco) {
      const fetchCoordinates = async () => {
        try {
          console.log('Endereço enviado para a API:', userData.endereco);
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              userData.endereco
            )}&key=SUA_GOOGLE_API_KEY`
          );
          const data = await response.json();
          console.log('Resposta da API:', data);

          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setLocation({ latitude: lat, longitude: lng });
          } else if (data.status === 'ZERO_RESULTS') {
            Alert.alert('Erro', 'Endereço inválido. Verifique os dados e tente novamente.');
          } else {
            Alert.alert('Erro', `Erro na API: ${data.error_message || data.status}`);
          }
        } catch (error) {
          console.error('Erro ao buscar coordenadas:', error);
          Alert.alert('Erro', 'Erro ao obter localização.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchCoordinates();
    } else {
      setIsLoading(false); // Finaliza o carregamento se não houver endereço
    }
  }, [userData]);
  */

  const toggleOnlineStatus = () => {
    setOnline((prev) => !prev);
    Alert.alert('Status atualizado', online ? 'Você está offline' : 'Você está online');
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace('Login'); // Retornar à tela de login
      })
      .catch((error) => {
        console.error('Erro ao sair: ', error);
        Alert.alert('Erro', 'Não foi possível sair.');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        {/* Botão Online/Offline */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.onlineButton} onPress={toggleOnlineStatus}>
            <Text style={styles.onlineText}>{online ? 'Online' : 'Offline'}</Text>
          </TouchableOpacity>
        </View>

        {/* Mapa Centralizado */}
        <View style={styles.mapContainer}>
          <View style={styles.mapBox}>
            {isLoading ? (
              <Text style={styles.loadingText}>Carregando mapa...</Text>
            ) : (
              <MapView
                style={styles.map}
                initialRegion={{
                  ...location,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                {online && (
                  <Marker
                    coordinate={location}
                    title="Minha Localização"
                    description="Rua Alice Freitas, 26 - Rio de Janeiro"
                  />
                )}
              </MapView>
            )}
          </View>
        </View>

        {/* Botão Sair */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Homepage;
