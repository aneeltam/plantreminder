import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const FavoritesScreen = ({ favorites, setFavorites }) => {
  const [timers, setTimers] = useState(new Map());
  const [paused, setPaused] = useState(new Map());

  const DEFAULT_COUNTDOWN_DAYS = 7;
  const EXTENDED_COUNTDOWN_DAYS = 14;
  const extendedIds = [8, 9, 10, 13];

  const favoritePlantsData = [
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

  const getInitialTime = (plantId) => {
    const countdownDays = extendedIds.includes(plantId) ? EXTENDED_COUNTDOWN_DAYS : DEFAULT_COUNTDOWN_DAYS;
    return countdownDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  };

  const handleUnfavorite = (plantId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Map(prevFavorites);
      newFavorites.delete(plantId);
      return newFavorites;
    });
    setTimers((prevTimers) => {
      const newTimers = new Map(prevTimers);
      newTimers.delete(plantId);
      return newTimers;
    });
    setPaused((prevPaused) => {
      const newPaused = new Map(prevPaused);
      newPaused.delete(plantId);
      return newPaused;
    });
  };

  const formatTime = (timeInMs) => {
    const days = Math.floor(timeInMs / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeInMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeInMs % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeInMs % (60 * 1000)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = new Map(prevTimers);
        favoritePlantsData.forEach((plant) => {
          if (favorites.has(plant.id)) {
            const timer = newTimers.get(plant.id);
            if (timer !== undefined) {
              const isPaused = paused.get(plant.id) || false;
              if (!isPaused) {
                const updatedTime = timer - 1000;
                if (updatedTime <= 0) {
                  newTimers.delete(plant.id);
                } else {
                  newTimers.set(plant.id, updatedTime);
                }
              }
            }
          }
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [favorites, paused]);

  const resetTimer = (plantId) => {
    const newRemainingTime = getInitialTime(plantId);
    setTimers((prevTimers) => {
      const newTimers = new Map(prevTimers);
      newTimers.set(plantId, newRemainingTime);
      return newTimers;
    });
    setPaused((prevPaused) => {
      const newPaused = new Map(prevPaused);
      newPaused.set(plantId, false);
      return newPaused;
    });
    setFavorites((prevFavorites) => {
      const newFavorites = new Map(prevFavorites);
      newFavorites.set(plantId, { addedAt: Date.now() });
      return newFavorites;
    });
  };

  const togglePause = (plantId) => {
    setPaused((prevPaused) => {
      const newPaused = new Map(prevPaused);
      newPaused.set(plantId, !prevPaused.get(plantId));
      return newPaused;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My watering schedule</Text>
      {favoritePlantsData
        .filter((plant) => favorites.has(plant.id))
        .map((plant) => {
          const timer = timers.get(plant.id);
          const remainingTime = timer !== undefined ? formatTime(timer) : 'Water!';
          const isPaused = paused.get(plant.id) || false;

          return (
            <View key={plant.id} style={styles.favoriteItem}>
              <Image source={plant.source} style={styles.plantImage} />
              <View style={styles.plantDetails}>
                <Text style={styles.plantName}>{plant.name}</Text>
                <Text style={styles.timerText}>{remainingTime}</Text>

                <View style={styles.timerControls}>
                  <TouchableOpacity
                    style={styles.timerButton}
                    onPress={() => togglePause(plant.id)}
                  >
                    <Text style={styles.timerButtonText}>{isPaused ? 'Start' : 'Stop'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.timerButton}
                    onPress={() => resetTimer(plant.id)}
                  >
                    <Text style={styles.timerButtonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.unfavoriteButton}
                onPress={() => handleUnfavorite(plant.id)}
              >
                <Text style={styles.unfavoriteText}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    width: '100%',
  },
  plantImage: {
    width: 95,
    height: 95,
    borderRadius: 5,
    marginRight: 10,
  },
  plantDetails: {
    flex: 1,
  },
  plantName: {
    fontSize: 25,
  },
  timerText: {
    fontSize: 16,
    marginVertical: 5,
  },
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerButton: {
    backgroundColor: '#a3b899',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  timerButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  unfavoriteButton: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 8,
  },
  unfavoriteText: {
    fontSize: 16,
  },
});

export default FavoritesScreen;
