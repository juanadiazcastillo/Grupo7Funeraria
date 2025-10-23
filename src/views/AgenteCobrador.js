import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { db } from "../database/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioAgenteCobrador from "../Components/FormularioAgenteCobrador.js";
import TablaAgenteCobrador from "../Components/TablaAgenteCobrador.js";
import ModalEditar from "../Components/ModalEditar.js";

const AgenteCobrador = () => {
  const [agentes, setAgentes] = useState([]);
  const [agenteEditar, setAgenteEditar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Agente_Cobrador"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAgentes(data);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  const eliminarAgenteCobrador = async (id) => {
    try {
      await deleteDoc(doc(db, "Agente_Cobrador", id));
      cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const editarAgenteCobrador = (agente) => {
    setAgenteEditar(agente);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setAgenteEditar(null);
  };

  const agenteFields = [
    { key: 'Nombre', label: 'Nombre', type: 'text' },
    { key: 'Telefono', label: 'Teléfono', type: 'text', keyboardType: 'phone-pad' },
  ];

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <FormularioAgenteCobrador cargarDatos={cargarDatos} />
        <TablaAgenteCobrador 
          agentes={agentes} 
          eliminarAgenteCobrador={eliminarAgenteCobrador}
          editarAgenteCobrador={editarAgenteCobrador}
        />
      </ScrollView>

      <ModalEditar
        visible={modalVisible}
        onClose={cerrarModal}
        item={agenteEditar}
        collection="Agente_Cobrador"
        fields={agenteFields}
        onUpdate={cargarDatos}
        title="Editar Agente Cobrador"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 2.5, padding: 20 },
});

export default AgenteCobrador;