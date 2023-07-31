import React, { Component } from "react";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const TrackDetails = ({
  title,
  artist,
  onAddPress,
  onMorePress,
  onTitlePress,
  onArtistPress,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onAddPress}>
      <IconMCI
        name="cards-heart-outline"
        size={30}
        color="white"
        style={styles.button}
      />
    </TouchableOpacity>
    <View style={styles.detailsWrapper}>
      <Text style={styles.title} onPress={onTitlePress}>
        {title}
      </Text>
      <Text style={styles.artist} onPress={onArtistPress}>
        {artist}
      </Text>
    </View>
    <TouchableOpacity onPress={onMorePress}>
      <View>
        {/* <Image
          style={styles.moreButtonIcon}
          source={"../img/pending_FILL0_wght400_GRAD0_opsz48.svg"}
        /> */}
        <IconMCI name="youtube" size={30} color="white" style={styles.button} />
      </View>
    </TouchableOpacity>
  </View>
);

export default TrackDetails;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: "row",
    paddingLeft: 30,
    alignItems: "center",
    paddingRight: 30,
    paddingBottom: 24,
  },
  detailsWrapper: {
    justifyContent: "right",
    alignItems: "center",
    textAlign: "right",
    flex: 1,
    // marginLeft: -30,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  artist: {
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    opacity: 0.72,
  },
  moreButton: {
    borderColor: "rgb(255, 255, 255)",
    borderWidth: 2,
    opacity: 0.72,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  moreButtonIcon: {
    height: 17,
    width: 17,
  },
});
