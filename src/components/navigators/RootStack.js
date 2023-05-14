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

function HomeDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        options={{ title: "Home" }}
        name="HomeTabs"
        component={HomeTabs}
      />
    </Drawer.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color="#900" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="setting" size={24} color="#900" />
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
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeDrawer"
        component={HomeDrawer}
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
