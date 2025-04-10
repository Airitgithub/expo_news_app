import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { NewsDataType } from "@/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
type props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};
// useEffect(()=>{
//   console.log("mcbmdnmnmbfnmdbvnmdmnm:",slideItem)
// },[slideItem])
const { width } = Dimensions.get("screen");
const SliderItem = ({ slideItem, index, scrollX }: props) => {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.8, 1, 0.8],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Link href={`/news/${slideItem.article_id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          key={slideItem.article_id}
          style={[
            {
              width: width,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            },
            rnStyle,
          ]}
        >
          <Image
            source={{ uri: slideItem.image_url }}
            style={{ borderRadius: 20, width: width - 60, height: 180 }}
          ></Image>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={{
              position: "absolute",
              width: width - 60,
              height: 180,
              borderRadius: 20,
              top: 0,
              paddingTop: 20,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
                position: "absolute",
                top: 95,
                paddingLeft: 20,
              }}
            >
              {slideItem.source_icon && (
                <Image
                  source={{ uri: slideItem.source_icon }}
                  style={{ height: 25, width: 25, borderRadius: 15 }}
                ></Image>
              )}
              <Text
                style={{ fontSize: 12, color: Colors.white, fontWeight: "600" }}
              >
                {slideItem.source_name}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: Colors.white,
                fontWeight: "600",
                position: "absolute",
                top: 125,
                paddingHorizontal: 20,
              }}
              numberOfLines={2}
            >
              {slideItem.title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;
