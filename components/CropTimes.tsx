import { useState } from "react";
import { StyleSheet, FlatList, Platform, Pressable } from "react-native";
import { Image, type ImageSource } from "expo-image";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { TextInput } from "react-native-gesture-handler";

type Props = {
  onSelect: (image: ImageSource) => void;
  onCloseModal: () => void;
};

export default function CropTimes({ onSelect, onCloseModal }: Props) {
  const [startMin, setStartMin] = useState(0);
  const [endMin, seteEndMin] = useState(0);

  return (
    <View>
      <TextInput></TextInput>
      <TextInput></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
