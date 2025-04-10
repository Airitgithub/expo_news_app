import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { NewsDataType } from '@/types';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Loading from '@/components/Loading';
import { NewsItem } from '@/components/NewsList';

const Page = () => {
    const {query,country,category}=useLocalSearchParams<{query:string,category:string,country:string}>();
 const [news, setNews] = useState   <NewsDataType[]>([]);
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    getnews();
  },[])
  const getnews = async (category: string = "") => {
    try {
      let categoryString = "";
       let countryString = "";
        let queryString = "";
      if (category) {
        categoryString = `&category=${category}`;
      }
      if (country) {
        countryString = `&country=${country}`;
      }
      if (query) {
        queryString = `&q=${query}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=pub_72648ce7da5a1118eae57f446da663fc7bc27&country=in&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;
      const response = await axios.get(URL);
      // console.log("categiry is fetch",response.data)
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
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          title: "Search",
        }}
      >
        <View style={{flex:1,marginVertical:20,marginHorizontal:20}}>
          {isLoading ? (
            <Loading size={"large"} />
          ) : (
            <FlatList
              data={news}
              keyExtractor={(_, index) => `list_item${index}`}
              renderItem={({index,item})=>{
                return(
                    <NewsItem item={item}/>
                )
              }}
            />
          )}
        </View>
      </Stack.Screen>
    </>
  );
}

export default Page