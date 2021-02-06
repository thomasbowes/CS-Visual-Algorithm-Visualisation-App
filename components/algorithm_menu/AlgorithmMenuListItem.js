import React from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import {LIGHT_PURPLE, SALMON} from '../../constants/colors';
import ArrowSvg from '../../assets/images/arrow.svg';

const AlgorithmMenuListItem = (props) => {
  return (
    <Pressable
      style={({pressed}) => {
        let style = styles.listItem;
        if (pressed) {
          style = {...style, opacity: 0.75};
        }

        if (props.secondaryColor) {
          style = {...style, backgroundColor: SALMON};
        } else {
          style = {...style, backgroundColor: LIGHT_PURPLE};
        }

        return style;
      }}
      onPress={props.onPress}>
      <View>
        <Text style={styles.listItemTitle}>{props.title}</Text>
        <Text style={styles.listItemSubTitle}>{props.subTitle}</Text>
      </View>
      <ArrowSvg height={40} width={40} fillOpacity={0.4} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    width: '100%',
    borderRadius: 15,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemSalmon: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    width: '100%',
    borderRadius: 15,
    backgroundColor: SALMON,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 8,
  },
  listItemSubTitle: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    opacity: 0.7,
  },
});

export default AlgorithmMenuListItem;
