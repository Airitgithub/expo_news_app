import { Text, View, TouchableOpacity } from "react-native";
import React, { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
// import newsCategoryList from '@/constants/Categories'
import CheckBox from '@/components/CheckBox'
import useNewsCategories from '@/hooks/useNewsCategories'
import useNewsCountries from '@/hooks/useNewsCountry'
import { Link } from "expo-router";



const Page = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const {newsCategories,toggleNewsCategory}=useNewsCategories();
   const { newsCountries, toggleNewsCountry } = useNewsCountries();
   const [searchQuery,setSearchQuery]=useState();
   const [category, setCategory] = useState();
   const [country, setCountry] = useState();
  return (
    <View style={{ flex: 1, paddingTop: safeTop + 20, paddingHorizontal: 20 }}>
      <SearchBar
        withHorizontalPadding={false}
        setSerachQuery={setSearchQuery}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: Colors.black,
          marginBottom: 10,
        }}
      >
        Category
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 20,
          gap: 16,
          marginTop: 12,
        }}
      >
        {newsCategories.map((item) => (
          <CheckBox
            key={item.id}
            label={item.title}
            checked={item.selected}
            onPress={() => {
              toggleNewsCategory(item.id);
              setCategory(item.slug);
            }}
          />
        ))}
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: Colors.black,
          marginBottom: 10,
        }}
      >
        Country
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 20,
          gap: 16,
          marginTop: 12,
        }}
      >
        {newsCountries.map((item, index) => (
          <CheckBox
            key={index}
            label={item.name}
            checked={item.selected}
            onPress={() => {
              toggleNewsCountry(index);
              setCountry(item.code);
            }}
          />
        ))}
      </View>
      <Link href={{pathname:`/news/search`,params:{query:searchQuery,category,country}}} asChild>
        <TouchableOpacity
          style={{
            alignItems: "center",
            padding: 14,
            borderRadius: 10,
            marginVertical: 10,
            backgroundColor: Colors.tint,
          }}
        >
          <Text
            style={{ fontWeight: "600", color: Colors.white, fontSize: 16 }}
          >
            Search
          </Text>
        </TouchableOpacity>
      </Link> 
    </View>
  );
}

export default Page

