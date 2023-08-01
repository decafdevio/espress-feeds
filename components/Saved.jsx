import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Clipboard,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconFA from "react-native-vector-icons/FontAwesome";

export default function Saved() {
  const [saved, setSaved] = useState("");
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const get = async () => {
      try {
        const asyncKeys = await AsyncStorage.getAllKeys();
        setSaved(await AsyncStorage.multiGet(asyncKeys));
        console.log(saved);
      } catch (error) {
        console.error(error);
      }
    };
    get();
  }, [isFocused]);

  useEffect(() => {
    console.log("refresh");
    setRefresh(false);
  }, [refresh]);

  const removeItem = async (key, item) => {
    await Alert.alert(item, "", [
      {
        text: "Copy",
        onPress: () => Clipboard.setString(item.name),
        style: "default",
      },
      {
        text: "Remove Track",
        onPress: async () => {
          await AsyncStorage.removeItem(key);
          await setRefresh(false);
        },
        style: "default",
      },
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

  function Item(item) {
    const itemKey = item.item[0];
    item = item.item[1].replace(/['"]+/g, "");
    let artist = item.split("-")[0];
    let track = item.split("-")[1];
    let searchQ = (artist + track).replace(/[ ]+/g, "+");

    return (
      <TouchableOpacity
        className="flex-row mt-1 bg-slate-100 rounded-lg py-3"
        // onPress={() => navigation.navigate("WebPage")}
        onLongPress={() => {
          removeItem(itemKey, item);
        }}
      >
        <View className="pl-3">
          {/* <Text className="font-bold text-xl">{item}</Text> */}
          <Text> {artist}</Text>
          <Text className="text-base font-semibold">{track}</Text>
        </View>
        <View className="absolute flex-row right-3 top-4">
          <TouchableOpacity
            className="mx-1.5"
            onPress={() =>
              Linking.openURL(`https://open.spotify.com/search/${searchQ}`)
            }
          >
            <Text className="text-slate-400">
              <IconFA name="spotify" size={30} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `https://youtube.com/results?search_query=${searchQ}`
              )
            }
          >
            <Text className="text-slate-400">
              <IconFA name="youtube-play" size={30} />
            </Text>
          </TouchableOpacity>
          {/* <Text className="font-semibold py-1">Now </Text> */}
          {/* <Text className="p-1 bg-slate-200 text-gray-800 rounded">
              "TEST"
            </Text> */}
        </View>
      </TouchableOpacity>
    );
    // }
  }

  return (
    <SafeAreaView className="bg-slate-400 flex-1">
      <View className="h-2"></View>
      <FlatList
        style={{ flex: 1 }}
        data={saved}
        renderItem={({ item }) => <Item item={item} />}
        // keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
}
