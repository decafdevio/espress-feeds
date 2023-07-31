import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import feeds from "../data/feeds.json";

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
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
};

function Item({ item, onPress }) {
  return (
    <>
      <TouchableOpacity
        className="flex-row mt-1 bg-slate-100 rounded-lg"
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
            <Text className="font-bold text-xl">{item.name}</Text>
            <Text>{item.genre && "Genre: " + item.genre}</Text>
            <View className="flex-row">
              <Text className="font-semibold py-1">Now </Text>
              <Text className="p-1 bg-slate-200 text-gray-800 rounded">
                {item.website}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
