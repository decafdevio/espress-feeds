import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  Linking,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import Playlist from "./Playlist";

export default Search = ({ navigation, route, onPress }) => {
  const [stationList, setStationList] = useState([]);
  const [countryCode, setCountryCode] = useState("uk/");

  const api = "https://onlineradiobox.com/json/";
  const address = api + countryCode;

  useEffect(() => {
    async function fetchAPI() {
      try {
        let res = await fetch(address);
        let data = await res.json();
        const tmpList = await data.stations;
        await setStationList(tmpList.slice(0, 15));
        // console.log(stationList);
        return stationList;
      } catch (error) {
        console.error(error);
        return;
      }
    }
    fetchAPI();
  }, []);

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
      <TouchableOpacity
        className="flex-row mt-1 bg-slate-100 rounded-lg"
        onPress={onPress}
      >
        <View className="flex-row p-3">
          {/* <Image
                source={{ uri: item.albumart }}
                className="rounded"
                style={{
                  width: 80,
                  height: 80,
                }}
              /> */}
          <View className="pl-2">
            <Text>
              <Text className="font-bold text-lg">{item.title}</Text>
              <Text className="pl-2 font-extralight"> - {item.cityName}</Text>
            </Text>
            <View className="flex-row">
              <Text>
                <Playlist
                  type="search"
                  api="https://onlineradiobox.com/json/"
                  country="uk/"
                  alias={`${item.alias}/`}
                />
              </Text>
            </View>
            {/* <Text className="mt-1 text-xs font-extralight">
              {genreFilter(item.genres)}
            </Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View className="px-6 py-3 flex justify-center">
        <Text>Search Criteria</Text>
        <TouchableOpacity className="bg-slate-400 p-2 rounded-lg">
          <Text className="text-slate-100 font-bold">UK</Text>
        </TouchableOpacity>
        {/* <Button title="UK" color="#841584" className="bg-slate-400" /> */}
      </View>

      <SafeAreaView className="bg-slate-400 flex-1 -my-1.5">
        <FlatList
          style={{ flex: 1 }}
          data={stationList}
          onEndReachedThreshold={0.9}
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
        />
        <View className="h-3.5"></View>
      </SafeAreaView>
    </>
  );
};
