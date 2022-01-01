import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Emps } from "../DB";
import { AssignedTasks } from "../DB";
import { DataTable } from "react-native-paper";
import CompletedModal from "./CompletedModal";

const EmpsListScreen = ({ navigation }) => {
  const [emp, setEmp] = React.useState([]);
  const [ewList, setEWList] = React.useState([]); //employees tasks table join info
  const [modal, setModal] = React.useState(false);
  const [obj, setObj] = React.useState({});

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 10,
            marginRight: 20,
            backgroundColor: "white",
            borderRadius: 30,
          }}
          onPress={() => {
            getEmps();
            join();
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700" }}>Refresh</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    getEmps();
    join();
  }, []);

  const hideModal = () => {
    setModal(false);
  };
  const getEmps = () => {
    let emps = [];

    Emps.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((v) => {
        emps.push(v.data());
        setEmp([...emps]);
      });
    });
    join();
  };

  const join = () => {
    let a = [];
    emp.forEach((v) => {
      AssignedTasks.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((val) => {
          if (val.data().empID == v.empID) a.push(val.data());
          setEWList([...a]);
        });
      });
    });
  };

  return (
    <View>
      {modal ? <CompletedModal hideModal={hideModal} obj={obj} /> : null}

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>EMP. ID</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Tasks</DataTable.Title>
          <DataTable.Title numeric>$</DataTable.Title>
          <DataTable.Title numeric>Status</DataTable.Title>
        </DataTable.Header>

        {ewList ? (
          <FlatList
            data={ewList}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  style={styles.itemsWrapper}
                  onPress={() => {
                    setModal(true);
                    setObj(item.item);
                  }}
                >
                  <DataTable.Row>
                    <DataTable.Cell>{item.item.empID}</DataTable.Cell>
                    <DataTable.Cell>{item.item.empName}</DataTable.Cell>
                    <DataTable.Cell>{item.item.TaskName}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.item.Total}</DataTable.Cell>
                    {item.item.Completed ? (
                      <DataTable.Cell numeric>✔</DataTable.Cell>
                    ) : (
                      <DataTable.Cell numeric>❌</DataTable.Cell>
                    )}
                  </DataTable.Row>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : null}
      </DataTable>
    </View>
  );
};

export default EmpsListScreen;

const styles = StyleSheet.create({});
