import React, { useState } from "react";
// @ts-ignore
import { Text, View, StyleSheet, ScrollView } from "react-native";
// @ts-ignore
import Slider, { SliderProps } from "@react-native-community/slider";

export interface Props {
  title: string;
  render(): JSX.Element;
  platform?: string;
}

const VideoSlider = (props: SliderProps) => {
  const [value, setValue] = useState(0);
  let minutes = Math.floor((value % 3600) / 60);
  let seconds = Math.floor((value % 3600) % 60);
  return (
    <View>
      <Text style={styles.text}>
        {minutes} minutes and {seconds} seconds
      </Text>
      <Slider
        step={1}
        style={styles.slider}
        {...props}
        onValueChange={setValue}
      />
    </View>
  );
};

export default VideoSlider;

const styles = StyleSheet.create({
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    margin: 0,
  },
});
