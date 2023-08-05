import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default AlbumArt = ({ imgUrl, onPress }) => (
  <View className="px-6 pt-4 pb-3 bg-slate-400">
    <TouchableOpacity onPress={onPress} className="flex left-[15%]">
      <Image style={styles.image} source={{ uri: imgUrl }} />
    </TouchableOpacity>
  </View>
);

const { width } = Dimensions.get("window");
const imageSize = width - 150;

const styles = StyleSheet.create({
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
  },
});
