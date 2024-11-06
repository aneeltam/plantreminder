import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/backgroundimage.webp')}
          style={styles.fullWidthImage}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Welcome to the Plant Reminder App</Text>
          <Text style={styles.additionalText}>Start adding plants to your watering schedule!</Text>
        </View>
      </View>

      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.box}>
          <Image
            source={require('../assets/images/monsteraimage2.webp')}
            style={styles.boxImage}
          />
          <View style={styles.boxOverlay}>
            <Text style={styles.boxText}>Monstera Thai Constellation</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Image
            source={require('../assets/images/monsteraimage.webp')}
            style={styles.boxImage}
          />
          <View style={styles.boxOverlay}>
            <Text style={styles.boxText}>Monstera Deliciosa</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box}>
          <Image
            source={require('../assets/images/monsteraimage3.webp')}
            style={styles.boxImage}
          />
          <View style={styles.boxOverlay}>
            <Text style={styles.boxText}>Monstera Pinnatipartita</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.superWideBox}>
        <Image
          source={require('../assets/images/plantcare.webp')}
          style={styles.superWideImage}
        />
        <View style={styles.superWideBoxOverlay}>
          <Text style={styles.superWideBoxText}>Prepare your plants for the winter</Text>
        </View>
      </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 350,
  },
  fullWidthImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  overlayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  additionalText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  box: {
    width: '30%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative',
    borderRadius: 8,
  },
  boxImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  boxOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 8,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  superWideBox: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative',
  },
  superWideImage: {
    width: '100%',
    height: '100%',
  },
  superWideBoxOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  superWideBoxText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingVertical: 16,
  },  
});

export default HomeScreen;
