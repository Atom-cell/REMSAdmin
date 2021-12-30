import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AssignedTasks } from "../DB";

const EditTaskScreen = ({ navigation, route }) => {
  const [tName, setTName] = React.useState("");
  const [tDes, setTDes] = React.useState("");
  const [eName, setEName] = React.useState("");
  const [eID, setEID] = React.useState("");
  const [rate, setRate] = React.useState();
  const [date, setDate] = React.useState("");
  const [obj, setObj] = React.useState({});

  React.useEffect(() => {
    const { obj } = route.params;
    setObj(obj);
    editTask();
  }, []);

  const editTask = () => {
    ///
    setTName(obj.TaskName);
    setTDes(obj.TaskDescp);
    setEName(obj.empName);
    setEID(obj.empID);
    setRate(obj.Rate);
    setDate(obj.dueDate);
  };
  const saveEdit = () => {
    AssignedTasks.doc(obj._id).update({ TaskName: tName });
    AssignedTasks.doc(obj._id).update({ TaskDescp: tDes });
    AssignedTasks.doc(obj._id).update({ empName: eName });
    AssignedTasks.doc(obj._id).update({ empID: eID });
    AssignedTasks.doc(obj._id).update({ Rate: rate });
    AssignedTasks.doc(obj._id).update({ dueDate: date });
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Task Name"
        label="Task Name"
        value={tName}
        onChangeText={(v) => setTName(v)}
      />
      <Input
        placeholder="Task Description"
        label="Task Description"
        value={tDes}
        onChangeText={(v) => setTDes(v)}
      />
      <Input
        placeholder="Employee Name"
        label="Employee Name"
        value={eName}
        onChangeText={(v) => setEName(v)}
      />
      <Input
        placeholder="Employee ID"
        label="Employee ID"
        value={eID}
        onChangeText={(v) => setEID(v)}
      />
      <Input
        placeholder="$ Rate"
        label="$ Rate"
        value={rate}
        onChangeText={(v) => setRate(v)}
      />
      <Input
        placeholder="Due Date"
        label="YYYY-MM-DD"
        value={date}
        onChangeText={(v) => setDate(v)}
      />
      <TouchableOpacity
        onPress={() => {
          saveEdit();
          navigation.navigate("ManageTasks");
        }}
        style={styles.addbtn}
      >
        <Text style={styles.addtxt}>Edit Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addbtn} onPress={() => editTask()}>
        <Text style={styles.addtxt}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditTaskScreen;

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
