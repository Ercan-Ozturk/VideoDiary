import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEvent } from "expo";
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { Text } from "react-native";
import "../global.css";
import { verifyInstallation } from "nativewind";
const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function VideoScreen() {
  const [data, setData] = useState<string>("");
  const [videoData, setVideoData] = useState<string>("");
  const getData = async (name: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(name);
      setData(JSON.parse(jsonValue || ""));
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getDataStr = async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name);
      const v2 = await AsyncStorage.getItem(name + "uri");
      if (value !== null && v2 != null) {
        // value previously stored
        setData(value);
        setVideoData(v2);
      }
    } catch (e) {
      // error reading value
    }
  };
  type VideoProps = { uri: string; name: string; description: string };

  //getData("test");
  const { about } = useLocalSearchParams<{ about: string }>();
  if (about != null) {
    getDataStr(about);
  }

  const player = useVideoPlayer(videoData, (player) => {
    player.play();
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });
  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text className="text-2xl font-bold">Name</Text>
          <Text>{about}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text>Description</Text>
          <Text>{data}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
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
    justifyContent: "center",
    flex: 1 / 3,
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
  textContainer: {
    width: 200,
    height: 60,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderWidth: 2,
    borderColor: "#ffd33d",
    borderRadius: 18,
    backgroundColor: "#fff",
  },
});
