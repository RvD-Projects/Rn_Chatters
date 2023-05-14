import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../Home";
import Login from "../Login";
import { Theme } from "../../styles/theme";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

function Rootdrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={RootsTabs} />
      <Drawer.Screen name="Profile" component={RootsTabs} />
      <Drawer.Screen name="Settings" component={RootsTabs} />
      <Drawer.Screen name="Notifications" component={RootsTabs} />
    </Drawer.Navigator>
  );
}

function RootsTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" size={24} color="#900" />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color="#900" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Rootdrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function RootNavigation() {
  return (
    <NavigationContainer theme={Theme}>
      <RootStack />
    </NavigationContainer>
  );
}

export default RootNavigation;
