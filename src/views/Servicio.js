import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { db } from "../database/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioServicio from "../Components/FormularioServicio.js";
import TablaServicio from "../Components/TablaServicio.js";
import ModalEditar from "../Components/ModalEditar.js";

const Servicio = () => {
  const [servicios, setServicios] = useState([]);
  const [servicioEditar, setServicioEditar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Servicio"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServicios(data);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  const eliminarServicio = async (id) => {
    try {
      await deleteDoc(doc(db, "Servicio", id));
      cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const editarServicio = (servicio) => {
    setServicioEditar(servicio);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setServicioEditar(null);
  };

  const servicioFields = [
    { key: 'Nombre', label: 'Nombre', type: 'text' },
    { key: 'Monto', label: 'Monto', type: 'text', keyboardType: 'numeric' },
    { key: 'Imagen', label: 'Imagen', type: 'image' },
  ];

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <FormularioServicio cargarDatos={cargarDatos} />
        <TablaServicio 
          servicios={servicios} 
          eliminarServicio={eliminarServicio}
          editarServicio={editarServicio}
        />
      </ScrollView>

      <ModalEditar
        visible={modalVisible}
        onClose={cerrarModal}
        item={servicioEditar}
        collection="Servicio"
        fields={servicioFields}
        onUpdate={cargarDatos}
        title="Editar Servicio"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#f6f8fa' },
});

export default Servicio;