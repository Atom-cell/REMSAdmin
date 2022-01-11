import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Icon, FAB } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AssignedTasks } from "../DB";
import DoneModal from "./DoneModal";

const EditTaskScreen = ({ navigation, route }) => {
  const [tName, setTName] = React.useState("");
  const [tDes, setTDes] = React.useState("");
  const [eName, setEName] = React.useState("");
  const [eID, setEID] = React.useState("");
  const [rate, setRate] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [obj, setObj] = React.useState({});
  const [modal, setModal] = React.useState(false);

  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const { obj } = route.params;
    setObj(obj);
    editTask();
  }, []);

  const getDataDB = () => {
    let arr = [];
    // getting tasks from DB
    AssignedTasks.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((v) => {
        arr.push({ _id: v.id, ...v.data() });
        setTasks([...arr]);
      });
    });
  };

  const hideModal = () => {
    setModal(false);
    navigation.navigate("ManageTasks");
  };
  const editTask = () => {
    setTName(obj.TaskName);
    setTDes(obj.TaskDescp);
    setEName(obj.empName);
    setEID(obj.empID);
    setRate(obj.Rate);
    setDate(obj.dueDate);
  };
  const saveEdit = () => {
    if (
      tName !== undefined &&
      tDes !== undefined &&
      eName !== undefined &&
      eID !== undefined &&
      rate !== undefined &&
      date !== undefined
    ) {
      AssignedTasks.doc(obj._id).update({
        TaskName: tName,
        TaskDescp: tDes,
        empName: eName,
        empID: eID,
        Rate: rate,
        dueDate: date,
      });

      // getDataDB();
      // if (tasks)
      setModal(true);
    }
  };
  return (
    <View style={styles.container}>
      {modal ? <DoneModal hideModal={hideModal} msg="Task Edited" /> : null}

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
        keyboardType="numeric"
        onChangeText={(v) => setEID(v)}
      />
      <Input
        placeholder="$ Rate"
        label="$ Rate"
        keyboardType="numeric"
        value={rate}
        onChangeText={(v) => setRate(v)}
      />
      <Input
        placeholder="Due Date"
        label="YYYY-MM-DD"
        value={date}
        keyboardType="numeric"
        onChangeText={(v) => setDate(v)}
      />
      <TouchableOpacity
        onPress={() => {
          saveEdit();
        }}
        style={styles.addbtn}
      >
        <Text style={styles.addtxt}>Edit Task</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.addbtn} onPress={() => editTask()}>
        <Text style={styles.addtxt}>Refresh</Text>
      </TouchableOpacity> */}

      <FAB
        style={styles.fab}
        visible={true}
        icon={{ name: "redo", color: "black" }}
        size="large"
        color="#F4BE2C"
        onPress={() => editTask()}
      />
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

  fab: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
});
