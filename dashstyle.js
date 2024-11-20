import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: '#000', // Fundo para cobrir toda a tela
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    zIndex: 10,
  },
  onlineButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  onlineText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  mapBox: {
    width: width * 0.9, // Largura: 90% da largura da tela
    height: height * 0.6, // Altura: 60% da altura da tela
    maxWidth: 600, // Largura máxima para telas grandes
    maxHeight: 400, // Altura máxima para telas grandes
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
};
