import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import MediaCard from '../components/MediaCard';

export default function HomeScreen({ catalog, onToggleFavorite, onNavigateToCreate, onViewDetail }) {
  
  // Lógica para obtener ÚNICAMENTE los últimos 5 elementos añadidos
  // .slice(-5) toma los últimos 5 y .reverse() los muestra del más nuevo al más viejo
  const lastFiveItems = catalog.slice(-5).reverse();

  // Lógica para filtrar solo los elementos marcados como favoritos
  const favoriteItems = catalog.filter(item => item.isFavorite);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>NETCATÁLOGO</Text>

      {/* SECCIÓN 1: ÚLTIMOS AÑADIDOS (CARRUSEL HORIZONTAL) */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Últimos Añadidos</Text>
        {lastFiveItems.length === 0 ? (
          <Text style={styles.emptyText}>No hay elementos recientes.</Text>
        ) : (
          <FlatList 
            data={lastFiveItems}
            keyExtractor={(item) => `recent-${item.id}`}
            horizontal={true} // <-- CLAVE: Habilita el desplazamiento horizontal tipo Netflix
            showsHorizontalScrollIndicator={false} // Oculta la barra de scroll molesta
            renderItem={({ item }) => (
              <MediaCard item={item} onToggleFavorite={onToggleFavorite} onViewDetail={onViewDetail} horizontal={true} />
            )}
          />
        )}
      </View>

      {/* SECCIÓN 2: FAVORITOS (LISTA VERTICAL OPTIMIZADA) */}
      <View style={[styles.sectionContainer, { flex: 1 }]}>
        <Text style={styles.sectionTitle}>Mis Favoritos ❤️</Text>
        {favoriteItems.length === 0 ? (
          <Text style={styles.emptyText}>Aún no has añadido favoritos.</Text>
        ) : (
          <FlatList 
            data={favoriteItems}
            keyExtractor={(item) => `fav-${item.id}`}
            renderItem={({ item }) => (
              <MediaCard item={item} onToggleFavorite={onToggleFavorite} onViewDetail={onViewDetail} horizontal={false} />
            )}
          />
        )}
      </View>

      {/* BOTÓN FLOTANTE "+" PARA CREAR */}
      <TouchableOpacity style={styles.floatingButton} onPress={onNavigateToCreate}>
        <Text style={styles.floatingButtonText}>+ Crear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo general oscuro
    paddingTop: 40,
  },
  headerTitle: {
    color: '#e50914', // Rojo institucional de streaming
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    marginVertical: 15,
  },
  sectionContainer: {
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
    paddingVertical: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#e50914',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});