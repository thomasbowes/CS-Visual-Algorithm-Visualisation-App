import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import {GRAY, WHITE, DEACTIVATED_GRAY} from '../../constants/colors';

const BlueButton = (props) => {
  let buttonWidth = '80%';
  if (props.width) {
    buttonWidth = props.width;
  }

  return (
    <Pressable style={{width: buttonWidth}} onPress={props.onPress}>
      {props.disabled ? (
        <View style={{...styles.container, backgroundColor: GRAY}}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      ) : (
        ({pressed}) => (
          <LinearGradient
            colors={
              pressed
                ? [DEACTIVATED_GRAY, DEACTIVATED_GRAY]
                : ['#355AC5', '#51aef0']
            }
            start={{x: 0.0, y: 0.25}}
            end={{x: 1.0, y: 1.0}}
            locations={[0.3, 1.0]}
            style={{...styles.container}}>
            <Text style={styles.text}>{props.title}</Text>
          </LinearGradient>
        )
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
    padding: 15,
    borderRadius: 45,
  },
  text: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: WHITE,
    textAlign: 'center',
  },
});

BlueButton.defaultProps = {disabled: false};

export default BlueButton;
