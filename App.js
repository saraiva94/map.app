import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from './cadastro';
import RecuperacaoSenha from './recuperacaosenha';
import Homepage from './homepage';
import styles from './styles';
import { auth } from './firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AppRegistry } from 'react-native'; // Adicionado para garantir registro do componente principal
import { name as appName } from './app.json'; // Nome do aplicativo no app.json

const Stack = createStackNavigator();

export default function App() {
  const [userMail, setUserMail] = useState('');
  const [userPass, setUserPass] = useState('');

  const userLogin = (navigation) => {
    signInWithEmailAndPassword(auth, userMail, userPass)
      .then((userCredential) => {
        alert('Login efetuado com sucesso!');
        navigation.navigate('dashboard');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('Usuário não encontrado. Verifique seu e-mail.');
            break;
          case 'auth/wrong-password':
            alert('Senha incorreta. Tente novamente.');
            break;
          default:
            alert('Erro ao efetuar login. Tente novamente.');
        }
      });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {(props) => (
            <HomeScreen
              {...props}
              userMail={userMail}
              setUserMail={setUserMail}
              userPass={userPass}
              setUserPass={setUserPass}
              userLogin={() => userLogin(props.navigation)}
            />
          )}
        </Stack.Screen>

        {/* Tela de Cadastro */}
        <Stack.Screen name="Cadastro" component={Cadastro} />

        {/* Tela de Recuperação de Senha */}
        <Stack.Screen name="RecuperacaoSenha" component={RecuperacaoSenha} />

        {/* Dashboard do Usuário */}
        <Stack.Screen name="dashboard" component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Componente da tela inicial (HomeScreen)
function HomeScreen({ navigation, userLogin, userMail, setUserMail, userPass, setUserPass }) {
  const handleCadastroPress = () => {
    navigation.navigate('Cadastro');
  };

  const handleEsqueciSenhaPress = () => {
    navigation.navigate('RecuperacaoSenha');
  };

  return (
    <View style={styles.container}>
      {/* Vídeo de fundo */}
      <Video
        source={require('./assets/reciclagem.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isLooping
        shouldPlay
        rate={0.33}
      />

      {/* Conteúdo da Tela de Login */}
      <View style={styles.overlay}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Informe o e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            value={userMail}
            onChangeText={setUserMail}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            autoCapitalize="none"
            placeholderTextColor="#888"
            secureTextEntry
            value={userPass}
            onChangeText={setUserPass}
          />
          <TouchableOpacity style={styles.button} onPress={() => userLogin(navigation)}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={handleCadastroPress}>
              <Text style={styles.link}>Cadastre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEsqueciSenhaPress}>
              <Text style={styles.link}>Esqueci a senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// Registro do componente principal
AppRegistry.registerComponent(appName, () => App);
