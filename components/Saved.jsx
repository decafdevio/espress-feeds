import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";
// import * as Clipboard from "expo-clipboard"; //! error
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconFA from "react-native-vector-icons/FontAwesome";

export default function Saved() {
  const [saved, setSaved] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const get = async () => {
      try {
        const response = JSON.parse(await AsyncStorage.getItem("saved"));
        setSaved(response);
      } catch (error) {
        console.error(error);
      }
    };
    get();
  }, [isFocused]);

  useEffect(() => {
    const save = async () => {
      try {
        const response = JSON.parse(await AsyncStorage.getItem("saved"));
        response !== null &&
          (await AsyncStorage.setItem("saved", JSON.stringify(saved)));
      } catch (error) {
        console.error(error);
      }
    };
    save();
  }, [saved]);

  const removeItem = async (item) => {
    Alert.alert(item.item.name, "", [
      {
        text: "Copy",
        onPress: async () => await Clipboard.setStringAsync(item.name),
        style: "default",
      },
      {
        text: "Remove",
        onPress: async () => {
          saved.map((track, index) => {
            if (track.name == item.item.name) {
              setSaved([...saved.slice(0, index), ...saved.slice(index + 1)]);
            }
          });
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
    let artist = item.item.name.split(" - ")[0];
    let track = item.item.name.split(" - ")[1];
    let searchYT = (artist + "+" + track).replace(/[&]+/g, "+");
    let searchSP = (artist + "+" + track).replace(/[ ]+/g, "%20");
    return (
      <TouchableOpacity
        className="flex-row mt-0.5 bg-slate-100 py-3"
        onLongPress={() => {
          removeItem(item);
        }}
        delayLongPress={500}
      >
        <View className="pl-3">
          <Text className="text-xs">{artist}</Text>
          <Text className="text-xs font-semibold">{track}</Text>
        </View>
        <View className="absolute flex-row right-3 top-4">
          <TouchableOpacity
            className="mx-1.5"
            onPress={() =>
              Linking.openURL(`https://open.spotify.com/search/${searchSP}`)
            }
          >
            <Text className="text-slate-400">
              <IconFA name="spotify" size={27} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `https://youtube.com/results?search_query=${searchYT}`
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
      />
    </SafeAreaView>
  );
}
