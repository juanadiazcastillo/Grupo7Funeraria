import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TablaAgenteCobrador = ({ agentes, eliminarAgenteCobrador, editarAgenteCobrador }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Agentes Cobradores</Text>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Nombre</Text>
        <Text style={styles.headerText}>Teléfono</Text>
        <Text style={styles.headerText}>Acciones</Text>
      </View>

      {agentes.map((agente) => (
        <View key={agente.id} style={styles.row}>
          <Text style={styles.cell}>{agente.Nombre}</Text>
          <Text style={styles.cell}>{agente.Telefono}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => editarAgenteCobrador(agente)}
            >
              <Text style={styles.buttonText}>🖋️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarAgenteCobrador(agente.id)}
            >
              <Text style={styles.buttonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
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
  row: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc", alignItems: "center" },
  cell: { flex: 1, textAlign: "center" },
  actionButtons: { flexDirection: "row", flex: 1, justifyContent: "space-around" },
  editButton: { backgroundColor: "#007bff", padding: 8, borderRadius: 5, width: 35, alignItems: "center" },
  deleteButton: { backgroundColor: "#ff4444", padding: 8, borderRadius: 5, width: 35, alignItems: "center" },
  buttonText: { fontSize: 16 },
});

export default TablaAgenteCobrador;