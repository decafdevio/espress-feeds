import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import IconF from "react-native-vector-icons/Fontisto";
import IconMI from "react-native-vector-icons/MaterialIcons";

export default function Splash() {
  return (
    <SafeAreaView>
      <View>
        <View className="flex p-5 items-center">
          <IconF name="coffeescript" size={25} color={"#475569"} />
          <Text className="flex-row">
            <Text className="text-lg font-light pl-1 text-slate-600">
              Espresso
            </Text>
            <Text className="text-lg font-semibold text-slate-600">Feeds</Text>
          </Text>
          <Text className="text-xs pl-1 text-slate-400 -my-1">WELCOME</Text>
        </View>

        <GestureHandlerRootView>
          <Swipeable
            renderRightActions={() => (
              <View className="bg-green-700 w-16">
                <TouchableOpacity
                  onPress={() => console.log("deleted")}
                  className="flex-1 justify-center items-center"
                >
                  <IconF name="lightbulb" size={25} color="white" />
                  <Text className="pt-1 text-slate-50 text-xs">Thanks</Text>
                </TouchableOpacity>
              </View>
            )}
            //   overshootLeft={false}
            leftThreshold={20}
            friction={2}
          >
            <Pressable className="flex-row">
              <View className="justify-center">
                <IconMI name="swipe" size={40} color="grey" />
              </View>

              <View className="flex-row bg-slate-200">
                <View>
                  <Image
                    source={{
                      uri: "https://media.licdn.com/dms/image/C4E0BAQFJ-lVgJXKgfg/company-logo_100_100/0/1671134142992?e=1699488000&v=beta&t=93ahT-3P05olr-J1OSN4Kc97Wu8vJ7xhr2b-tWV0464",
                    }}
                    style={{
                      width: 70,
                      height: 70,
                    }}
                  />
                </View>
                <View className="flex-row py-1">
                  <View className="pl-3">
                    <Text className="text-base">LiteRECORDS Online</Text>
                    <View className="w-screen">
                      <View className="flex-row items-center">
                        {/* <Text className="px-2 bg-slate-200 font-extrabold">Now</Text> */}
                        <View className="mt-0.5">
                          <Text className="text-xs text-slate-500 overflow-clip">
                            <Text className="font-light">Enimen - </Text>
                            <Text className="font-semibold">Just Lose It</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          </Swipeable>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
}
