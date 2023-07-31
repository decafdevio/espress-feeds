import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const AlbumArt = ({ imgUrl, onPress }) => {
  return (
    <View className="px-6 pt-4 pb-3 bg-slate-400">
      <TouchableOpacity onPress={onPress} className="flex left-[15%]">
        <Image style={styles.image} source={{ uri: imgUrl }} />
      </TouchableOpacity>
    </View>
  );
};

export default AlbumArt;

const { width } = Dimensions.get("window");
const imageSize = width - 150;

const styles = StyleSheet.create({
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 10,
  },
});
