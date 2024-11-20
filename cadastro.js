import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import styles from './stylecadastro';
import { auth, firestore } from './firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [diaNascimento, setDiaNascimento] = useState('1');
  const [mesNascimento, setMesNascimento] = useState('1');
  const [anoNascimento, setAnoNascimento] = useState('1934');
  const [ddd, setDdd] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numeroResidencia, setNumeroResidencia] = useState('');

  const buscarEnderecoPorCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        setEndereco('');
      } else {
        const enderecoCompleto = `${data.logradouro}, ${numeroResidencia}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        setEndereco(enderecoCompleto);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o endereço.');
      console.error('Erro ao buscar o endereço:', error);
    }
  };

  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas informadas não coincidem.');
      return;
    }

    if (!endereco || !numeroResidencia) {
      Alert.alert('Erro', 'Por favor, preencha o endereço completo, incluindo o número da residência.');
      return;
    }

    try {
      // Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Concatenar o telefone com o prefixo do Brasil (+55)
      const telefoneCompleto = `+55${ddd}${telefone}`;

      // Montar os dados de cadastro para salvar no Firestore
      const dadosCadastro = {
        nome,
        email,
        telefone: telefoneCompleto,
        dataNascimento: `${diaNascimento}-${mesNascimento}-${anoNascimento}`, // Alterado para DD-MM-YYYY
        endereco, // Já concatenado com número, bairro, cidade e estado
        uid: user.uid, // Incluindo o UID para referência futura
      };

      // Salvar os dados no Firestore
      await setDoc(doc(firestore, 'usuarios', user.uid), dadosCadastro);

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.replace('Login'); // Redirecionar para a tela de login após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar a conta.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.pickerContainer}>
          <TextInput
            style={[styles.input, { width: '25%' }]}
            placeholder="DDD"
            value={ddd}
            onChangeText={(text) => setDdd(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: '75%' }]}
            placeholder="Telefone"
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
            keyboardType="phone-pad"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="CEP"
          value={cep}
          onChangeText={(text) => {
            setCep(text);
            if (text.length === 8) {
              buscarEnderecoPorCep(text);
            }
          }}
          keyboardType="numeric"
        />
        <View style={styles.pickerContainer}>
          <TextInput
            style={[styles.input, { width: '75%' }]}
            placeholder="Endereço"
            value={endereco}
            editable={false}
            placeholderTextColor="#888"
          />
          <TextInput
            style={[styles.input, { width: '25%' }]}
            placeholder="Nº"
            value={numeroResidencia}
            onChangeText={(text) => setNumeroResidencia(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.pickerContainer}>
          <TextInput
            style={[styles.input, { width: '30%' }]}
            placeholder="Dia"
            value={diaNascimento}
            onChangeText={(text) => setDiaNascimento(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: '30%' }]}
            placeholder="Mês"
            value={mesNascimento}
            onChangeText={(text) => setMesNascimento(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { width: '40%' }]}
            placeholder="Ano"
            value={anoNascimento}
            onChangeText={(text) => setAnoNascimento(text)}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={(text) => setConfirmarSenha(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
