import {
  View,
  Button,
  Alert,
  Platform,
  Text,
  Linking,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
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
        title="Developer Links"
        className="text-xs"
        // color="black"
      />
    );
  };

  const DevGetData = () => {
    const get = async () => {
      const asyncKeys = await AsyncStorage.getAllKeys(),
        result = await AsyncStorage.multiGet(asyncKeys);
      let mList = "";

      result.map((item) => {
        mList = mList + item[1] + "\n";
      });
      mList !== "" ? Alert.alert(mList) : Alert.alert("No data");
    };
    return (
      // <Button onPress={get} title="Get Storage" />
      <TouchableOpacity
        className="border-2 border-slate-400 h-8 px-4 items-center justify-center rounded-md mx-3 mt-3"
        onPress={get}
      >
        <Text className="font-semibold text-xs">Test Storage</Text>
      </TouchableOpacity>
    );
  };

  const DevCleardata = () => {
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
        Alert.alert("Data has been cleared");
      } catch (error) {
        console.error(error);
      }
    };
    return (
      // <Button className="bg-slate-50" onPress={clear} title="Empty Storage" />
      <TouchableOpacity
        className="border-2 border-slate-400 h-8 px-4 items-center justify-center rounded-md mx-3 mt-3"
        onPress={clear}
      >
        <Text className="font-semibold text-xs">Empty Storage</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View className="bg-slate-200 p-3 w-screen items-center">
        <Text className="text-base">Developer Options</Text>
        <View className="flex-row">
          <DevGetData />
          <DevCleardata />
        </View>
      </View>
      <View className="p-3 flex items-center">
        <InfoBtn />
      </View>
    </SafeAreaView>
  );
}
