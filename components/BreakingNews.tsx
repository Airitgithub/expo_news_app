import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "./SliderItem";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "./Pagination";
type props = {
  newslist: Array<NewsDataType>;
};
const BreakingNews = ({ newslist }: props) => {
  const onViewableItemsChanged=({viewableItems}:{viewableItems:any})=>{
    if(
      viewableItems[0].index !== undefined && 
      viewableItems[0].index !== null 
    ){
      setPaginationIndex(viewableItems[0].index%newslist.length);
    }
  };
  const viewabilityConfig={itemVisiblePercentThreshold:50};
  const viewabilityConfigCallbackPairs=useRef([{
    viewabilityConfig,onViewableItemsChanged
  }])
  const [data, setData] = useState(newslist);
  const [paginationindex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay,setIsAutoPlay]=useState(true)
  const interval=useRef<NodeJS.Timeout>();
  const offset=useSharedValue(0)
  const {width}=useWindowDimensions();
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd:(e)=>{
      offset.value=e.contentOffset.x;
    }
  });

  useEffect(()=>{
    if(isAutoPlay === true){
      interval.current=setInterval(()=>{
        offset.value=offset.value+width;
      },5000)
    }else{
      clearInterval(interval.current)
    }
    return()=>{
      clearInterval(interval.current)
    };
  },[isAutoPlay,offset,width])

  useDerivedValue(()=>{
    scrollTo(ref,offset.value,0,true)
  })
  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: Colors.black,
          marginBottom: 10,
          marginLeft: 20,
        }}
      >
        Breaking News
      </Text>
      <View style={{ justifyContent: "center" }}>
        <Animated.FlatList
          horizontal={true}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onEndReachedThreshold={0.5}
          onEndReached={() => setData([...data, ...newslist])}
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
          data={data}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <SliderItem slideItem={item} index={index} scrollX={scrollX} />
          )}
          onScrollBeginDrag={()=>{
            setIsAutoPlay:(false);
          }}
          onScrollEndDrag={()=>{
            setIsAutoPlay:(true)
          }}
        />
        <Pagination
          item={newslist}
          paginationIndex={paginationindex}
          scrollX={scrollX}
        />
      </View>
    </View>
  );
};

export default BreakingNews;
