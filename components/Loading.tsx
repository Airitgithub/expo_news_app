import { View, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import React from 'react'
type props={

}
const Loading = (props:React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<ActivityIndicator> & Readonly<ActivityIndicatorProps>) => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator  {...props}/>
    </View>
  )
}

export default Loading