import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  Linking,
  SafeAreaView,
  FlatList,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";
import Playlist from "./Playlist";
import IconMI from "react-native-vector-icons/MaterialIcons";

export default Search = ({ navigation, route, onPress }) => {
  const [stationList, setStationList] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [countryCode, setCountryCode] = useState("uk/");

  const api = "https://onlineradiobox.com/json/";
  const address = api + countryCode;

  useEffect(() => {
    async function fetchAPI() {
      try {
        let res = await fetch(address);
        let data = await res.json();
        const tmpList = await data.stations;
        // await setStationList(tmpList.slice(0, 50));
        await setStationList(tmpList);
        return stationList;
      } catch (error) {
        console.error(error);
        return;
      }
    }
    fetchAPI();
  }, []);

  useEffect(() => {}, [searchFilter]);

  async function fetchStation(alias) {
    const widgetAPI = api + countryCode + alias + "/widget/";
    if (alias) {
      try {
        let res = await fetch(widgetAPI);
        let data = await res.json();
        const stream = await data.streamURL;
        // console.log("stream: ", stream);
        return stream;
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }

  const textListener = async (e) => {
    e = e.toLowerCase();
    if (e.length >= 3) {
      setSearchFilter(
        stationList.filter(
          (i) => i.title.toLowerCase().includes(e) || i.genres?.includes(e)
        )
      );
      console.log(searchFilter);
    } else {
      setSearchFilter([]);
    }
  };

  function Item({ item, onPress }) {
    // const stream = fetchStation(item.alias);

    const genreFilter = (genreList) => {
      let genres = null;

      for (let i = 0; i < genreList.length; i++) {
        genres
          ? (genres = genres + ", " + genreList[i])
          : (genres = genreList[i]);
      }
      return genres;
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <TouchableOpacity
          className="flex-row mt-0.5 px-1 bg-slate-100"
          onPress={onPress}
        >
          <View className="flex-row p-1">
            <View className="pl-1">
              <View className="flex-row mb-1.5">
                <Text className="font-semibold">{item.title}</Text>
                <Text className="pl-2 font-extralight">- {item.cityName}</Text>
              </View>
              <View className="">
                <Text>
                  <Playlist
                    type="search"
                    api="https://onlineradiobox.com/json/"
                    country="uk/"
                    alias={item.alias}
                  />
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <SafeAreaView className="bg-slate-400 flex-1 -my-1.5">
      <View className="py-4 flex items-center bg-slate-500">
        <TextInput
          onChangeText={(e) => textListener(e)}
          placeholder="Search Station / Genre"
          placeholderTextColor={"whitesmoke"}
          className="text-lg min-w-full text-center"
          style={{ color: "white" }}
          selectionColor={"white"}
        />
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={searchFilter}
        onEndReachedThreshold={0.9}
        keyboardShouldPersistTaps="always"
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
        keyExtractor={(item) => item.alias}
        initialNumToRender={15}
      />
      <View className="h-1.5"></View>
    </SafeAreaView>
  );
};
