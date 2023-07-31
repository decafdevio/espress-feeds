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
        await setStationList(tmpList);
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
    const stream = fetchStation(item.alias);
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
          <View className="pl-3">
            <Text className="font-bold text-lg">{item.title}</Text>
            {/* <Text>{item.genre && "Genre: " + item.genre}</Text> */}
            <Text>{item.cityName}</Text>
            <View className="flex-row">
              {/* <Text className="font-semibold py-1">Now </Text>
                  <Text className="p-1 bg-slate-200 text-gray-800 rounded">
                    {item.website}
                  </Text> */}
            </View>
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
        <View className="h-2"></View>
        <FlatList
          style={{ flex: 1 }}
          data={stationList}
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
      </SafeAreaView>
    </>
  );
};
