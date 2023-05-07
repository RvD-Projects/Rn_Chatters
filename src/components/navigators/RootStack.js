import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../Home";

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
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color="#900" />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Home} />
      <Tab.Screen name="Settings" component={Home} />
      <Tab.Screen name="Notifications" component={Home} />
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
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default RootNavigation;
