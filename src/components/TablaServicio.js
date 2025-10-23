import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const TablaServicio = ({ servicios, eliminarServicio, editarServicio }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gestión de Servicios</Text>
      {servicios.map((servicio) => (
        <View key={servicio.id} style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.imageWrap}>
              {servicio.Imagen ? (
                <Image source={{ uri: servicio.Imagen }} style={styles.image} />
              ) : (
                <View style={styles.placeholder}><Text style={styles.noImageText}>Sin imagen</Text></View>
              )}
            </View>
            <View style={styles.infoWrap}>
              <Text style={styles.cardTitle}>{servicio.Nombre}</Text>
              <Text style={styles.cardPrice}>C$ {servicio.Monto}</Text>
            </View>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.editButton} onPress={() => editarServicio(servicio)}>
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarServicio(servicio.id)}>
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8 },
  titulo: { fontSize: 20, fontWeight: "700", marginBottom: 16, color: '#12323b' },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#e3e8ee', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cardRow: { flexDirection: "row", alignItems: 'center', marginBottom: 8 },
  imageWrap: { width: 64, height: 64, borderRadius: 12, overflow: 'hidden', marginRight: 16, backgroundColor: '#eaf0f6', alignItems: 'center', justifyContent: 'center' },
  image: { width: 64, height: 64 },
  placeholder: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  noImageText: { fontSize: 13, color: '#999' },
  infoWrap: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#12323b' },
  cardPrice: { marginTop: 6, fontWeight: '700', color: '#1e90ff', fontSize: 15 },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  editButton: { backgroundColor: '#1e90ff', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8, marginRight: 8 },
  editButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  deleteButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ff4444', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 8 },
  deleteButtonText: { color: '#ff4444', fontWeight: '700', fontSize: 15 },
});

export default TablaServicio;