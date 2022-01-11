import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AssignedTasks } from "../DB";
import DoneModal from "./DoneModal";

const AddTaskScreen = ({ navigation }) => {
  const [tName, setTName] = React.useState("");
  const [tDes, setTDes] = React.useState("");
  const [eName, setEName] = React.useState("");
  const [eID, setEID] = React.useState("");
  const [rate, setRate] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [modal, setModal] = React.useState(false);

  const addTask = async () => {
    let newObj = {
      TaskName: tName,
      TaskDescp: tDes,
      Completed: false,
      PauseTime: "",
      Rate: rate,
      WorkTime: "",
      dueDate: date,
      date: "",
      empName: eName,
      empID: eID,
      Total: 0,
    };
    console.log(newObj);

    if (
      tName !== "" &&
      tDes !== "" &&
      eName !== "" &&
      eID !== "" &&
      rate !== 0 &&
      date !== ""
    ) {
      AssignedTasks.add(newObj);
      setModal(true);
    }
  };

  const hideModal = () => {
    setModal(false);
    navigation.navigate("ManageTasks");
  };
  return (
    <View style={styles.container}>
      {modal ? <DoneModal hideModal={hideModal} msg="Task Added" /> : null}
      <Input
        placeholder="Task Name"
        label="Task Name"
        onChangeText={(v) => setTName(v)}
      />
      <Input
        placeholder="Task Description"
        label="Task Description"
        onChangeText={(v) => setTDes(v)}
      />
      <Input
        placeholder="Employee Name"
        label="Employee Name"
        onChangeText={(v) => setEName(v)}
      />
      <Input
        placeholder="Employee ID"
        label="Employee ID"
        keyboardType="numeric"
        onChangeText={(v) => setEID(v)}
      />
      <Input
        placeholder="$ Rate"
        label="$ Rate"
        keyboardType="numeric"
        onChangeText={(v) => setRate(v)}
      />
      <Input
        placeholder="Due Date"
        label="YYYY-MM-DD"
        keyboardType="numeric"
        onChangeText={(v) => setDate(v)}
      />
      <TouchableOpacity
        onPress={() => {
          addTask();
        }}
        style={styles.addbtn}
      >
        <Text style={styles.addtxt}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 17,
  },
  addbtn: {
    backgroundColor: "#F4BE2C",
    width: "100%",
    padding: 13,
    marginBottom: 17,
  },
  addtxt: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
