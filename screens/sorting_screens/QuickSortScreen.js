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

const QuickSortTemplate = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    props.navigation.setParams({toggleModal: toggleModal});
  }, []);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const range = (start, end, step) => {
    let arr = [];
    for (let i = start; i < end; i += step) {
      arr.push(i);
    }
    return arr;
  };

  const quickSort = (array) => {
    let tempSortingArray = [...array];
    let sortingStepsArray = [];
    let length = tempSortingArray.length;

    const quickSortAlgo = (low, high) => {
      if (low <= high) {
        sortingStepsArray.push({
          stepType: MARK_HIDDEN_NUMS,
          numberIndexs: [...range(0, low, 1), ...range(high + 1, length, 1)],
        });

        let pivot = tempSortingArray[low];
        let pivotIndex = low;

        sortingStepsArray.push({
          stepType: MARK_PIVOT,
          numberIndexs: [pivotIndex],
        });

        let left = low + 1;
        let right = high;

        while (left <= right) {
          sortingStepsArray.push({
            stepType: COMPARE_NUMS,
            numberIndexs: [left, right],
          });

          if (
            tempSortingArray[left] > pivot &&
            tempSortingArray[right] < pivot
          ) {
            [tempSortingArray[left], tempSortingArray[right]] = [
              tempSortingArray[right],
              tempSortingArray[left],
            ];

            sortingStepsArray.push({
              stepType: SWAP_NUMS,
              numberIndexOne: left,
              numberIndexTwo: right,
            });

            sortingStepsArray.push({
              stepType: STOP_COMPARE_NUMS,
              numberIndexs: [left, right],
            });

            left++;
            right--;

            continue;
          }

          if (
            tempSortingArray[left] <= pivot &&
            tempSortingArray[right] >= pivot
          ) {
            sortingStepsArray.push({
              stepType: STOP_COMPARE_NUMS,
              numberIndexs: [left, right],
            });
            left++;
            right--;
          } else {
            if (tempSortingArray[left] <= pivot) {
              sortingStepsArray.push({
                stepType: STOP_COMPARE_NUMS,
                numberIndexs: [left],
              });
              left++;
            }

            if (tempSortingArray[right] >= pivot) {
              sortingStepsArray.push({
                stepType: STOP_COMPARE_NUMS,
                numberIndexs: [right],
              });
              right--;
            }
          }
        }

        [tempSortingArray[left - 1], tempSortingArray[pivotIndex]] = [
          tempSortingArray[pivotIndex],
          tempSortingArray[left - 1],
        ];

        sortingStepsArray.push({
          stepType: SWAP_NUMS,
          numberIndexOne: pivotIndex,
          numberIndexTwo: left - 1,
        });

        pivotIndex = left - 1;

        sortingStepsArray.push({
          stepType: MARK_SORTED,
          numberIndexs: [pivotIndex],
        });

        sortingStepsArray.push({
          stepType: UNMARK_PIVOT,
          numberIndexs: [pivotIndex],
        });

        sortingStepsArray.push({
          stepType: UNMARK_HIDDEN_NUMS,
          numberIndexs: [...range(0, low, 1), ...range(high + 1, length, 1)],
        });

        quickSortAlgo(low, pivotIndex - 1);
        quickSortAlgo(pivotIndex + 1, high);
      }
    };

    quickSortAlgo(0, length - 1);

    return sortingStepsArray;
  };

  return (
    <>
      <RegularSortingTemplate
        sortingAlgorithm={quickSort}
        pageTitle="Quick Sort"
      />
      <HelpModal toggleModal={toggleModal} modalOpen={modalOpen} />
    </>
  );
};

// Add help button to corner
QuickSortTemplate.navigationOptions = ({navigation}) => ({
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

export default QuickSortTemplate;
