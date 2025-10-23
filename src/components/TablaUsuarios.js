import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TablaUsuario = ({ usuarios, eliminarUsuario }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Usuario</Text>
        <Text style={styles.headerText}>Rol</Text>
        <Text style={styles.headerText}>Acciones</Text>
      </View>

      {usuarios.map((usuario) => (
        <View key={usuario.id} style={styles.row}>
          <Text style={styles.cell}>{usuario.Usuario}</Text>
          <Text style={styles.cell}>{usuario.rol || '—'}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => eliminarUsuario(usuario.id)}
          >
            <Text style={styles.deleteText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  header: { flexDirection: "row", backgroundColor: "#f0f0f0", padding: 10 },
  headerText: { flex: 1, fontWeight: "bold", textAlign: "center" },
  row: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  cell: { flex: 1, textAlign: "center" },
  deleteButton: { backgroundColor: "#ff4444", padding: 5, borderRadius: 5 },
  deleteText: { color: "white", textAlign: "center" },
});

export default TablaUsuario;