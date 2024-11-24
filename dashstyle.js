import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  zoomControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  zoomButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerButton: {
    position: 'absolute',
    bottom: 100,
    left: 150,
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 5,
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
    right: 185,
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
};
