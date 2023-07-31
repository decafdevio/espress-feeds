import { View, Text, SafeAreaView } from "react-native";
import IconF from "react-native-vector-icons/Fontisto";

export default function Header() {
  return (
    <SafeAreaView>
      <View className="flex-row justify-center pb-2 items-center text-sky-900">
        <IconF name="coffeescript" size={15} />
        <Text className="text-lg font-light pl-1">Espresso</Text>
        <Text className="text-lg font-bold">Feeds</Text>
      </View>
    </SafeAreaView>
  );
}
