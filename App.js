import * as React from 'react'
import { Animated, Dimensions, View } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const App = () => {
  const scale = new Animated.Value(1)

  const { width } = Dimensions.get('window')

  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: { scale: scale }
      }
    ],
    {
      useNativeDriver: true
    }
  )

  const onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start()
    }
  }

  return (
      <PinchGestureHandler
        onGestureEvent={onZoomEvent}
        onHandlerStateChange={onZoomStateChange}>
        <Animated.Image
          source={{
            uri: 'https://miro.medium.com/max/1080/1*7SYuZvH2pZnM0H79V4ttPg.jpeg'
          }}
          style={{
            width: width,
            height: 300,
            transform: [{ scale: scale }]
          }}
          resizeMode='contain'
        />
      </PinchGestureHandler>
  )
}

export default App;