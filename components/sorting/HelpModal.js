import React from 'react';
import {
  Pressable,
  StyleSheet,
  Modal,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import CloseSVG from '../../assets/images/close.svg';
import {PURPLE, GREEN, RED, GRAY, YELLOW} from '../../constants/colors';

const {height: HEIGHT, width: WIDTH} = Dimensions.get('window');

const HelpModal = (props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.modalOpen}>
      <Pressable onPress={props.toggleModal} style={styles.modalBackground}>
        <Pressable onPress={() => {}} style={styles.modal}>
          <View style={{flex: 1}}>
            <Pressable
              onPress={props.toggleModal}
              style={{
                position: 'absolute',
                top: 5,
                right: 0,
                zIndex: 10,
              }}>
              <CloseSVG height={25} width={25} />
            </Pressable>

            <Text style={styles.modalTitle}>Help</Text>

            <ScrollView>
              <Pressable onPress={() => {}}>
                <View style={styles.colorExplanationContainer}>
                  <View
                    style={{
                      ...styles.colorBox,
                      backgroundColor: PURPLE,
                    }}></View>
                  <Text style={styles.colorDescription}>
                    Purple represents an unsorted number in the list
                  </Text>
                </View>

                <View style={styles.colorExplanationContainer}>
                  <View
                    style={{
                      ...styles.colorBox,
                      backgroundColor: GRAY,
                    }}></View>
                  <Text style={styles.colorDescription}>
                    Gray represents numbers that are not in focus in recursive
                    sorting algorithms such as Quick Sort and Merge Sort
                  </Text>
                </View>

                <View style={styles.colorExplanationContainer}>
                  <View
                    style={{
                      ...styles.colorBox,
                      backgroundColor: RED,
                    }}></View>
                  <Text style={styles.colorDescription}>
                    Red represents a number that is being compared
                  </Text>
                </View>

                <View style={styles.colorExplanationContainer}>
                  <View
                    style={{
                      ...styles.colorBox,
                      backgroundColor: GREEN,
                    }}></View>
                  <Text style={styles.colorDescription}>
                    Green represents a number that has finished sorting
                  </Text>
                </View>

                <View style={styles.colorExplanationContainer}>
                  <View
                    style={{
                      ...styles.colorBox,
                      backgroundColor: YELLOW,
                    }}></View>
                  <Text style={styles.colorDescription}>
                    Yellow represents the number in the list that is the current
                    pivot in the Quick Sort algorithm
                  </Text>
                </View>
              </Pressable>
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalTitle: {
    fontWeight: '600',
    fontSize: 30,
    marginBottom: 10,
  },
  modal: {
    width: 0.9 * WIDTH,
    height: 0.5 * HEIGHT,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
  },
  colorExplanationContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  colorBox: {
    height: 50,
    width: 30,
    borderRadius: 7,
    marginRight: 10,
  },
  colorDescription: {flex: 1, flexWrap: 'wrap'},
});

export default HelpModal;
