import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { db } from "../database/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioModelo from "../Components/FormularioModelo.js";
import TablaModelo from "../Components/TablaModelo.js";
import ModalEditar from "../Components/ModalEditar.js";

const Modelo = () => {
  const [modelos, setModelos] = useState([]);
  const [modeloEditar, setModeloEditar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Modelo"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModelos(data);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  const eliminarModelo = async (id) => {
    try {
      await deleteDoc(doc(db, "Modelo", id));
      cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const editarModelo = (modelo) => {
    setModeloEditar(modelo);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setModeloEditar(null);
  };

  const modeloFields = [
    { key: 'Color', label: 'Color', type: 'text' },
    { key: 'Medida', label: 'Medida', type: 'text' },
    { key: 'Modelo', label: 'Modelo', type: 'text' },
    { key: 'Nombre', label: 'Nombre', type: 'text' },
    { key: 'Imagen', label: 'Imagen', type: 'image' },
  ];

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <FormularioModelo cargarDatos={cargarDatos} />
        <TablaModelo 
          modelos={modelos} 
          eliminarModelo={eliminarModelo}
          editarModelo={editarModelo}
        />
      </ScrollView>

      <ModalEditar
        visible={modalVisible}
        onClose={cerrarModal}
        item={modeloEditar}
        collection="Modelo"
        fields={modeloFields}
        onUpdate={cargarDatos}
        title="Editar Modelo"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 2.5, padding: 20 },
});

export default Modelo;