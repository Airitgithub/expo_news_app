import {  Text, TouchableOpacity, ScrollView, Image, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {  Stack} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NewsDataType } from '@/types';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import moment from "moment";

type props={}
const NewsDetails = () => {
    const {id}=useLocalSearchParams<{id:string}>();
    const [news, setNews] = useState<NewsDataType[]>([]);
      const [isLoading,setIsLoading]=useState(true)
      useEffect(()=>{
        getnews();
      })
     const getnews = async () => {
       try {
         const URL = `https://newsdata.io/api/1/news?apikey=pub_72648ce7da5a1118eae57f446da663fc7bc27&id=${id}`;
         const response = await axios.get(URL);
        //  console.log(response.data)
         if (response && response.data) {
           setNews(response.data.results);
           setIsLoading(false);
         }
       } catch (err: any) {
         console.log("Error Message:", err.massage);
       }
     };
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22}></Ionicons>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="heart-outline" size={22}></Ionicons>
            </TouchableOpacity>
          ),
          title: "",
        }}
      ></Stack.Screen>
      {isLoading ? (
        <Loading size={22} />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 20 }}
          style={{ flex: 1, backgroundColor: Colors.white }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: Colors.black,
              marginVertical: 10,
              letterSpacing: 0.6,
            }}
          >
            {news[0].title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 12, color: Colors.darkGrey }}>
              Moment({news[0].pubDate}).format('MMM DD, hh:mm a')
            </Text>
            <Text style={{ fontSize: 12, color: Colors.darkGrey }}>
              {news[0].source_name}
            </Text>
          </View>
          <Image
            source={{ uri: news[0].image_url }}
            style={{
              width: "100%",
              height: 300,
              marginBottom: 30,
              borderRadius: 10,
            }}
          />
          {news[0].content ? (
            <Text
              style={{
                fontSize: 14,
                color: "#555",
                letterSpacing: 0.8,
                lineHeight: 22,
              }}
            >
              {news[0].content}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 14,
                color: "#555",
                letterSpacing: 0.8,
                lineHeight: 22,
              }}
            >
              {news[0].description}
            </Text>
          )}
        </ScrollView>
      )}
    </>
  );
}

export default NewsDetails