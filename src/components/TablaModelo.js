import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

const TablaModelo = ({ modelos, eliminarModelo, editarModelo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Modelos</Text>
      
      <ScrollView horizontal>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Imagen</Text>
            <Text style={styles.headerText}>Color</Text>
            <Text style={styles.headerText}>Medida</Text>
            <Text style={styles.headerText}>Modelo</Text>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Acciones</Text>
          </View>

          {modelos.map((modelo) => (
            <View key={modelo.id} style={styles.row}>
              <View style={styles.imageCell}>
                {modelo.Imagen ? (
                  <Image source={{ uri: modelo.Imagen }} style={styles.cellImage} />
                ) : (
                  <Text style={styles.noImageText}>Sin imagen</Text>
                )}
              </View>
              <Text style={styles.cell}>{modelo.Color}</Text>
              <Text style={styles.cell}>{modelo.Medida}</Text>
              <Text style={styles.cell}>{modelo.Modelo}</Text>
              <Text style={styles.cell}>{modelo.Nombre}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editarModelo(modelo)}
                >
                  <Text style={styles.buttonText}>🖋️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => eliminarModelo(modelo.id)}
                >
                  <Text style={styles.buttonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  header: { flexDirection: "row", backgroundColor: "#f0f0f0", padding: 10 },
  headerText: { width: 100, fontWeight: "bold", textAlign: "center" },
  row: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc", alignItems: "center" },
  cell: { width: 100, textAlign: "center" },
  imageCell: { width: 100, alignItems: "center" },
  cellImage: { width: 60, height: 45, borderRadius: 5 },
  noImageText: { fontSize: 12, color: "#666", textAlign: "center" },
  actionButtons: { flexDirection: "row", width: 100, justifyContent: "space-around" },
  editButton: { backgroundColor: "#007bff", padding: 8, borderRadius: 5, width: 35, alignItems: "center" },
  deleteButton: { backgroundColor: "#ff4444", padding: 8, borderRadius: 5, width: 35, alignItems: "center" },
  buttonText: { fontSize: 16 },
});

export default TablaModelo;