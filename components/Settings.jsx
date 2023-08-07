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
        className="text-xs"
      />
    );
  };

  const DevGetData = () => {
    const get = async () => {
      const asyncKeys = await AsyncStorage.getAllKeys(),
        result = await AsyncStorage.multiGet(asyncKeys),
        keyTitle = await AsyncStorage.getItem();
      let mList = "";

      result.map((item) => {
        mList = mList + item[1] + "\n";
      });
      mList !== "" ? Alert.alert(mList) : Alert.alert("No data");
    };
    return <Button onPress={get} title="Test Storage" className="text-xs" />;
  };

  const DevClearData = () => {
    const clear = async () => {
      const asyncKeys = await AsyncStorage.getAllKeys();

      try {
        if (asyncKeys.length > 0) {
          if (Platform.OS === "android") {
            await AsyncStorage.clear();
          } else {
            await AsyncStorage.multiRemove(asyncKeys);
          }
        }
        Alert.alert("Data cleared");
      } catch (error) {
        console.error(error);
      }
    };
    return <Button onPress={clear} title="Clear Storage" className="text-xs" />;
  };

  const PlaylistOpts = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    return (
      <>
        <Text className="text-base pl-2 pt-2">
          Only show stations with playlists
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          className="absolute right-0 mt-1"
        />
      </>
    );
  };

  return (
    <SafeAreaView className="bg-slate-400 flex-1">
      <View className="bg-slate-100 p-3 w-screen mt-0.5">
        <Text className="text-base">Playlist Options</Text>
        <View className="flex-row">
          <PlaylistOpts />
        </View>
      </View>

      <View className="bg-slate-100 p-3 w-screen mt-0.5">
        <Text className="text-base">Developer Links</Text>
        <View className="flex-row">
          <InfoBtn />
        </View>
      </View>

      <View className="bg-sky-100 p-3 w-screen mt-0.5">
        <Text className="text-base">Developer Options</Text>
        <View className="flex-row">
          <DevGetData />
          <DevClearData />
        </View>
      </View>

      {/* <View className="p-3 flex items-center">
        <InfoBtn />
      </View> */}
    </SafeAreaView>
  );
}
