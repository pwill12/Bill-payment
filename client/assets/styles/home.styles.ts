import {
  BLOSSOMCOLORS,
  COLORS,
  OCEANCOLORS,
  RETROCOLORS,
} from "@/constants/color";
import { Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");


export const homestyles = StyleSheet.create({
  lottie: {
    width: 500 * 0.9,
    height: width,
  },
  container: {
    paddingHorizontal: 0,
    backgroundColor: RETROCOLORS.background,
  },
  text: {
    fontSize: 22,
    fontWeight: 600,
  },
  subtext: {
    fontSize: 15,
  },
  nextbutton: {
    padding: 20,
    backgroundColor: "lightblue",
    borderRadius: "50%",
  },
  border: {
    borderStyle: "solid",
    borderBottomColor: "lightblue",
    borderBottomWidth: 1,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: height * 0.5,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
