// Importações necessárias
import React, { useState } from 'react'; // React e o hook useState para gerenciar estados locais
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'; // Componentes básicos para a interface
import styles from './stylecadastro'; // Estilo customizado para esta tela
import { auth, firestore } from './firebase.config'; // Configurações do Firebase (Autenticação e Firestore)
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Função para criar usuários no Firebase Auth
import { setDoc, doc } from 'firebase/firestore'; // Funções para salvar documentos no Firestore

// Função principal do componente de Cadastro
export default function Cadastro({ navigation }) {
  // Definição dos estados locais para armazenar os dados do formulário
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

  // Função para buscar endereço a partir do CEP usando a API ViaCEP
  const buscarEnderecoPorCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // Requisição para a API
      const data = await response.json(); // Conversão da resposta para JSON

      if (data.erro) {
        // Verifica se o CEP é inválido
        Alert.alert('Erro', 'CEP não encontrado.');
        setEndereco('');
      } else {
        // Formata o endereço completo com base na resposta da API
        const enderecoCompleto = `${data.logradouro}, ${numeroResidencia}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        setEndereco(enderecoCompleto);
      }
    } catch (error) {
      // Exibe um alerta em caso de erro na busca do CEP
      Alert.alert('Erro', 'Não foi possível buscar o endereço.');
      console.error('Erro ao buscar o endereço:', error);
    }
  };

  // Função para gerenciar o cadastro do usuário
  const handleCadastro = async () => {
    if (senha !== confirmarSenha) {
      // Verifica se as senhas não coincidem
      Alert.alert('Erro', 'As senhas informadas não coincidem.');
      return;
    }

    if (!endereco || !numeroResidencia) {
      // Verifica se o endereço está incompleto
      Alert.alert('Erro', 'Por favor, preencha o endereço completo, incluindo o número da residência.');
      return;
    }

    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Formata o número de telefone com o prefixo do Brasil
      const telefoneCompleto = `+55${ddd}${telefone}`;

      // Monta os dados para salvar no Firestore
      const dadosCadastro = {
        nome,
        email,
        telefone: telefoneCompleto,
        dataNascimento: `${diaNascimento}-${mesNascimento}-${anoNascimento}`, // Formato DD-MM-YYYY
        endereco, // Inclui o endereço completo
        uid: user.uid, // Identificador único do usuário no Firebase
      };

      // Salva os dados no Firestore na coleção 'usuarios'
      await setDoc(doc(firestore, 'usuarios', user.uid), dadosCadastro);

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.replace('Login'); // Redireciona para a tela de login após o cadastro
    } catch (error) {
      // Exibe um alerta em caso de erro durante o cadastro
      console.error('Erro ao cadastrar usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar a conta.');
    }
  };

  // Interface da tela de cadastro
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* Campo de entrada para o nome */}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        {/* Campo de entrada para o e-mail */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {/* Campos para DDD e telefone */}
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
        {/* Campo para o CEP e busca automática do endereço */}
        <TextInput
          style={styles.input}
          placeholder="CEP"
          value={cep}
          onChangeText={(text) => {
            setCep(text);
            if (text.length === 8) {
              buscarEnderecoPorCep(text); // Busca o endereço automaticamente ao completar o CEP
            }
          }}
          keyboardType="numeric"
        />
        {/* Campos para o endereço e número da residência */}
        <View style={styles.pickerContainer}>
          <TextInput
            style={[styles.input, { width: '75%' }]}
            placeholder="Endereço"
            value={endereco}
            editable={false} // O campo de endereço é preenchido automaticamente
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
        {/* Campos para a data de nascimento */}
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
        {/* Campos para senha e confirmação */}
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
        {/* Botão para finalizar o cadastro */}
        <TouchableOpacity style={styles.submitButton} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
