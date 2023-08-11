import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from "react-native";
// import * as Clipboard from "expo-clipboard"; //! error
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import IconFA from "react-native-vector-icons/FontAwesome";
import IconMI from "react-native-vector-icons/MaterialIcons";

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
      <GestureHandlerRootView>
        <Swipeable
          renderLeftActions={() => (
            <View className="bg-red-700 w-16">
              <TouchableOpacity
                onPress={() =>
                  saved.map((track, index) => {
                    if (track.name == item.item.name) {
                      setSaved([
                        ...saved.slice(0, index),
                        ...saved.slice(index + 1),
                      ]);
                    }
                  })
                }
                className="flex-1 justify-center items-center"
              >
                <IconFA name="trash" size={25} color="white" />
                <Text className="pt-1 text-slate-50 text-xs">Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          renderRightActions={() => (
            <>
              <View className="bg-[#fd1000] w-16">
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://youtube.com/results?search_query=${searchYT}`
                    )
                  }
                  className="flex-1 justify-center items-center"
                >
                  <IconFA name="youtube-play" size={26} color="white" />
                  <Text className="pt-1 text-slate-50 text-xs">YouTube</Text>
                </TouchableOpacity>
              </View>
              <View className="bg-sky-700 w-16">
                <TouchableOpacity
                  onPress={() => console.log("copied!")}
                  className="flex-1 justify-center items-center"
                >
                  <IconFA name="copy" size={25} color="white" />
                  <Text className="pt-1 text-slate-50 text-xs">Copy</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          overshootRight={false}
          overshootLeft={false}
          leftThreshold={20}
          friction={2}
        >
          <Pressable
            className="flex-row bg-slate-200"
            onLongPress={() => {
              removeItem(item);
            }}
            delayLongPress={500}
          >
            <View>
              <Image
                source={{
                  uri: "https://media.licdn.com/dms/image/C4E0BAQFJ-lVgJXKgfg/company-logo_100_100/0/1671134142992?e=1699488000&v=beta&t=93ahT-3P05olr-J1OSN4Kc97Wu8vJ7xhr2b-tWV0464",
                }}
                // className="rounded"
                style={{
                  width: 70,
                  height: 70,
                }}
              />
            </View>
            <View className="pl-3 justify-center">
              <Text className="">{track}</Text>
              <Text className="font-extralight text-xs mt-0.5">{artist}</Text>
              <View className="flex-row pt-1">
                <IconMI name="update" size={16} color="grey" />
                <Text className="text-xs font-light text-slate-400">
                  10/07/23 - 17:34
                </Text>
              </View>
            </View>
            <View className="absolute right-0 bottom-5">
              <IconMI name="navigate-before" size={30} color="lightgrey" />
            </View>
          </Pressable>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }

  return (
    <SafeAreaView className="bg-slate-50 flex-1">
      <FlatList
        style={{ flex: 1 }}
        data={saved}
        className="mt-0.5"
        renderItem={({ item }) => <Item item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      />
    </SafeAreaView>
  );
}
