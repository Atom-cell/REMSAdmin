import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AssignedTasks } from "../DB";
import TaskSeeModal from "./TaskSeeModal";

const Completed = ({ navigation }) => {
  const [backup, setBackup] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [today, setToday] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [obj, setObj] = React.useState({});
  const [id, setID] = React.useState(0); //for deleting
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getDataDB();
    setTasks([]);
  }, []);

  const getDataDB = () => {
    setIsLoading(true);
    let arr = [];
    // getting tasks from DB
    AssignedTasks.where("Completed", "==", true).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((v) => {
        if (v.data().Completed) arr.push({ _id: v.id, ...v.data() });
        setTasks([...arr]);
        setBackup([...arr]);
      });
    });
    setIsLoading(false);
  };

  const todayTasks = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (month > 12) month = 1;
    let year = date.getFullYear();
    let today = tasks.filter((v) => {
      v.date === `${year}-${month}-${day}`;
    });
    setTasks(today);
  };
  const hideModal = () => {
    setModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          onPress={() => setTasks(backup)}
          style={styles.addbtn}
        >
          <Text style={styles.addtxt}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => todayTasks()} style={styles.addbtn}>
          <Text style={styles.addtxt}>Today's Tasks</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomWidth: 1, margin: 5 }}></View>

      {modal ? <TaskSeeModal hideModal={hideModal} obj={obj} /> : null}

      <View>
        <FlatList
          refreshing={false}
          onRefresh={() => getDataDB()}
          data={tasks}
          renderItem={(item) => {
            return (
              <TouchableOpacity
                style={styles.itemsWrapper}
                onPress={() => {
                  setModal(true);
                  setObj(item.item);
                }}
                onLongPress={() =>
                  navigation.navigate("EditTask", { obj: item.item })
                }
              >
                <View style={styles.item}>
                  <View style={styles.itemLeft}>
                    <View style={styles.square}></View>
                    <Text style={styles.text}>{item.item.TaskName}</Text>
                    <Text style={{ fontSize: 15, marginLeft: 5 }}>
                      | {item.item.dueDate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
  },
  btnWrapper: {
    flexDirection: "row",
  },
  addbtn: {
    backgroundColor: "#F4BE2C",
    // width: "100%",
    padding: 13,
    marginBottom: 10,
    marginHorizontal: 13,
  },
  addtxt: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
  text: {
    maxWidth: "80%",
    fontSize: 17,
  },
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemsWrapper: {
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  itemLeft: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#F4BE2C",
    borderRadius: 5,
    opacity: 0.5,
    marginRight: 15,
  },
});
