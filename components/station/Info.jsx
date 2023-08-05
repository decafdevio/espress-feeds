import { View, TouchableOpacity, Text, Alert } from "react-native";
import IconF from "react-native-vector-icons/Feather";

export default Info = (title, desc) => (
  <TouchableOpacity
    onPress={() =>
      Alert.alert(
        "BBC Radio 1 Dance",
        "A British online-only radio stream, owned and operated by the BBC and run as a spin-off from Radio 1.", // dummy

        // title,
        // desc,
        {
          text: "Close",
          style: "cancel",
        }
      )
    }
    title="Info"
    color="black"
  >
    <View>
      <Text className="text-slate-100 p-5">
        <IconF name="info" size={40} />
      </Text>
    </View>
  </TouchableOpacity>
);
