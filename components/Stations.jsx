import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { RadioBrowserApi } from "radio-browser-api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Playlist from "./Playlist";
import IconAD from "react-native-vector-icons/AntDesign";
import IconFA from "react-native-vector-icons/FontAwesome";

// import feeds from "../data/feeds.json";

export default Stations = ({ navigation, route, onPress }) => {
  const [saved, setSaved] = useState("");
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("box");
  const isFocused = useIsFocused();

  useEffect(() => {
    const get = async () => {
      try {
        const response = await JSON.parse(await AsyncStorage.getItem("fave"));
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
        const response = await JSON.parse(await AsyncStorage.getItem("fave"));
        response !== null &&
          (await AsyncStorage.setItem("fave", JSON.stringify(saved)));
      } catch (error) {
        console.error(error);
      }
    };
    save();
  }, [saved]);

  function Item({ item, onPress }) {
    //! BUG | API - Get station logo <--
    const [val, setVal] = useState("");
    useEffect(() => {
      const setupApi = async () => {
        const api = new RadioBrowserApi("Espresso Feeds");
        const res = await api.searchStations({
          name: "bbc radio 3",
          limit: 1,
          countryCode: "GB",
        });
        let aArt;
        if (res.length > 0) {
          aArt = JSON.stringify(res[0].favicon);
        } else {
          aArt =
            "https://www.pngitem.com/pimgs/m/35-350426_profile-icon-png-default-profile-picture-png-transparent.png";
        }
        setVal(aArt);
        // console.log(aArt);
      };
      setupApi();
    }, []);
    //! -->

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderLeftActions={() => (
            <View className="bg-red-700 w-16">
              <TouchableOpacity
                onPress={() => console.log("deleted")}
                className="flex-1 justify-center items-center"
              >
                <IconFA name="trash" size={25} color="white" />
                <Text className="pt-1 text-slate-50 text-xs">Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          overshootLeft={false}
          leftThreshold={20}
          friction={2}
        >
          <Pressable className="flex-row bg-slate-100" onPress={onPress}>
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
            <View className="flex-row py-1">
              {/* <Image
                source={{ uri: val }}
                className="rounded"
                style={{
                  width: 80,
                  height: 80,
                }}
              /> */}
              <View className="pl-3">
                <Text className="text-base">{item.title}</Text>
                <View className="flex-row">
                  <Playlist
                    type="stations"
                    api="https://onlineradiobox.com/json/"
                    country="uk/"
                    alias={`${item?.alias}`}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }

  return (
    <SafeAreaView className="bg-slate-400 flex-1 relative">
      <FlatList
        data={saved}
        className="mt-0.5"
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={() =>
              navigation.navigate("Station", {
                item,
              })
            }
          />
        )}
        keyExtractor={(item) => item.title}
        renderQuickActions={({ index, item }) => QuickActions(index, item)}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      />
    </SafeAreaView>
  );
};
