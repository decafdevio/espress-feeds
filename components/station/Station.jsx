import {
  View,
  TouchableOpacity,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import Info from "./Info";
import Star from "./Star";
import Playlist from "../Playlist";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import IconAD from "react-native-vector-icons/AntDesign";

export default function Station({
  api,
  country,
  alias,
  streamURL,
  desc,
  playTrack,
}) {
  const route = useRoute();

  async function fetchStation(alias) {
    const widgetAPI = api + country + alias + "/widget/";
    if (alias) {
      try {
        let res = await fetch(widgetAPI);
        let data = await res.json();
        const stream = await data.streamURL;
        console.log("stream: ", stream);
        playTrack(stream);
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }

  return (
    <>
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={() => (
            <View>
              <View className="bg-sky-600 w-16 h-20">
                <TouchableOpacity
                  // onPress={() =>
                  //   Linking.openURL(
                  //     `https://youtube.com/results?search_query=${searchYT}`
                  //   )
                  // }
                  className="flex-1 justify-center items-center"
                >
                  <IconAD name="sharealt" size={20} color={"white"} />
                  <Text className="pt-1 text-slate-50 text-xs">Share</Text>
                </TouchableOpacity>
              </View>
              <Star props={route.params.item} />
            </View>
          )}
          overshootRight={false}
          friction={2}
        >
          <View className="bg-slate-400 flex-row h-fit">
            {/* <Info title={route.params.item.title} desc={desc} /> */}
            <Pressable
              onPress={() => fetchStation(route.params.item.alias)}
              className="items-center"
            >
              <Image
                className="w-screen h-44"
                source={{
                  uri: "https://www.wifispark.com/hubfs/Blog%20images%20%281%29.png",
                }}
              />
              <View className="-mt-12">
                <View className="bg-slate-900 h-7 opacity-40 rounded-md"></View>
                <Text className="text-slate-100 uppercase font-light -mt-8 p-2.5">
                  Play{" "}
                  <Text className="font-bold">{route.params.item.title}</Text>
                </Text>
              </View>
            </Pressable>
            {/* <Star props={route.params.item} /> */}
          </View>
        </Swipeable>
      </GestureHandlerRootView>

      <View className="mb-[162px] pt-0.5">
        <Text>
          <Playlist
            type="list"
            api={api}
            country={country}
            alias={route.params.item.alias}
          />
        </Text>
      </View>
    </>
  );
}
