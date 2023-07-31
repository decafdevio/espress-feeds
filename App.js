import { Button, Alert, Linking } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
//
import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import Station from "./components/station/Station";
import Search from "./components/Search";
import Settings from "./components/Settings";
import Stations from "./components/Stations";
import Saved from "./components/Saved";
import WebPage from "./components/WebPage";
//
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const api = "https://onlineradiobox.com/json/",
  country = "uk/",
  alias = "bbcdance/";

export default function App() {
  const [fURI, setFUI] = useState("");
  const playTrack = (feedAudio) => {
    setFUI(feedAudio);
  };

  function StationsStack(navigation) {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Stations" component={Stations} />
          <Stack.Screen name="Station">
            {() => (
              <Station
                props={fURI}
                playTrack={playTrack}
                api={api}
                country={country}
                alias={alias}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </>
    );
  }

  function SavedStack(navigation) {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Saved" component={Saved} />
          <Stack.Screen name="WebPage" component={WebPage} />
        </Stack.Navigator>
      </>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Header />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        >
          <Tab.Screen name="StationsStack" component={StationsStack} />
          <Tab.Screen name="SavedStack" component={SavedStack} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
        <NaviBar props={fURI} />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
