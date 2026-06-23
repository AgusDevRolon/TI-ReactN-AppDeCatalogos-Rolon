import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function DetailScreen({ item, onNavigateBack, onDelete }) {
  
  // Función para mostrar la alerta nativa de confirmación
  const confirmDelete = () => {
    Alert.alert(
      "Eliminar elemento",
      `¿Estás seguro de que querés eliminar "${item.title}" de tu catálogo?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: () => onDelete(item.id) }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.coverImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinopsis / Descripción</Text>
          <Text style={styles.text}>{item.description || 'Sin descripción disponible.'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Reseña Personal</Text>
          <Text style={styles.text}>{item.review || 'Aún no has escrito una reseña.'}</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>Volver al Catálogo</Text>
        </TouchableOpacity>

        {/* NUEVO BOTÓN DE ELIMINAR */}
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.deleteButtonText}>🗑️ Eliminar del Catálogo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  coverImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#121212',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#e50914',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ccc',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15, // Reduje el margen para dar espacio al otro botón
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // ESTILOS DEL NUEVO BOTÓN
  deleteButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e50914',
    marginBottom: 40,
  },
  deleteButtonText: {
    color: '#e50914',
    fontWeight: 'bold',
    fontSize: 16,
  },
});