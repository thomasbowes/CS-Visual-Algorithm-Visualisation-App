import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ScreenTitle = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '90%',
    marginVertical: 20,
  },
  text: {
    fontSize: 33,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default ScreenTitle;
