import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AudioList from "../screens/AudioList";
import Player from "../screens/Player";
import PlayList from "../screens/PlayList";
const Tab = createBottomTabNavigator();
function AppNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AudioList"
        component={AudioList}
        options={{
          tabBarIcon: ({}) => {
            return (
              <MaterialCommunityIcons
                name="headset"
                size={24}
                color="#000000"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          tabBarIcon: ({}) => {
            return (
              <MaterialCommunityIcons name="disc" size={24} color="#000000" />
            );
          },
        }}
      />
      <Tab.Screen
        name="PlayList"
        component={PlayList}
        options={{
          tabBarIcon: ({}) => {
            return (
              <MaterialCommunityIcons
                name="playlist-music"
                size={24}
                color="#000000"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
