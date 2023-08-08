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
  InteractionManager,
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
        const response = JSON.parse(await AsyncStorage.getItem("saved"));
        // console.log(response);
        setSaved(response);
        // const asyncKeys = await AsyncStorage.getAllKeys();
        // setSaved(await AsyncStorage.multiGet(asyncKeys));
      } catch (error) {
        console.error(error);
      }
    };
    get();
  }, [isFocused]);

  useEffect(() => {
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
    let artist = item.item.name.split("-")[0];
    let track = item.item.name.split("-")[1];
    let searchQ = (artist + track).replace(/[ ]+/g, "+");
    return (
      <TouchableOpacity
        className="flex-row mt-0.5 bg-slate-100 py-3"
        onLongPress={() => {
          removeItem(itemKey, item);
        }}
        delayLongPress={500}
      >
        <View className="pl-3">
          <Text className="text-xs"> {artist}</Text>
          <Text className="text-xs font-semibold">{track}</Text>
        </View>
        <View className="absolute flex-row right-3 top-4">
          <TouchableOpacity
            className="mx-1.5"
            onPress={() =>
              Linking.openURL(`https://open.spotify.com/search/${searchQ}`)
            }
          >
            <Text className="text-slate-400">
              <IconFA name="spotify" size={27} />
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
              <IconFA name="youtube-play" size={27} />
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView className="bg-slate-400 flex-1">
      <FlatList
        style={{ flex: 1 }}
        data={saved}
        renderItem={({ item }) => <Item item={item} />}
        // keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
}
