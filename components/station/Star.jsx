import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import IconAD from "react-native-vector-icons/AntDesign";

export default function Star() {
  const [favBtn, setFavBtn] = useState({
    btnColor: "text-slate-100",
    btnIcon: "staro",
  });
  return (
    <TouchableOpacity
      onPress={() =>
        favBtn.btnColor === "text-slate-100"
          ? setFavBtn({
              btnColor: "text-orange-300",
              btnIcon: "star",
            })
          : setFavBtn({
              btnColor: "text-slate-100",
              btnIcon: "staro",
            })
      }
    >
      <View id="fav" className={favBtn.btnColor}>
        <Text className={`p-5 ${favBtn.btnColor}`}>
          <IconAD name={favBtn.btnIcon} size={40} />
        </Text>
      </View>
    </TouchableOpacity>
  );
}
