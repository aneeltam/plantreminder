import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';

const ContactScreen = () => {
  const openYouTube = () => {
    Linking.openURL('https://www.youtube.com');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.webp')}
        style={styles.logo}
      />

      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.content}>
        If you have any questions, feel free to reach out to us!
      </Text>
      
      <TouchableOpacity onPress={openYouTube} style={styles.linkButton}>
        <Text style={styles.linkText}>Visit our YouTube Channel</Text>
      </TouchableOpacity>

      <View style={styles.superWideBox}>
        <Image
          source={require('../assets/images/watering.webp')}
          style={styles.superWideImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
    marginTop: '15%',
    marginBottom: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  linkButton: {
    padding: 10,
    backgroundColor: '#a3b899',
    borderRadius: 5,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  superWideBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '40%',
  },
  superWideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
});

export default ContactScreen;
