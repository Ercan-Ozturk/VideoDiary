import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Text } from "react-native";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });
  const [data, setData] = useState<string>("");
  const getData = async (name: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(name);
      setData(JSON.parse(jsonValue || ""));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getDataStr = async () => {
    try {
      const value = await AsyncStorage.getItem("my-key");
      if (value !== null) {
        // value previously stored
        setData(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  type VideoProps = { uri: string; name: string; description: string };

  //getData("test");
  getDataStr();
  return (
    <>
      <View style={styles.container}>
        <Text>Name</Text>
        <Text>{data}</Text>
        <Text>Description</Text>
      </View>

      <View style={styles.contentContainer}>
        <View></View>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
        <View style={styles.controlsContainer}>
          <Button
            title={isPlaying ? "Pause" : "Play"}
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
