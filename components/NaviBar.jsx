import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import IconAD from "react-native-vector-icons/AntDesign";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
const track = new Audio.Sound();

export default function NaviBar({ props }) {
  const navigation = useNavigation();
  const [button, setButton] = useState("play-circle-outline");

  useEffect(() => {
    if (props) {
      propsUpdate();
    }
  }, [props]);

  async function propsUpdate() {
    try {
      // disconnect
      await track.unloadAsync();
      setButton("dots-horizontal");
      // load feed
      await track.loadAsync({
        uri: props,
      });
      // connect
      track.playAsync();
      setButton("stop-circle-outline");
    } catch (error) {
      console.error(error);
      setButton("alert-circle-outline");
      setTimeout(() => {
        setButton("play-circle-outline");
      }, 2 * 1000);
    }
  }

  async function playAudio() {
    try {
      if (button == "play-circle-outline") {
        // load feed
        setButton("dots-horizontal");
        await track.loadAsync({
          uri: props,
        });
        // connect
        track.playAsync();
        setButton("stop-circle-outline");
      } else {
        // disconnect
        await track.stopAsync();
        track.unloadAsync();
        setButton("play-circle-outline");
      }
    } catch (error) {
      console.log(error);
      setButton("alert-circle-outline");
      setTimeout(() => {
        setButton("play-circle-outline");
      }, 2 * 1000);
    }
  }

  return (
    <SafeAreaView>
      <View className="flex-row justify-around pt-3">
        {/* NAV 1 */}
        <TouchableOpacity onPress={() => navigation.navigate("StationsStack")}>
          <View className="items-center">
            <IconAD name="staro" size={25} color="#0c4a6e" />
            <Text className="text-sky-900 text-xs p-1">Stations</Text>
          </View>
        </TouchableOpacity>
        {/* NAV 2 */}
        <TouchableOpacity onPress={() => navigation.navigate("SavedStack")}>
          <View className="items-center my-[2px]">
            <IconAD name="hearto" size={23} color="#0c4a6e" />
            <Text className="text-sky-900 text-xs p-1">Saved</Text>
          </View>
        </TouchableOpacity>
        {/* NAV PLAYER */}
        <TouchableOpacity
          onPress={() => {
            playAudio();
          }}
        >
          <View className="rounded-xl bg-sky-900 border-1 border-white px-2 py-2 -my-5">
            <IconMCI
              name={button}
              size={50}
              color="whitesmoke"
              onPress={() => {
                playAudio();
              }}
            />
          </View>
        </TouchableOpacity>
        {/* NAV 3 */}
        <TouchableOpacity onPress={() => navigation.navigate("SearchStack")}>
          <View className="items-center">
            <IconAD name="search1" size={25} color="#0c4a6e" />
            <Text className="text-sky-900 text-xs p-1">Search</Text>
          </View>
        </TouchableOpacity>
        {/* NAV 4 */}
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <View className="items-center">
            <IconAD name="setting" size={25} color="#0c4a6e" />
            <Text className="text-sky-900 text-xs p-1">Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
