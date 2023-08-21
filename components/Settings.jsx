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
import IconF from "react-native-vector-icons/Fontisto";

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
      try {
        const response = await AsyncStorage.getItem("saved");
        const asyncPKey = JSON.parse(response);
        console.log("asyncPKey: ", JSON.parse(response));
        // let mList = null;
        // asyncPKey?.map((item) => {
        //   mList = mList + item.name + "\n";
        // });
        // mList ? Alert.alert(mList) : Alert.alert("No data");
      } catch (error) {
        console.error(error);
      }
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

  const DevGetFave = () => {
    const get = async () => {
      try {
        const response = await AsyncStorage.getItem("fave");
        const asyncFaves = JSON.parse(response);
        console.log("asyncFaves: ", JSON.parse(response));
        // let fList = null;
        // asyncFaves?.map((item) => {
        //   console.log(item);
        //   fList = fList + item.title + "\n";
        // });
        // fList ? Alert.alert(fList) : Alert.alert("No data");
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Button
        onPress={get}
        title="Favourite Storage"
        color="#0c4a6e"
        className="text-xs"
      />
    );
  };

  const DevClearFave = () => {
    const clear = async () => {
      try {
        await AsyncStorage.removeItem("fave");
        Alert.alert("Favourites cleared");
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <Button
        onPress={clear}
        title="Clear Favourite Storage"
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

  const DevGetAllKeys = () => {
    const all = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        console.log(allKeys);
      } catch (error) {
        console.error(error);
      }
    };
    const vals = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(allKeys);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        <Button
          onPress={all}
          title="All Keys"
          color="#0c4a6e"
          className="text-xs"
        />
        <Button
          onPress={vals}
          title="All Values"
          color="#0c4a6e"
          className="text-xs"
        />
      </>
    );
  };

  return (
    <SafeAreaView className="bg-slate-400 flex-1">
      <View className="bg-slate-100 p-3 w-screen mt-0.5">
        <Text className="text-base font-semibold">Playlist Options</Text>
        <View className="">
          <PlaylistListOnly />
          <PlaylistAutoPlay />
        </View>
      </View>

      <View className="bg-sky-100 p-3 w-screen mt-0.5">
        <Text className="text-base font-semibold">Developer Options</Text>
        <View className="">
          <DevGetData />
          <DevClearData />
          <DevGetFave />
          <DevClearFave />
          <DevGetAllKeys />
        </View>
      </View>

      <View className="bg-slate-100 p-3 w-screen mt-0.5">
        <Text className="text-base font-semibold">Support</Text>
        <View className="">
          <InfoBtn />
        </View>
      </View>

      <View className="flex p-5 items-center">
        <IconF name="coffeescript" size={25} color={"white"} />
        <Text className="flex-row">
          <Text className="text-lg font-light pl-1 text-slate-50">
            Espresso
          </Text>
          <Text className="text-lg font-semibold text-slate-50">Feeds</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
