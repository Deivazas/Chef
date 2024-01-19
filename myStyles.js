import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  driverStyle: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
  },

  raceInfoStyle: {
    backgroundColor: 'yellow',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
  },

  simpleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  buttonPressable: {
    height: 50,
    width: 250,
    backgroundColor: 'yellow',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },

  smallButton: {
    backgroundColor: 'yellow',
    width: 50,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  driver1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
