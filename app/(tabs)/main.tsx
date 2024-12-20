import { View, StyleSheet, FlatList, TextInput, Pressable } from "react-native";

import { useEffect, useState } from "react";

import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useVideoStore } from "../store";

export default function Main() {
  /*   const store = useVideoStore();
  store.addVideo(); */
  //store.addVideo("test", "test", "test");
  const store = useVideoStore();
  console.log(store);

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
      const result: any = {};
      const keys = await AsyncStorage.getAllKeys();
      for (const key of keys) {
        const val = await AsyncStorage.getItem(key);
        result[key] = val;
      }
      return result;
    } catch (error) {
      console.log(error, "problem");
    }
  };

  const [text, onChangeText] = useState("");
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      {/*       <UserList></UserList> */}
      <View style={styles.footerContainer}>
        <View style={styles.textContainer}>
          <TextInput
            onChangeText={(newText) => onChangeText(newText)}
            placeholder="Name"
            value={text}
          />
        </View>

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
    flex: 1 / 2,
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
  textContainer: {
    width: 200,
    height: 60,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffd33d",
    borderRadius: 18,
    backgroundColor: "#fff",
  },
});
