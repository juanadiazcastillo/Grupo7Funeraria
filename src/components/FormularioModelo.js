import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import { db } from "../database/firebaseconfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';

const FormularioModelo = ({ cargarDatos }) => {
  const [color, setColor] = useState("");
  const [medida, setMedida] = useState("");
  const [modelo, setModelo] = useState("");
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos necesarios', 'Se necesitan permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const guardarModelo = async () => {
    if (color && medida && modelo && nombre) {
      try {
        await addDoc(collection(db, "Modelo"), {
          Color: color,
          Medida: medida,
          Modelo: modelo,
          Nombre: nombre,
          Imagen: imagen
        });
        setColor("");
        setMedida("");
        setModelo("");
        setNombre("");
        setImagen(null);
        cargarDatos();
      } catch (error) {
        console.error("Error al registrar modelo:", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Modelo</Text>

      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />

      <TextInput
        style={styles.input}
        placeholder="Medida"
        value={medida}
        onChangeText={setMedida}
      />

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
        <Text style={styles.imageButtonText}>📷 Seleccionar Imagen</Text>
      </TouchableOpacity>

      {imagen && (
        <Image source={{ uri: imagen }} style={styles.imagePreview} />
      )}

      <Button title="Guardar" onPress={guardarModelo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 10 },
  imageButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginBottom: 10 },
  imageButtonText: { color: "white", textAlign: "center", fontSize: 16 },
  imagePreview: { width: 200, height: 150, borderRadius: 5, marginBottom: 10 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
});

export default FormularioModelo;