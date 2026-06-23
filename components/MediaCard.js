import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// Recibe el ítem (datos del medio) y las funciones para interactuar
export default function MediaCard({ item, onToggleFavorite, onViewDetail, horizontal = false }) {

  return (
    // Si es horizontal (tipo Netflix), aplica un estilo de tarjeta más angosto
    <TouchableOpacity style={[styles.cardContainer, horizontal ? styles.horizontalCard : styles.verticalCard]}
    onPress={()=> onViewDetail(item)}
    >
      
      {/* Portada del elemento */}
      <Image source={{ uri: item.imageUrl }} style={styles.coverImage} />
      
      {/* Detalles del elemento */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        
        {/* Botón para agregar/quitar de favoritos */}
        <TouchableOpacity 
          style={[styles.favButton, item.isFavorite ? styles.isFav : styles.notFav]} 
          onPress={() => onToggleFavorite(item.id)}
        >
          <Text style={styles.favButtonText}>
            {item.isFavorite ? '❤️ Favorito' : '🤍 Añadir'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1e1e1e', // Fondo oscuro tipo streaming
    borderWidth: 1,
    borderColor: '#333',
  },
  horizontalCard: {
    width: 140,
    marginRight: 15,
  },
  verticalCard: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
  },
  coverImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  // Ajuste de imagen cuando la tarjeta es vertical (lista de abajo)
  stylesVerticalImage: {
    width: 90,
    height: 130,
    borderRadius: 8,
  },
  detailsContainer: {
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  category: {
    color: '#aaa',
    fontSize: 11,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  rating: {
    color: '#ffcc00',
    fontSize: 12,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  favButton: {
    paddingVertical: 5,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },
  isFav: {
    backgroundColor: '#e50914', // Rojo Netflix
  },
  notFav: {
    backgroundColor: '#444',
  },
  favButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});