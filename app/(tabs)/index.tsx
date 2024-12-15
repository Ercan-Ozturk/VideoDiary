import { View, StyleSheet, TextInput } from "react-native";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { ImageSource } from "expo-image";
import { VideoSource, VideoView, useVideoPlayer } from "expo-video";

import { VideoRef } from "react-native-video";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PlaceholderImage = require("@/assets/images/background-image.png");
export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [videoSource, setVideoSource] = useState<VideoSource>(
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );

  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  const videoRef = useRef<VideoRef>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      //setSelectedImage(result.assets[0].uri);
      setVideoSource(result.assets[0].uri);
      //setAssetId(result.assets[0].assetId);
      console.log(videoSource);
      setShowAppOptions(true);
      //console.log(result);
    } else {
      alert("You did not select any image.");
    }
    if (status === null) {
      requestPermission();
    }
  };
  const onReset = () => {
    setShowAppOptions(false);
  };
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  // TODO:

  type VideoProps = { uri: string; name: string; description: string };

  const storeData = async (value: VideoProps) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(value.name, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (name: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(name);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  const onSaveVideoAsync = async () => {
    const v: VideoProps = {
      uri: videoSource as string,
      name: text,
      description: description,
    };
    storeData(v);
    console.log(getData(text));
  };
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const [text, onChangeText] = useState("");
  const [description, onChangeDescription] = useState("");
  return (
    <View style={styles.container}>
      <View ref={imageRef} style={styles.imageContainer}>
        {/*         <ImageViewer
          imgSource={selectedImage || PlaceholderImage}
        ></ImageViewer> */}
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />

        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveVideoAsync}
            />
          </View>
        </View>
      ) : (
        <>
          <View
            style={[
              styles.textContainer,
              {
                borderWidth: 2,
                borderColor: "#ffd33d",
                borderRadius: 18,
                backgroundColor: "#fff",
              },
            ]}
          >
            <TextInput
              style={styles.input}
              onChangeText={(newText) => onChangeText(newText)}
              placeholder="Name"
              value={text}
            />
          </View>

          <View
            style={[
              styles.textContainer,
              {
                borderWidth: 2,
                borderColor: "#ffd33d",
                borderRadius: 18,
                backgroundColor: "#fff",
              },
            ]}
          >
            <TextInput
              style={styles.input}
              onChangeText={(newText) => onChangeDescription(newText)}
              value={description}
              placeholder="Description"
            />
          </View>
          <View style={styles.footerContainer}>
            <Button
              label="Choose a video"
              theme="primary"
              onPress={pickImageAsync}
            ></Button>
            <Button
              label="Use this video"
              onPress={() => setShowAppOptions(true)}
            ></Button>
          </View>
        </>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25292e",
    flex: 1,

    alignItems: "center",
  },

  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  video: {
    width: 350,
    height: 275,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textContainer: {
    width: 200,
    height: 60,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
});
