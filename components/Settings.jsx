import {
  View,
  Button,
  Alert,
  Platform,
  Text,
  Linking,
  SafeAreaView,
  Switch,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const InfoBtn = () => {
    return (
      <Button
        onPress={() =>
          Alert.alert(
            "EspressoFeeds",
            "Developed by DecafDevIO \n https://decafdevio.github.io",
            [
              {
                text: "Visit",
                onPress: () => Linking.openURL("https://github.com/decafdevio"),
                style: "default",
              },
              {
                text: "Close",
                style: "cancel",
              },
            ]
          )
        }
        title="GitHub"
        color="#0c4a6e"
        className="text-xs"
      />
    );
  };

  const DevGetData = () => {
    const get = async () => {
      const response = await AsyncStorage.getItem("saved");
      const asyncPKey = JSON.parse(response);

      let mList = "";
      asyncPKey?.map((item) => {
        mList = mList + item.name + "\n";
      });
      mList ? Alert.alert(mList) : Alert.alert("No data");
    };

    return (
      <Button
        onPress={get}
        title="Playlist Storage"
        color="#0c4a6e"
        className="text-xs"
      />
    );
  };

  const DevClearData = () => {
    const clear = async () => {
      try {
        await AsyncStorage.removeItem("saved");
        Alert.alert("Playlist cleared");
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <Button
        onPress={clear}
        title="Clear Playlist Storage"
        color="#0c4a6e"
        className="text-xs"
      />
    );
  };

  const PlaylistListOnly = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    return (
      <View className="pl-2 pt-2 w-screen">
        <Text className="text-base">Show only stations with playlists</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#94a3b8" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          className="absolute right-0 mt-1 mr-5"
        />
      </View>
    );
  };

  const PlaylistAutoPlay = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    return (
      <View className="pl-2 pt-2 w-screen">
        <Text className="text-base">Auto play station on load</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#94a3b8" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          className="absolute right-0 mt-1 mr-5"
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-slate-400 flex-1">
      <View className="bg-slate-100 p-3 w-screen mt-0.5">
        <Text className="text-base">Playlist Options</Text>
        <View className="flex">
          <PlaylistListOnly />
          <PlaylistAutoPlay />
        </View>
      </View>

      <View className="bg-sky-100 p-3 w-screen mt-0.5">
        <Text className="text-base">Developer Options</Text>
        <View className="flex-row">
          <DevGetData />
          <DevClearData />
        </View>
      </View>

      <View className="bg-slate-100 p-3 w-screen mt-0.5">
        <Text className="text-base">Support Developer</Text>
        <View className="flex-row">
          <InfoBtn />
        </View>
      </View>
    </SafeAreaView>
  );
}
