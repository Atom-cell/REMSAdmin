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
import { Icon } from "react-native-elements";
import TaskSeeModal from "./TaskSeeModal";
import DeleteModal from "./DeleteModal";

const ManageTasksScreen = ({ navigation }) => {
  const [tasks, setTasks] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [obj, setObj] = React.useState({});
  const [id, setID] = React.useState(0); //for deleting
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getDataDB();
    setTasks([]);
  }, []);

  const getDataDB = () => {
    setTasks([]);
    let arr = [];
    // getting tasks from DB
    AssignedTasks.where("Completed", "==", false).onSnapshot(
      (querySnapshot) => {
        querySnapshot.forEach((v) => {
          arr.push({ _id: v.id, ...v.data() });
          setTasks([...arr]);
        });
      }
    );
    setIsLoading(false);
  };

  const hideModal = () => {
    setModal(false);
  };

  const hideModal2 = (m) => {
    setModal2(false);
    if (m === "y") {
      AssignedTasks.doc(id).delete();
      getDataDB();
    }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator color="orange" size="large" />
          <Text style={{ alignSelf: "center" }}>Getting data....</Text>
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddTask")}
        style={styles.addbtn}
      >
        <Text style={styles.addtxt}>Add Task</Text>
      </TouchableOpacity>

      {modal ? <TaskSeeModal hideModal={hideModal} obj={obj} /> : null}
      {modal2 ? <DeleteModal hideModal={hideModal2} /> : null}

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
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setModal2(true);
                        setID(item.item._id);
                      }}
                    >
                      <Icon
                        name="trash-alt"
                        type="font-awesome-5"
                        size={20}
                        iconStyle={{ marginLeft: 10 }}
                      />
                    </TouchableOpacity>
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

export default ManageTasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
