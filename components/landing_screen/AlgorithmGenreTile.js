import React from 'react';
import {StyleSheet, Pressable, Dimensions} from 'react-native';
import {DARK_BLUE} from '../../constants/colors';

const AlgorithmGenreTile = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({pressed}) => {
        if (pressed) {
          return {
            ...styles.container,
            opacity: 0.75,
          };
        } else {
          return styles.container;
        }
      }}>
      {props.svgComponent}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').width * 0.5,
    borderRadius: 20,
    backgroundColor: DARK_BLUE,
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 33,
    fontFamily: 'MainFontBold',
  },
});

export default AlgorithmGenreTile;
