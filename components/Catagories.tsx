import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";
type props={
onCategoryChanged :(category:string)=>void;
}
const Catagories = ({onCategoryChanged}:props) => {
    const scrollref=useRef<ScrollView>(null);
    const itemRef=useRef<TouchableOpacity[]|null[]>([])
    const [activeIndex,setActiveindex]=useState(0)
    const handleSelectedCatagory=(index:number)=>{
      const selected=itemRef.current[index];
      setActiveindex(index);
      selected?.measure((x)=>{
        scrollref.current?.scrollTo({x:x-20,y:0,animated:true})
      });
      onCategoryChanged(newsCategoryList[index].slug)
    }
    // console.log(
    //   "Titles:",
    //   newsCategoryList.map((item) => item.slug)
    // );
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: Colors.black,
          marginBottom: 10,
          marginLeft: 20,
        }}
      >
        Trending Right Now
      </Text>
      <ScrollView
        ref={scrollref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
      >
        {newsCategoryList.map((item, index) => (
          <TouchableOpacity
          onPress={()=>handleSelectedCatagory(index)}
            ref={(el) => (itemRef.current[index] = el)}
            key={index}
            style={{
              borderWidth: 1,
              borderColor: Colors.darkGrey,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 10,
              ...(activeIndex === index && {
                backgroundColor: Colors.tint,
                borderColor: Colors.tint,
              }),
            }}
          >
            <Text
              style={{
                fontSize: 14,
                letterSpacing: 0.5,
                color: Colors.darkGrey,
                ...(activeIndex===index&&{
                  fontWeight:"600",
                  color:Colors.white
                })
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Catagories;
