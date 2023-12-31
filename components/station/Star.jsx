import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconAD from "react-native-vector-icons/AntDesign";

export default Star = (props) => {
  const [favBtn, setFavBtn] = useState({
    btnColor: "text-slate-100",
    btnIcon: "staro",
  });

  const onPress = async () => {
    try {
      const temp = await AsyncStorage.getItem("fave");
      const ifExists = await temp;

      if (favBtn.btnColor === "text-slate-100") {
        setFavBtn({
          btnColor: "text-orange-300",
          btnIcon: "star",
        });

        // if (ifExists) {
        console.log("props: ", props.props);
        console.log("ifExists: ", ifExists);
        let response = await AsyncStorage.getItem("fave");
        let parse = await JSON.parse(response);
        parse?.unshift(props.props);
        await AsyncStorage.setItem("fave", JSON.stringify(parse));
      } else {
        await AsyncStorage.setItem("fave", JSON.stringify([props.props]));
      }
      // } else {
      //   setFavBtn({
      //     btnColor: "text-slate-100",
      //     btnIcon: "staro",
      //   });
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <TouchableOpacity onPress={onPress}>
        <View id="fav" className={favBtn.btnColor}>
          <Text className={`p-5 ${favBtn.btnColor}`}>
            <IconAD name={favBtn.btnIcon} size={40} />
          </Text>
        </View>
      </TouchableOpacity> */}

      <View className="bg-orange-600 w-16 h-20">
        <TouchableOpacity
          onPress={onPress}
          className="flex-1 justify-center items-center"
        >
          <IconAD name="staro" size={20} color={"white"} />
          <Text className="pt-1 text-slate-50 text-xs">Favourite</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
