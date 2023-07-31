import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
// import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

export default function WebPage() {
  console.log();
  return (
    <>
      <View>
        <Text>YOUTUBE</Text>
        <View className="bg-slate-500 flex-1">
          <YoutubePlayer height={300} play={true} videoId={"84WIaK3bl_s"} />
          {/* <WebView
            source={{ uri: "https://youtube.com" }}
          /> */}
        </View>
      </View>
    </>
  );
}
