import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SignOutScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/images/logo.webp')} style={styles.logo} />
      <Text>You have been logged out.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: -100,
    marginBottom: '10%',
  },
},
);

export default SignOutScreen;
