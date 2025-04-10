import { View, Text, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
  type props={
    withHorizontalPadding:boolean,
    setSerachQuery:Function
  }
const SearchBar = ({ withHorizontalPadding, setSerachQuery }: props) => {
  return (
    <View
      style={{
        marginBottom: 20,
        ...(withHorizontalPadding && { paddingHorizontal: 20 }),
      }}
    >
      <View
        style={{
          backgroundColor: "#e4e4e4",
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderRadius: 10,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Ionicons name="search-outline" size={24} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          style={{ fontSize: 14, color: Colors.darkGrey, flex: 1 }}
          autoCapitalize="none"
          onChangeText={query=>setSerachQuery(query)}
        />
      </View>
    </View>
  );
};

export default SearchBar;
