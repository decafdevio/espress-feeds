import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Clipboard, // depreciated, community pkg needed
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetTime from "./GetTime";
import IconAD from "react-native-vector-icons/AntDesign";

export default function Playlist({ type, api, country, alias }) {
  const [plist, setPlist] = useState([]);

  // experimental 'heart' to save --
  const [itemIndex, setItemIndex] = useState(null);
  const [saveBtn, setSaveBtn] = useState({
    btnColor: "text-red-500",
    btnIcon: "heart",
  });

  const saveTrack = (index, item) => {
    setSaveBtn({
      btnColor: "text-red-500",
      btnIcon: "heart",
    });
    saveBtn.btnColor === "text-slate-400"
      ? setSaveBtn({
          btnColor: "text-red-500",
          btnIcon: "heart",
        })
      : setSaveBtn({
          btnColor: "text-slate-400",
          btnIcon: "hearto",
        });
    console.log("track saved: ", track, artist);
    setItemIndex(index);
    console.log("track: ", index, item);
  };
  // -->

  const address =
    api +
    country +
    alias +
    "/" +
    "playlist/0?tz=" +
    new Date().getTimezoneOffset() +
    "&rnd=" +
    Math.random();

  useEffect(() => {
    async function fetchAPI() {
      try {
        let res = await fetch(address);
        let data = await res.json();
        data.playlist =
          type == "list"
            ? data.playlist.slice(0, 10)
            : data.playlist.slice(0, 1);
        const dplist = await data.playlist;
        setPlist(() => GetTime(dplist));
        return plist;
      } catch (error) {
        if (error.includes("Parse error" || "Unhandled Promise"))
          console.error("parsing error: ", error);
        return;
      }
    }
    // refresh playlist
    setInterval(() => {
      fetchAPI();
    }, 10 * 1000);

    fetchAPI();
  }, []);

  const trackOpts = async (item, index) => {
    Alert.alert(item.name, "", [
      {
        text: "Copy",
        // onPress: () => Clipboard.setString(item.name),
        style: "default",
      },
      {
        text: "Save Track",
        onPress: async () => {
          try {
            // const ifSaveExists = await AsyncStorage.getItem("saved");
            const tempSave = await AsyncStorage.getItem("saved");
            const ifSaveExists = await tempSave;

            if (ifSaveExists) {
              let response = await AsyncStorage.getItem("saved");
              let parse = await JSON.parse(response);
              parse?.unshift(item);
              await AsyncStorage.setItem("saved", JSON.stringify(parse));
            } else {
              await AsyncStorage.setItem("saved", JSON.stringify([item]));
            }
          } catch (error) {
            console.error(error);
          }
        },
        style: "default",
      },
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

  const Item = ({ item, index }) => {
    if (type == "search") {
      return (
        <View className="w-screen">
          <View className="flex-row items-center">
            {/* <Text className="px-2 bg-slate-200 font-extrabold">Now</Text> */}
            <View className="-mt-0.5">
              <Text className="text-xs text-slate-500 overflow-ellipsis">
                <Text className="font-light">{item.name.split("-")[0]}-</Text>
                <Text className="font-semibold">{item.name.split("-")[1]}</Text>
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (type == "stations") {
      return (
        <View className="w-screen">
          <View className="flex-row items-center">
            {/* <Text className="px-2 bg-slate-200 font-extrabold">Now</Text> */}
            <View className="mt-0.5">
              <Text className="text-xs text-slate-500">
                <Text className="font-light">{item.name.split("-")[0]}-</Text>
                <Text className="font-semibold">{item.name.split("-")[1]}</Text>
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (type == "list") {
      return (
        <TouchableOpacity
          className="flex-row mt-0.5 py-2 bg-slate-200 w-fit"
          onLongPress={() => trackOpts(item, index)}
        >
          <View className="flex-row py-0.5 pl-2.5 items-center">
            {/* <Text className={`${saveBtn.btnColor} pr-1`}>
                  <IconAD name="hearto" size={20} />
                  <IconAD name={index === itemIndex && saveBtn.btnIcon} size={20} />
                </Text> */}
            <Text className="p-2 bg-slate-100 text-slate-500 font-light text-xs">
              {item.created}
            </Text>
            <View className="w-screen flex-col relative ml-2.5">
              <Text className="">{item.name.split("- ")[1]}</Text>
              <Text className="font-extralight text-xs mt-0.5">
                {item.name.split("-")[0]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      data={plist}
      renderItem={Item}
      keyExtractor={(item, index) => index.toString()}
      initialNumToRender={15}
    />
  );
}
