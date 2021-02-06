import React, {useState, useEffect} from 'react';
import {Pressable} from 'react-native';
import RegularSortingTemplate from '../../components/sorting/RegularSortingTemplate';
import HelpModal from '../../components/sorting/HelpModal';
import HelpSVG from '../../assets/images/help.svg';

// Step Types
const COMPARE_NUMS = 0;
const STOP_COMPARE_NUMS = 1;
const SWAP_NUMS = 2;
const MARK_SORTED = 3;
const MARK_HIDDEN_NUMS = 4;
const UNMARK_HIDDEN_NUMS = 5;
const MARK_PIVOT = 6;
const UNMARK_PIVOT = 7;
const MOVE_TO_LEFT_AND_NEW_POS = 8;
const MOVE_TO_RIGHT = 9;
const SHRINK_NUM_BARS = 10;
const EXPAND_NUM_BARS = 11;

const InsertionSortScreen = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    props.navigation.setParams({toggleModal: toggleModal});
  }, []);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const insertionSort = (array) => {
    let tempSortingArray = [...array];
    let sortingStepsArray = [];
    let length = tempSortingArray.length;

    for (let i = 0; i < length; i++) {
      let currentVal = tempSortingArray[i];
      let currentValIndex = i;
      while (
        currentValIndex - 1 >= 0 &&
        currentVal < tempSortingArray[currentValIndex - 1]
      ) {
        // If first comparison of run mark both numbers, otherwise we mark just the new number for comparison
        if (currentValIndex == i) {
          sortingStepsArray.push({
            stepType: COMPARE_NUMS,
            numberIndexs: [currentValIndex, currentValIndex - 1],
          });
        } else {
          sortingStepsArray.push({
            stepType: COMPARE_NUMS,
            numberIndexs: [currentValIndex - 1],
          });
        }

        // Swap values
        sortingStepsArray.push({
          stepType: SWAP_NUMS,
          numberIndexOne: currentValIndex,
          numberIndexTwo: currentValIndex - 1,
        });

        [
          tempSortingArray[currentValIndex],
          tempSortingArray[currentValIndex - 1],
        ] = [
          tempSortingArray[currentValIndex - 1],
          tempSortingArray[currentValIndex],
        ];

        // Either mark complete and stop compare if in final position
        // or stop compare old position and loop around again
        if (
          currentValIndex - 2 < 0 ||
          currentVal >= tempSortingArray[currentValIndex - 2]
        ) {
          sortingStepsArray.push({
            stepType: MARK_SORTED,
            numberIndexs: [currentValIndex - 1],
            animationWaitTime: false,
          });

          sortingStepsArray.push({
            stepType: STOP_COMPARE_NUMS,
            numberIndexs: [currentValIndex, currentValIndex - 1],
          });
        } else {
          sortingStepsArray.push({
            stepType: STOP_COMPARE_NUMS,
            numberIndexs: [currentValIndex],
          });
        }

        currentValIndex--;
      }

      // Marks complete if already in the right spot
      if (i == 0 || tempSortingArray[i] >= tempSortingArray[i - 1]) {
        sortingStepsArray.push({
          stepType: MARK_SORTED,
          numberIndexs: [currentValIndex],
          animationWaitTime: true,
        });
      }
    }

    return sortingStepsArray;
  };

  return (
    <>
      <RegularSortingTemplate
        sortingAlgorithm={insertionSort}
        pageTitle="Insertion Sort"
      />
      <HelpModal toggleModal={toggleModal} modalOpen={modalOpen} />
    </>
  );
};

// Add help button to corner
InsertionSortScreen.navigationOptions = ({navigation}) => ({
  headerRight: () => (
    <Pressable
      onPress={() => {
        navigation.getParam('toggleModal')();
      }}
      style={({pressed}) => {
        if (pressed) {
          return {paddingRight: 10, opacity: 0.5};
        }
        return {paddingRight: 10};
      }}>
      <HelpSVG width={25} height={25} />
    </Pressable>
  ),
});

export default InsertionSortScreen;
