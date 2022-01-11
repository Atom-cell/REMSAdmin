import React, { useState } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export default function DoneModal({ hideModal, msg }) {
  const [isModalVisible, setModalVisible] = useState(true);

  const checkUser = () => {};
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={true} onBackdropPress={() => hideModal()}>
        <View style={styles.modal}>
          <View style={styles.top}></View>
          <View style={{ width: "90%" }}>
            <Text style={{ fontSize: 20, alignSelf: "center" }}>{msg}</Text>
          </View>

          <View style={styles.bottom}></View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    height: "13%",
    width: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: "#F4BE2C",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    height: "13%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#F4BE2C",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "20%",
  },
  txt: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});
