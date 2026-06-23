import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import DetailScreen from '../screens/DetailScreen';

export default function App() {
  const [screen, setScreen] = useState('Home');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [catalog, setCatalog] = useState([
    {
      id: '1',
      title: 'The Witcher 3: Wild Hunt',
      category: 'Videojuego',
      description: 'Un RPG de mundo abierto basado en las novelas de Andrzej Sapkowski.',
      review: 'Una obra maestra absoluta, excelente narrativa.',
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400',
      isFavorite: true,
    },
    {
      id: '2',
      title: 'Project Zomboid',
      category: 'Videojuego',
      description: 'Simulador de supervivencia zombie hardcore.',
      review: 'Muy difícil pero extremadamente adictivo.',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400',
      isFavorite: false,
    }
  ]);

  const handleAddItem = (newItemData: any) => {
    const itemComplete = {
      id: Math.random().toString(),
      ...newItemData,
      isFavorite: false,
    };
    setCatalog([...catalog, itemComplete]);
  };

  const handleToggleFavorite = (id: string) => {
    setCatalog(prevCatalog => 
      prevCatalog.map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // NUEVA FUNCIÓN: Elimina el elemento filtrándolo fuera del arreglo
  const handleDeleteItem = (id: string) => {
    setCatalog(prevCatalog => prevCatalog.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {screen === 'Home' ? (
        <HomeScreen 
          catalog={catalog} 
          onToggleFavorite={handleToggleFavorite}
          onNavigateToCreate={() => setScreen('Create')}
          onViewDetail={(item: any) => {
            setSelectedItem(item);
            setScreen('Detail');
          }}
        />
      ) : screen === 'Create' ? (
        <CreateScreen 
          onAddItem={handleAddItem}
          onNavigateBack={() => setScreen('Home')}
        />
      ) : (
        <DetailScreen 
          item={selectedItem}
          onNavigateBack={() => {
            setSelectedItem(null);
            setScreen('Home');
          }}
          // NUEVA PROP: Pasamos la función de borrado y forzamos la vuelta al Home
          onDelete={(id: string) => {
            handleDeleteItem(id);
            setSelectedItem(null);
            setScreen('Home');
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});