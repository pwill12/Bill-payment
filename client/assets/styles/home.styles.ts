import { BLOSSOMCOLORS, COLORS, OCEANCOLORS, RETROCOLORS } from "@/constants/color";
import { Dimensions, StyleSheet } from "react-native";

const {width} = Dimensions.get("screen")


export const homestyles = StyleSheet.create({
    
    lottie: {
        width: 500*0.9,
        height: width
    },
    container: {
        paddingHorizontal: 0,
        backgroundColor: RETROCOLORS.background
    },
    text: {
        fontSize: 22,
        fontWeight: 600
    },
    subtext: {
        fontSize: 15,
    },
    nextbutton: {
        padding: 20,
        backgroundColor: 'lightblue',
        borderRadius: '50%'
    }
})