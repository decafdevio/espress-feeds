import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import feeds from "../data/feeds.json";
import Playlist from "./Playlist";

import IconAD from "react-native-vector-icons/AntDesign";

export default Stations = ({ navigation, route, onPress }) => {
  return (
    <SafeAreaView className="bg-slate-400 flex-1 -my-1.5">
      <View className="h-2"></View>
      <FlatList
        style={{ flex: 1 }}
        data={feeds}
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
      />
    </SafeAreaView>
  );
};

function Item({ item, onPress }) {
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
      className="flex-row mt-0.5 bg-slate-100"
      onPress={onPress}
    >
      <View className="flex-row p-3">
        <Image
          source={{ uri: item.albumart }}
          className="rounded"
          style={{
            width: 80,
            height: 80,
          }}
        />
        <View className="pl-3">
          <Text className="font-semibold text-lg">{item.title}</Text>
          <Text className="text-xs font-extralight capitalize">
            {genreFilter(item.genre)}
          </Text>
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
    </TouchableOpacity>
  );
}
