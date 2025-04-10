import { ImageBackground, Text, TouchableOpacity, View,SafeAreaView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
const Page = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light"/>
      <ImageBackground
        source={require("@/assets/images/getting-started.jpg")}
        style={{ flex: 1 }}
        resizeMode="stretch"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingBottom: 20,
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            gap: 10,
          }}
        >
          <Animated.Text
            entering={FadeInRight.delay(300).duration(500)}
            style={{
              fontSize: 22,
              color: Colors.white,
              lineHeight: 36,
              fontWeight: "600",
              letterSpacing: 1.5,
            }}
          >
            Stay Updated!
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.delay(700).duration(500)}
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
              color: Colors.white,
              lineHeight: 22,
              letterSpacing: 1.2,
            }}
          >
            Get breaking news and personalized updates directaly to your feed.
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
            <TouchableOpacity
            onPress={()=>router.replace("/(tabs)")}
              style={{
                backgroundColor: Colors.tint,
                borderRadius: 10,
                paddingVertical: 10,
                alignItems: "center",
                marginVertical: 15,
                paddingHorizontal: 120,
              }}
            >
              <Text
                style={{ color: Colors.white, fontSize: 16, fontWeight: "700" }}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Page;
