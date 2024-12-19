import { View, StyleSheet, FlatList, TextInput } from "react-native";

import { useState } from "react";

import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";
import { router } from "expo-router";

const PlaceholderImage = require("@/assets/images/background-image.png");
export default function Main() {
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
