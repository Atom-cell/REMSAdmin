import "react-native-gesture-handler";
import * as React from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Avatar, Icon } from "react-native-elements";
import { MenuProvider } from "react-native-popup-menu";

import ManageTasksScreen from "./Screens/ManageTasksScreen";
import AddTaskScreen from "./Screens/AddTaskScreen";
import EditTaskScreen from "./Screens/EditTaskScreen";
import Completed from "./Screens/CompletedTaskScreen";
const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ marginTop: 15, marginLeft: 15, alignSelf: "center" }}>
          <Avatar
            size={93}
            rounded
            source={{
              uri: "https://uifaces.co/our-content/donated/6MWH9Xi_.jpg",
            }}
            onPress={() => alert("edit")}
          />
        </View>
        <Text
          style={{
            color: "black",
            fontSize: 23,
            padding: 15,
            alignSelf: "center",
          }}
        >
          John Doe
        </Text>
        <View style={{ flex: 1, marginTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "black",
        }}
      >
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>LOG OUT</Text>
          <Icon
            name="sign-out-alt"
            type="font-awesome-5"
            size={20}
            iconStyle={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const TasksStack = () => {
  return (
    <MenuProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="ManageTasks" component={ManageTasksScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
        {/* <Stack.Screen name="Completed" component={TaskCompleted} />  */}
      </Stack.Navigator>
    </MenuProvider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#F4BE2C",
            // width: 240,
          },
          drawerLabelStyle: {
            fontSize: 17,
          },
          headerStyle: {
            backgroundColor: "#F4BE2C",
          },
          drawerActiveBackgroundColor: "#F7CD2E",
          drawerActiveTintColor: "#fff",
          drawerInactiveColor: "#333",
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name="Manage Tasks" component={TasksStack} />
        <Drawer.Screen name="Completed Tasks" component={Completed} />

        {/* <Drawer.Screen name="Attendence" component={Attendence} />
        <Drawer.Screen name="Tasks" component={TasksStack} />
        <Drawer.Screen
          name="Time"
          component={Time}
          options={{
            title: "Time Tracking",
          }}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
