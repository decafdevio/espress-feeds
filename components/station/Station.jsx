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
import { useEffect } from "react";
import { useState } from "react";

export default function Station({
  api,
  country,
  alias,
  streamURL,
  desc,
  playTrack,
}) {
  const route = useRoute();
  const [uri, setUri] = useState("");

  async function fetchStation(alias) {
    const widgetAPI = api + country + alias + "/widget/";
    if (alias) {
      try {
        let res = await fetch(widgetAPI);
        let data = await res.json();
        const stream = await data.streamURL;
        console.log("stream: ", stream);
        // setUri(stream);
        playTrack(stream);
        // return stream;
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }

  const onPressPlay = (uri) => {
    // let feedAudio;
    // if (streamURL) {
    //   feedAudio = streamURL;
    //   console.log("streamURL: ", streamURL);
    // } else {
    //   feedAudio = route.params.item.uri;
    // }
    const feedAudio = uri;
    console.log(feedAudio);

    playTrack(uri);
  };

  return (
    <>
      <View className="px-6 py-3 bg-slate-400 flex-row justify-center items-center">
        <Info title={route.params.item.title} desc={desc} />
        <TouchableOpacity
          onPress={() => fetchStation(route.params.item.alias)}
          className="items-center"
        >
          <Image
            style={styles.image}
            source={{ uri: route.params.item.albumart }}
          />
          <Text className="text-slate-100 uppercase font-light pt-3">
            Play <Text className="font-bold">{route.params.item.title}</Text>
          </Text>
        </TouchableOpacity>
        <Star />
      </View>
      <View className="mb-[230px]">
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
