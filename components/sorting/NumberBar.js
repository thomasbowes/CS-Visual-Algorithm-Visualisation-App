import React from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
import {PURPLE, GREEN, RED, GRAY, YELLOW} from '../../constants/colors';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const MAX_LENGTH = 50;
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const NumberBar = (props) => {
  const LENGTH = props.length;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(props.yOffset, {
            duration: 300,
            easing: Easing.linear,
          }),
        },
        {
          translateX: withTiming(props.xOffset, {
            duration: 300,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const widthStyle = useAnimatedStyle(() => {
    let barWidth;
    if (props.halfWidth) {
      barWidth = 0.35 * WIDTH * (LENGTH / MAX_LENGTH);
    } else {
      barWidth = 0.85 * WIDTH * (LENGTH / MAX_LENGTH);
    }

    return {
      width: withTiming(barWidth, {
        duration: 500,
      }),
    };
  });

  let barColor = PURPLE;
  if (props.redBarColor) {
    barColor = RED;
  } else if (props.greenBarColor) {
    barColor = GREEN;
  } else if (props.grayBarColor) {
    barColor = GRAY;
  } else if (props.yellowBarColor) {
    barColor = YELLOW;
  }

  let numberBarWidth = 0.85;

  if (props.halfWidth) {
    numberBarWidth = 0.35;
  }

  const numberBar = (
    <>
      <Animated.View
        style={[
          {
            ...styles.numberBar,
            height: props.barwidth,
            backgroundColor: barColor,
          },
          widthStyle,
        ]}></Animated.View>
      <Text style={{...styles.barText, fontSize: props.barwidth}}>
        {props.length}
      </Text>
    </>
  );

  return (
    <Animated.View
      style={[
        {
          ...styles.container,
          marginVertical: props.barwidth / 2,
          height: props.barwidth,
        },
        animatedStyles,
      ]}>
      {numberBar}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'flex-start',
  },
  numberBar: {
    borderRadius: 7,
  },
  barText: {
    marginLeft: 15,
    fontFamily: 'Montserrat',
  },
});

export default NumberBar;
