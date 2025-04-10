import { View, Text, Image, TouchableOpacity } from "react-native";
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Header = () => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom:20
      }}
    >
      <View style={{ flexDirection: "row", gap: 10,alignItems:"center" }}>
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/waist-uphttps://img.freepik.com/free-photo/portrait-young-man-with-dark-curly-hair_176532-8137.jpg?uid=R107854492&ga=GA1.1.1356959906.1740042294&semt=ais_hybrid-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?uid=R107854492&ga=GA1.1.1356959906.1740042294&semt=ais_hybrid",
          }}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
        <View style={{}}>
          <Text style={{fontSize:12,color:Colors.darkGrey}}>Welcome</Text>
          <Text style={{fontSize:14,fontWeight:'700',color:Colors.black}}>John Doe!</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
}

export default Header