import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Importa componentes do react-native-maps para o mapa e marcador
import styles from './dashstyle'; // Importa os estilos personalizados
import { auth } from './firebase.config'; // Importa a autenticação do Firebase

// Importa a imagem de fundo para a tela
const backgroundImage = require('./assets/cadastro.jpg'); 

const Homepage = ({ navigation }) => {
  // Estado para controlar o status online/offline
  const [online, setOnline] = useState(false);

  // Estado para controlar a região do mapa (localização e zoom)
  const [mapRegion, setMapRegion] = useState({
    latitude: -22.858132, // Latitude inicial do mapa
    longitude: -43.328209, // Longitude inicial do mapa
    latitudeDelta: 0.01, // Controle de zoom (delta latitude)
    longitudeDelta: 0.01, // Controle de zoom (delta longitude)
  });

  // Localização fixa para o marcador no mapa
  const location = {
    latitude: -22.858132,
    longitude: -43.328209,
  };

  /*
    Partes do código que usam a API do Google Maps foram comentadas abaixo.
    Essas partes recuperariam a localização dinâmica com base em um endereço salvo no Firebase.
    Nesse exemplo, a localização estática é usada.
  */
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

  // Alterna o status entre online e offline
  const toggleOnlineStatus = () => {
    setOnline((prev) => !prev);
    Alert.alert('Status atualizado', online ? 'Você está offline' : 'Você está online');
  };

  // Faz o logout do usuário no Firebase e redireciona para a tela de login
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace('Login'); // Redireciona para a tela de login
      })
      .catch((error) => {
        console.error('Erro ao sair: ', error);
        Alert.alert('Erro', 'Não foi possível sair.');
      });
  };

  // Função para aumentar o zoom do mapa
  const zoomIn = () => {
    setMapRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2, // Reduz o delta pela metade
      longitudeDelta: prev.longitudeDelta / 2, // Reduz o delta pela metade
    }));
  };

  // Função para diminuir o zoom do mapa
  const zoomOut = () => {
    setMapRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2, // Aumenta o delta
      longitudeDelta: prev.longitudeDelta * 2, // Aumenta o delta
    }));
  };

  // Função para centralizar o mapa na localização fixa
  const centerMap = () => {
    setMapRegion({
      ...location,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={styles.container}>
      {/* Imagem de fundo */}
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
            <MapView
              style={styles.map}
              region={mapRegion} // Define a região do mapa
              onRegionChangeComplete={(region) => setMapRegion(region)} // Atualiza a região
            >
              {/* Marcador no mapa */}
              <Marker
                coordinate={location} // Define a localização do marcador
                title="Minha Localização" // Título do marcador
                description="Rua Alice Freitas, 26 - Rio de Janeiro" // Descrição do marcador
                pinColor={online ? 'green' : 'red'} // Cor do marcador com base no status online/offline
              />
            </MapView>
          </View>

          {/* Botões de Zoom */}
          <View style={styles.zoomControls}>
            <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
              <Text style={styles.zoomText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
              <Text style={styles.zoomText}>-</Text>
            </TouchableOpacity>
          </View>

          {/* Botão para Centralizar no Endereço */}
          <TouchableOpacity style={styles.centerButton} onPress={centerMap}>
            <Text style={styles.centerText}>Centralizar</Text>
          </TouchableOpacity>
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
