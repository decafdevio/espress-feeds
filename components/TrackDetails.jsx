import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TrackDetails(props) {
  const data = props.data;
  return (
    <View className="bg-slate-300 px-7 py-3">
      <View className="self-center">
        <Text className="text-xl font-semibold">{data.name}</Text>
      </View>
      <View name="container" className="flex-row space-x-1 justify-around">
        <Text className="uppercase text-blue-50 font-medium">{data.genre}</Text>
      </View>
      <Text>{data.website}</Text>
    </View>
  );
}
