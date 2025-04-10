import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import Loading from "./Loading";
import { Link } from "expo-router";
type props = {
  newsList: Array<NewsDataType>;
};
const NewsList = ({ newsList }: props) => {
  return (
    <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
      {newsList.length == 0 ? (
        <Loading size={"large"} />
      ) : (
        newsList.map((item, index) => (
          <Link href={`/news/${item.article_id}`} asChild key={index}>
            <TouchableOpacity>
              <NewsItem item={item}/>
            </TouchableOpacity>
          </Link>
        ))
      )}
    </View>
  );
};

export default NewsList;

export const NewsItem=({item}:{item:NewsDataType})=>{
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        flex: 1,
        gap: 10,
      }}
    >
      <Image
        source={{ uri: item.image_url }}
        style={{
          height: 100,
          width: 90,
          marginRight: 10,
          borderRadius: 20,
        }}
      />
      <View style={{ flex: 1, gap: 10, justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 12,
            color: Colors.darkGrey,
            textTransform: "capitalize",
          }}
        >
          {item.category}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: Colors.black,
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.source_icon }}
            style={{ height: 20, width: 20, borderRadius: 20 }}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: Colors.darkGrey,
            }}
          >
            {item.source_name}
          </Text>
        </View>
      </View>
    </View>
  );
}
