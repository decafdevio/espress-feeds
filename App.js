import React, { useState } from "react";
import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
//
import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import Station from "./components/station/Station";
import Stations from "./components/Stations";
import Saved from "./components/Saved";
import Search from "./components/Search";
import Settings from "./components/Settings";
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

  const StationsStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Stations"
        component={Stations}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Station" options={{ title: "" }}>
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
  );

  const SavedStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="WebPage" component={WebPage} />
    </Stack.Navigator>
  );

  const SearchStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" component={Search} />
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
  );

  const Splash = () => (
    <View className="bg-slate-500 h-screen p-3 flex items-center justify-center">
      <Text>`splash logo`</Text>
    </View>
  );

  return (
    <NavigationContainer>
      <Header />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        {/* <Tab.Screen name="splash" component={Splash} /> */}
        <Tab.Screen name="StationsStack" component={StationsStack} />
        <Tab.Screen name="SavedStack" component={SavedStack} />
        <Tab.Screen name="SearchStack" component={SearchStack} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
      <NaviBar props={fURI} />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
