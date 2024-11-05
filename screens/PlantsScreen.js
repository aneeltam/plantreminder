import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';

const PlantsScreen = ({ favorites, setFavorites }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const plantsData = [
    { id: 1, source: require('../assets/images/plant1.webp'), name: 'Monstera Plant' },
    { id: 2, source: require('../assets/images/plant2.webp'), name: 'Fiddle Leaf Fig' },
    { id: 3, source: require('../assets/images/plant3.jpg'), name: 'Pothos' },
    { id: 4, source: require('../assets/images/plant4.webp'), name: 'Areca Palm' },
    { id: 5, source: require('../assets/images/plant5.webp'), name: 'Schefflera Tree' },
    { id: 6, source: require('../assets/images/plant6.webp'), name: 'Calathea' },
    { id: 7, source: require('../assets/images/plant7.jpg'), name: 'Peace Lily' },
    { id: 8, source: require('../assets/images/plant8.webp'), name: 'Snake Plant' },
    { id: 9, source: require('../assets/images/plant9.webp'), name: 'Fernwood Mikado' },
    { id: 10, source: require('../assets/images/plant10.webp'), name: 'Ponytail Palm' },
    { id: 11, source: require('../assets/images/plant11.webp'), name: 'Peperomia Green' },
    { id: 12, source: require('../assets/images/plant12.webp'), name: 'Grape Ivy' },
    { id: 13, source: require('../assets/images/plant13.webp'), name: 'ZZ Plant' },
    { id: 14, source: require('../assets/images/plant14.webp'), name: 'Lucky Bamboo' },
    { id: 15, source: require('../assets/images/plant15.webp'), name: 'Spider Plant' },
    { id: 16, source: require('../assets/images/plant16.jpg'), name: 'Peperomia Plant' },
    { id: 17, source: require('../assets/images/plant17.webp'), name: 'Dracaena Kiwii' },
    { id: 18, source: require('../assets/images/plant18.webp'), name: 'Ficus Ruby' },
  ];

  const openModal = (plant) => {
    setSelectedPlant(plant);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPlant(null);
  };

  const addToFavorites = (plant) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Map(prevFavorites);
      newFavorites.set(plant.id, { ...plant, addedAt: Date.now() });
      return newFavorites;
    });
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Plant</Text>
      <View style={styles.imageContainer}>
        {plantsData.map((plant) => (
          <TouchableOpacity key={plant.id} onPress={() => openModal(plant)}>
            <Image
              source={plant.source}
              style={styles.plantImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          {selectedPlant && (
            <>
              <Image
                source={selectedPlant.source}
                style={styles.enlargedImage}
                resizeMode="contain"
              />
              <Text style={styles.plantName}>{selectedPlant.name}</Text>
              <Pressable
                style={styles.favoriteButton}
                onPress={() => addToFavorites(selectedPlant)}
              >
                <Text style={styles.favoriteText}>Add to Favorites</Text>
              </Pressable>
            </>
          )}
          <Pressable style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc',
    margin: 8,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  enlargedImage: {
    width: '90%',
    height: '50%',
    borderRadius: 8,
    marginBottom: 20,
  },
  plantName: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  favoriteButton: {
    backgroundColor: '#dde6d5',
    padding: 10,
    borderRadius: 5,
  },
  favoriteText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PlantsScreen;
