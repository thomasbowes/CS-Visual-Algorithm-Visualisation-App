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

const MergeSortScreen = (props) => {
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

  const mergeSort = (array) => {
    let tempSortingArray = [...array];
    let sortingStepsArray = [];
    let auxArray1 = [];
    let auxArray2 = [];
    let length = tempSortingArray.length;

    const mergeSortAlgo = (low, high) => {
      sortingStepsArray.push({
        stepType: MARK_HIDDEN_NUMS,
        numberIndexs: [...range(0, low, 1), ...range(high + 1, length, 1)],
      });

      // If at base case we run animation to aid the viewers understanding
      if (high - low < 1) {
        sortingStepsArray.push({
          stepType: UNMARK_HIDDEN_NUMS,
          numberIndexs: [...range(low, high + 1, 1)],
        });
        sortingStepsArray.push({
          stepType: MOVE_TO_RIGHT,
          numberIndexs: [...range(low, high + 1, 1)],
        });
        sortingStepsArray.push({
          stepType: MOVE_TO_LEFT_AND_NEW_POS,
          numberIndex: low,
          newNumberIndex: low,
        });
        return;
      }

      mergeSortAlgo(low, Math.floor((high + low) / 2));
      mergeSortAlgo(Math.floor((high + low) / 2) + 1, high);

      sortingStepsArray.push({
        stepType: UNMARK_HIDDEN_NUMS,
        numberIndexs: [...range(low, high + 1, 1)],
      });

      sortingStepsArray.push({
        stepType: MOVE_TO_RIGHT,
        numberIndexs: [...range(low, high + 1, 1)],
      });

      auxArray1 = [
        ...tempSortingArray.slice(low, Math.floor((high + low) / 2) + 1),
      ];
      auxArray2 = [
        ...tempSortingArray.slice(Math.floor((high + low) / 2) + 1, high + 1),
      ];

      //keeps track of the current position in the original array of each aux head
      //This allows us to send the animations to the correct number bars by position
      let auxArray1Position = low;
      let auxArray2Position = Math.floor((high + low) / 2) + 1;

      for (let i = low; i <= high; i++) {
        if (auxArray1.length == 0) {
          tempSortingArray[i] = auxArray2.shift();
          sortingStepsArray.push({
            stepType: MOVE_TO_LEFT_AND_NEW_POS,
            numberIndex: auxArray2Position,
            newNumberIndex: i,
          });

          if (low == 0 && high == length - 1) {
            sortingStepsArray.push({
              stepType: MARK_SORTED,
              numberIndexs: [i],
            });
          }

          auxArray2Position++;
          continue;
        }

        if (auxArray2.length == 0) {
          tempSortingArray[i] = auxArray1.shift();
          sortingStepsArray.push({
            stepType: MOVE_TO_LEFT_AND_NEW_POS,
            numberIndex: auxArray1Position,
            newNumberIndex: i,
          });

          if (low == 0 && high == length - 1) {
            sortingStepsArray.push({
              stepType: MARK_SORTED,
              numberIndexs: [i],
            });
          }

          auxArray1Position++;
          continue;
        }

        if (auxArray1[0] <= auxArray2[0]) {
          tempSortingArray[i] = auxArray1.shift();
          sortingStepsArray.push({
            stepType: MOVE_TO_LEFT_AND_NEW_POS,
            numberIndex: auxArray1Position,
            newNumberIndex: i,
          });
          auxArray1Position++;
        } else {
          tempSortingArray[i] = auxArray2.shift();
          sortingStepsArray.push({
            stepType: MOVE_TO_LEFT_AND_NEW_POS,
            numberIndex: auxArray2Position,
            newNumberIndex: i,
          });
          auxArray2Position++;
        }

        if (low == 0 && high == length - 1) {
          sortingStepsArray.push({
            stepType: MARK_SORTED,
            numberIndexs: [i],
          });
        }
      }
    };

    sortingStepsArray.push({
      stepType: SHRINK_NUM_BARS,
    });

    mergeSortAlgo(0, length - 1);

    sortingStepsArray.push({
      stepType: EXPAND_NUM_BARS,
    });

    return sortingStepsArray;
  };

  return (
    <>
      <RegularSortingTemplate
        sortingAlgorithm={mergeSort}
        pageTitle="Merge Sort"
      />
      <HelpModal toggleModal={toggleModal} modalOpen={modalOpen} />
    </>
  );
};

// Add help button to corner
MergeSortScreen.navigationOptions = ({navigation}) => ({
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

export default MergeSortScreen;
