import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import IconAD from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";

export default function Saved() {
  const [saved, setSaved] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const get = async () => {
      try {
        const asyncKeys = await AsyncStorage.getAllKeys();
        setSaved(await AsyncStorage.multiGet(asyncKeys));
      } catch (error) {
        console.error(error);
      }
    };
    get();
  }, [isFocused]);

  function Item(item) {
    console.log(item.item[0]);

    item = item.item[1].replace(/['"]+/g, "");
    let artist = item.split("-")[0];
    let track = item.split("-")[1];
    let ytQ = (artist + track).replace(/[ ]+/g, "+");

    return (
      <TouchableOpacity
        className="flex-row mt-1 bg-slate-100 rounded-lg py-3"
        // onPress={() => navigation.navigate("WebPage")}
      >
        <View className="pl-3">
          {/* <Text className="font-bold text-xl">{item}</Text> */}
          <Text> {artist}</Text>
          <Text className="text-base font-semibold">{track}</Text>
        </View>
        <View className="absolute flex right-3 top-4">
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                `https://www.youtube.com/results?search_query=${ytQ}`
              )
            }
          >
            <Text className="text-slate-400">
              <IconAD name="youtube" size={30} />
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
