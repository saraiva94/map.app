import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation para navegação
import { sendPasswordResetEmail } from 'firebase/auth'; // Importe a função para enviar o e-mail de redefinição de senha
import { auth } from './firebase.config'; // Importe a configuração do Firebase
import styles from './recuperacaostyle'; // Importe o novo arquivo de estilos

const backgroundImage = require('./assets/cadastro.jpg'); // Imagem de plano de fundo

export default function RecuperacaoSenha() {
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail do usuário
  const navigation = useNavigation(); // Inicialize o hook useNavigation para navegação

  const handleEnviar = () => {
    // Função para lidar com o envio do e-mail de redefinição de senha
    if (email.trim() === '') {
      // Verifique se o e-mail não está vazio
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Se o envio do e-mail for bem-sucedido, mostre uma mensagem de alerta
        Alert.alert('Recuperação de Senha', `Um e-mail de recuperação foi enviado para: ${email}`);
        navigation.navigate('TrocaSenha'); // Navegue para a tela 'TrocaSenha'
      })
      .catch((error) => {
        // Se houver um erro, mostre uma mensagem de alerta com a mensagem de erro
        const errorMessage = error.message;
        Alert.alert('Erro', `Ops! Algo deu errado: ${errorMessage}`);
      });
  };

  return (
    // Estrutura da tela de recuperação de senha
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
