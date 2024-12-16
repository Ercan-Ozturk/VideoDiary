import { View, StyleSheet, Platform, FlatList, TextInput } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useRef, useState, useEffect } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import { ImageSource } from "expo-image";
import * as MediaLibrary from "expo-media-library";

import { Text } from "react-native";
import UserList from "@/components/UserList";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";
import { Link, router } from "expo-router";

const PlaceholderImage = require("@/assets/images/background-image.png");
export default function Main() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );
  const [list, setList] = useState<string | undefined>(undefined);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const fetchAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      return items != null ? JSON.parse(JSON.stringify(items)) : null;
    } catch (error) {
      console.log(error, "problem");
    }
  };
  console.log(fetchAllItems());
  const [text, onChangeText] = useState("");
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      {/*       <UserList></UserList> */}
      <TextInput
        style={styles.input}
        onChangeText={(newText) => onChangeText(newText)}
        placeholder="Name"
        value={text}
      />

      <Button
        label="Go the video"
        onPress={() => {
          router.push({
            pathname: `/about`,
            params: { about: text },
          });
        }}
      ></Button>
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
