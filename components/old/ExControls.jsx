import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";

const Controls = ({
  uri,
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
}) => {
  const [sound, setSound] = React.useState();
  const [playing, setPlaying] = useState(false);

  async function playSound(feed) {
    console.log("uri: ", feed);
    const { sound } = await Audio.Sound.createAsync({
      uri: "http://literecords.com:9998/listen.pls",
    });

    console.log("Loading Sound");
    setSound(sound);
    console.log("Playing Sound", playing);
    // await sound.playAsync().then(setPlaying(true));
  }

  async function pauseSound() {
    console.log("PAUSED Sound", playing);
    await sound.pauseAsync();
    // .then(setPlaying(false));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
        <IconMCI
          name="shuffle-variant"
          size={20}
          color="white"
          style={[styles.secondaryControl, shuffleOn ? [] : styles.off]}
        />
      </TouchableOpacity>
      <View style={{ width: 40 }} />
      <TouchableOpacity onPress={onBack}>
        <IconMCI name="skip-previous" size={40} style={styles.button} />
      </TouchableOpacity>
      <View style={{ width: 20 }} />
      {paused ? (
        <TouchableOpacity onPress={onPressPause}>
          <View style={styles.playButton}>
            <IconMCI
              name="pause-circle-outline"
              size={75}
              style={styles.button}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressPlay}>
          {/* <TouchableOpacity onPress={playSound(uri)}> */}
          <View style={styles.playButton}>
            <IconMCI
              name="play-circle-outline"
              size={75}
              style={styles.button}
              onPress={playSound(uri)}
            />
          </View>
        </TouchableOpacity>
      )}
      <View style={{ width: 20 }} />
      <TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
        <IconMCI name="skip-next" size={40} style={styles.button} />
      </TouchableOpacity>
      <View style={{ width: 40 }} />
      <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
        <IconMCI
          name="repeat-variant"
          size={20}
          color="white"
          style={[styles.secondaryControl, repeatOn ? [] : styles.off]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    // borderWidth: 1,
    // borderColor: "white",
    // borderRadius: 72 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryControl: {
    height: 18,
    width: 18,
    opacity: 0.3,
    color: "grey",
  },
  button: {
    color: "grey",
  },
  off: {
    opacity: 0.3,
  },
});
