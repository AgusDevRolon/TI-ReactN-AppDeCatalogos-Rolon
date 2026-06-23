import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

export default function CreateScreen({ onAddItem, onNavigateBack }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Película');
  const [description, setDescription] = useState('');
  const [review, setReview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(5); 

  const handleAutoFetch = async () => {
    if (!title.trim()) {
      Alert.alert('Atención', 'Por favor, introduce el nombre de la obra primero.');
      return;
    }

    setIsLoading(true);

    try {
      if (category === 'Videojuego') {
        const gameUrl = `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(title)}`;
        const gameResponse = await fetch(gameUrl);
        const gameData = await gameResponse.json();

        if (gameData && gameData.length > 0) {
          const firstGame = gameData[0];
          setDescription(`Juego encontrado en la base de datos de CheapShark. (Nombre original: ${firstGame.external})`);
          setImageUrl(firstGame.thumb || 'https://via.placeholder.com/400x600?text=Sin+Portada');
          Alert.alert('¡Éxito!', 'Juego encontrado y autocompletado desde CheapShark.');
        } else {
          Alert.alert('Sin resultados', 'No se encontró ningún videojuego con ese nombre.');
        }
        setIsLoading(false);
        return; 
      }

      const API_KEY = '4073df069aaf4849f2938aa6c03e2771';
      const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(title)}&api_key=${API_KEY}&language=es-ES`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        const overview = firstResult.overview || 'No hay sinopsis disponible en español para esta obra.';
        const posterPath = firstResult.poster_path;
        const fullImageUrl = posterPath 
          ? `https://image.tmdb.org/t/p/w500${posterPath}` 
          : 'https://via.placeholder.com/400x600?text=Sin+Portada';

        setDescription(overview);
        setImageUrl(fullImageUrl);
        
        Alert.alert('¡Éxito!', 'Datos encontrados y autocompletados correctamente desde TMDB.');
      } else {
        Alert.alert('Sin resultados', 'No se encontró ninguna película o serie con ese nombre en la base de datos.');
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al intentar conectar con los servidores.');
    } finally {
      setIsLoading(false); 
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !review.trim()) {
      Alert.alert('Error', 'El título y tu reseña personal son obligatorios.');
      return;
    }

    onAddItem({
      title,
      category,
      description,
      review,
      rating, 
      imageUrl: imageUrl || 'https://via.placeholder.com/150',
    });

    Alert.alert('Guardado', 'Elemento añadido con éxito al catálogo.');
    onNavigateBack(); 
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleHeader}>Añadir al Catálogo</Text>

      <Text style={styles.label}>Tipo de Multimedia</Text>
      <View style={styles.pickerContainer}>
        {['Videojuego', 'Película', 'Serie'].map((cat) => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.pickerButton, category === cat && styles.pickerActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={styles.pickerText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Nombre de la Obra</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ej: Interstellar, Breaking Bad, The Witcher..." 
        placeholderTextColor="#666"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.autoButton} onPress={handleAutoFetch} disabled={isLoading}>
        <Text style={styles.autoButtonText}>
          {isLoading ? 'Buscando datos en la red...' : '✨ Autocompletar portada y descripción'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Descripción / Sinopsis</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        multiline
        editable={false} 
        placeholder="Se rellenará automáticamente al buscar..." 
        placeholderTextColor="#444"
        value={description}
      />

      <Text style={styles.label}>Calificación</Text>
      <View style={styles.pickerContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            style={[styles.pickerButton, rating === star && styles.pickerActive]}
            onPress={() => setRating(star)}
          >
            <Text style={styles.pickerText}>{star} ⭐</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Tu Reseña Personal</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        multiline
        placeholder="¿Qué te pareció? Deja tus comentarios aquí..." 
        placeholderTextColor="#666"
        value={review}
        onChangeText={setReview}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Guardar en mi Lista</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onNavigateBack}>
        <Text style={styles.cancelButtonText}>Volver Atrás</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    paddingTop: 40,
  },
  titleHeader: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerButton: {
    flex: 1,
    backgroundColor: '#222',
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  pickerActive: {
    backgroundColor: '#e50914',
    borderColor: '#e50914',
  },
  pickerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  autoButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  autoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#e50914',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  cancelButtonText: {
    color: '#aaa',
  },
});