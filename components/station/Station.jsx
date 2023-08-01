import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import Info from "./Info";
import Star from "./Star";
import Playlist from "../Playlist";
import { useRoute } from "@react-navigation/native";

export default function Station({
  api,
  country,
  alias,
  streamURL,
  desc,
  playTrack,
}) {
  const route = useRoute();
  console.log(route.params.item.alias);

  const onPressPlay = () => {
    // let feedAudio;
    // if (streamURL) {
    //   feedAudio = streamURL;
    //   console.log("streamURL: ", streamURL);
    // } else {
    //   feedAudio = route.params.item.uri;
    // }
    const feedAudio = route.params.item.uri;
    const param2 = "second comment";
    playTrack(feedAudio, param2);
  };

  return (
    <>
      <View className="px-6 py-3 bg-slate-400 flex-row justify-center items-center">
        <Info title={route.params.item.name} desc={desc} />
        <TouchableOpacity onPress={onPressPlay} className="items-center">
          <Image
            style={styles.image}
            source={{ uri: route.params.item.albumart }}
          />
          <Text className="text-slate-100 uppercase font-light pt-3">
            Play <Text className="font-bold">{route.params.item.name}</Text>
          </Text>
        </TouchableOpacity>
        <Star />
      </View>
      <View className="mb-60">
        <Text>
          <Playlist
            type="list"
            api={api}
            country={country}
            alias={route.params.item.alias}
          />
        </Text>
      </View>
    </>
  );
}

const { width } = Dimensions.get("window");
const imageSize = width - 200;

const styles = StyleSheet.create({
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
  },
});
