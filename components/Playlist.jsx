import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Clipboard,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetTime from "./GetTime";
import IconAD from "react-native-vector-icons/AntDesign";

export default function Playlist({ type, api, country, alias }) {
  const [plist, setPlist] = useState([]);
  const [itemIndex, setItemIndex] = useState(null);
  const [saveBtn, setSaveBtn] = useState({
    btnColor: "text-red-500",
    btnIcon: "heart",
  });

  const address =
    api +
    country +
    alias +
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
          type !== "list"
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
    setInterval(() => {
      fetchAPI();
    }, 10 * 1000);

    fetchAPI();
  }, []);

  const saveTrack = (index, item) => {
    setSaveBtn({
      btnColor: "text-red-500",
      btnIcon: "heart",
    });
    // saveBtn.btnColor === "text-slate-400"
    //   ? setSaveBtn({
    //       btnColor: "text-red-500",
    //       btnIcon: "heart",
    //     })
    //   : setSaveBtn({
    //       btnColor: "text-slate-400",
    //       btnIcon: "hearto",
    //     });
    // console.log("track saved: ", track, artist)
    setItemIndex(index);
    // console.log("track: ", index, item);
  };

  const trackOpts = async (item, index) => {
    const asyncKeys = await AsyncStorage.getAllKeys();
    const count = asyncKeys.length;

    Alert.alert(item.name, "", [
      {
        text: "Copy",
        onPress: () => Clipboard.setString(item.name),
        style: "default",
      },
      {
        text: "Save Track",
        onPress: () =>
          AsyncStorage.setItem(`saved${count}`, JSON.stringify(item.name)),
        style: "default",
      },
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

  const Item = ({ item, index }) => (
    <TouchableOpacity
      className="flex-row mt-2 py-2 bg-slate-200 w-screen"
      onLongPress={() => trackOpts(item, index)}
      // onLongPress={() => saveTrack(index, item)}
    >
      <View className="flex-row py-1 pl-3 items-center">
        {/* <Text className={`${saveBtn.btnColor} pr-1`}>
          <IconAD name="hearto" size={20} />
          <IconAD name={index === itemIndex && saveBtn.btnIcon} size={20} />
        </Text> */}
        <Text className="px-2 bg-slate-200 font-extrabold">{item.created}</Text>
        <View className="w-fit flex-col relative">
          <Text> {item.name.split("-")[0]}</Text>
          <Text className="text-base font-semibold">
            {item.name.split("-")[1]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{ flex: 1 }}
      data={plist}
      renderItem={Item}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
