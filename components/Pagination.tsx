import { View, Text } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
type props = {
  item: NewsDataType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};
const Pagination = ({item,paginationIndex,scrollX}:props) => {
  return (
    <View style={{flexDirection:"row",height:20,alignItems:"center",justifyContent:"center",marginVertical:10}}>
      {
        item.map((_,index)=>{
            return (
              <Animated.View
                style={[
                  {
                    backgroundColor: "#333",
                    height: 8,
                    width: 8,
                    marginHorizontal: 2,
                    borderRadius: 8,
                  },
                {backgroundColor:paginationIndex===index?Colors.tint:Colors.darkGrey}]}
                key={index}
              ></Animated.View>
            );
        })
      }
    </View>
  )
}

export default Pagination