import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { db } from "../database/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioUsuario = ({ cargarDatos }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("Cliente");

  const guardarUsuario = async () => {
    if (usuario && contrasena) {
      try {
        await addDoc(collection(db, "Usuario"), {
          Usuario: usuario,
          Contrasena: contrasena,
          rol: rol
        });
        setUsuario("");
        setContrasena("");
        setRol("Cliente");
        cargarDatos();
      } catch (error) {
        console.error("Error al registrar usuario:", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />

      <View style={styles.roleRow}>
        <Text style={{ marginRight: 8 }}>Rol:</Text>
        <TouchableOpacity style={[styles.roleOption, rol === 'Administrador' && styles.roleActive]} onPress={() => setRol('Administrador')}>
          <Text>Administrador</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleOption, rol === 'Cliente' && styles.roleActive]} onPress={() => setRol('Cliente')}>
          <Text>Cliente</Text>
        </TouchableOpacity>
      </View>

      <Button title="Guardar" onPress={guardarUsuario} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 10 },
  roleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  roleOption: { padding: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginRight: 8 },
  roleActive: { backgroundColor: '#e6f0f8', borderColor: '#3b6' },
});

export default FormularioUsuario;