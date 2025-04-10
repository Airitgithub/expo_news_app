import { ActivityIndicator, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import { NewsDataType } from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Catagories from "@/components/Catagories";
import NewsList from "@/components/NewsList";
import Loading from "@/components/Loading";

const Page = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setbreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading,setIsLoading]=useState(true)
   const getbreakingnews = async () => {
     try {
       const URL = `https://newsdata.io/api/1/news?apikey=pub_72648ce7da5a1118eae57f446da663fc7bc27&country=in&language=en&image=1&removeduplicate=1&size=5`;

       const response = await axios.get(URL);
       // console.log("API Response:", response.data); // Debugging

       if (response?.data?.results?.length > 0) {
         setbreakingNews(response.data.results);
       } else {
         console.log("Warning: API returned no results.");
       }

       setIsLoading(false);
     } catch (err: any) {
       console.log("Error Message:", err.message);
     }
   };
  useEffect(() => {
    getbreakingnews();
    getnews();
  }, []);
 


  const getnews = async (category:string="") => {
    try {
      let categoryString="";
      if(category.length!==0){
        categoryString=`&category=${category}`
      }
      const URL = `https://newsdata.io/api/1/news?apikey=pub_72648ce7da5a1118eae57f446da663fc7bc27&country=in&language=en&image=1&removeduplicate=1&size=10${categoryString}`;
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

  const onCatChanged=(category:string)=>{
    console.log("category:",category);
    setNews([]);
    getnews(category)
    
  }
  return (
    <ScrollView style={{ flex: 1, paddingTop: safeTop }}>
      <Header />
      <SearchBar withHorizontalPadding={true} />
      {isLoading ? (
       <Loading size={"large"}/>
      ) : (
        <BreakingNews newslist={breakingNews} />
      )}
      <Catagories onCategoryChanged={onCatChanged}/>
      <NewsList newsList={news}/>
    </ScrollView>
  );
};

export default Page;
