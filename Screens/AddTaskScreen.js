import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AssignedTasks } from "../DB";

const AddTaskScreen = ({ navigation }) => {
  const [tName, setTName] = React.useState("");
  const [tDes, setTDes] = React.useState("");
  const [eName, setEName] = React.useState("");
  const [eID, setEID] = React.useState("");
  const [rate, setRate] = React.useState();
  const [date, setDate] = React.useState("");

  const addTask = () => {
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

    AssignedTasks.add(newObj);
  };
  return (
    <View style={styles.container}>
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
        onChangeText={(v) => setEID(v)}
      />
      <Input
        placeholder="$ Rate"
        label="$ Rate"
        onChangeText={(v) => setRate(v)}
      />
      <Input
        placeholder="Due Date"
        label="YYYY-MM-DD"
        onChangeText={(v) => setDate(v)}
      />
      <TouchableOpacity
        onPress={() => {
          addTask();
          navigation.navigate("ManageTasks");
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
