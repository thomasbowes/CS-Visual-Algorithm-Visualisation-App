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

const BubbleSortScreen = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    props.navigation.setParams({toggleModal: toggleModal});
  }, []);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const bubbleSort = (array) => {
    let tempSortingArray = [...array];
    let sortingStepsArray = [];
    let length = tempSortingArray.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        // If first comparison mark both for compare
        if (j == 0) {
          sortingStepsArray.push({
            stepType: COMPARE_NUMS,
            numberIndexs: [j, j + 1],
          });
          // Otherwise just the new element
        } else {
          sortingStepsArray.push({
            stepType: COMPARE_NUMS,
            numberIndexs: [j + 1],
          });
        }

        // Check for swap
        if (tempSortingArray[j + 1] < tempSortingArray[j]) {
          sortingStepsArray.push({
            stepType: SWAP_NUMS,
            numberIndexOne: j,
            numberIndexTwo: j + 1,
          });
          [tempSortingArray[j], tempSortingArray[j + 1]] = [
            tempSortingArray[j + 1],
            tempSortingArray[j],
          ];
        }

        // If at end mark as sorted and unmark compare
        if (j == length - i - 2) {
          sortingStepsArray.push({
            stepType: MARK_SORTED,
            numberIndexs: [j + 1],
            animationWaitTime: false,
          });

          sortingStepsArray.push({
            stepType: STOP_COMPARE_NUMS,
            numberIndexs: [j, j + 1],
          });

          // Otherwise unmark old vlaue
        } else {
          sortingStepsArray.push({
            stepType: STOP_COMPARE_NUMS,
            numberIndexs: [j],
          });
        }
      }
    }

    // Mark remaining item
    sortingStepsArray.push({
      stepType: MARK_SORTED,
      numberIndexs: [0],
      animationWaitTime: false,
    });

    return sortingStepsArray;
  };

  return (
    <>
      <RegularSortingTemplate
        sortingAlgorithm={bubbleSort}
        pageTitle="Bubble Sort"
        navigateBack={props.navigation.goBack}
      />
      <HelpModal toggleModal={toggleModal} modalOpen={modalOpen} />
    </>
  );
};

// Add help button to corner
BubbleSortScreen.navigationOptions = ({navigation}) => ({
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

export default BubbleSortScreen;
