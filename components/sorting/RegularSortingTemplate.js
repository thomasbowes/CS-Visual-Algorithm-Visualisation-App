import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Alert} from 'react-native';
import ScreenTitle from '../shared/ScreenTitle';
import {PURPLE, WHITE} from '../../constants/colors';
import NumberBar from './NumberBar';
import BlueButton from '../shared/BlueButton';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const MAX_BAR_LENGTH = 50;
const NUMBER_BAR_WIDTH = 17;
const NUMBER_BAR_WIDTH_WITH_MARGIN = NUMBER_BAR_WIDTH * 2;
const DEFAULT_HORIZ_OFFSET = 1;

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

const RegularSortingTemplate = (props) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [numberArray, setNumberArray] = useState([]);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [runningAnimation, setRunningAnimation] = useState(false);
  const [sortComplete, setSortComplete] = useState(false);
  const [animationWaitTime, setAnimationWaitTime] = useState(0);

  useEffect(() => {
    generateNumberBars();
  }, [containerHeight]);

  useEffect(() => {
    // Keeps track if component unmounts during useEffect
    let mounted = true;

    // Generate sorting steps
    if (!sortComplete && !sortingSteps.length && numberArray.length) {
      setSortingSteps(
        props.sortingAlgorithm([...numberArray.map((item) => item.number)]),
      );
      return;
    }

    // Run next animation
    if (runningAnimation) {
      if (sortingSteps.length == 1) {
        setTimeout(() => {
          if (mounted) {
            setRunningAnimation(false);
            setSortComplete(true);
          }
        }, animationWaitTime);
      }

      setTimeout(() => {
        if (mounted) {
          displayNextStep();
          setSortingSteps((prevState) => {
            return prevState.slice(1);
          });
        }
      }, animationWaitTime);
    }

    return () => {
      mounted = false;
    };
  }, [sortingSteps, runningAnimation]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      setAnimationWaitTime(0);
      setRunningAnimation(false);
      setSortingSteps([]);
      setSortComplete(true);
    };
  }, []);

  const generateNumberBars = () => {
    let numberOfBars = Math.floor(
      containerHeight / NUMBER_BAR_WIDTH_WITH_MARGIN,
    );
    let newNumberArray = [];

    for (let i = 0; i < numberOfBars; i++) {
      newNumberArray.push({
        number: Math.floor(Math.random() * (MAX_BAR_LENGTH - 10)) + 11,
        isComplete: false,
        isCompared: false,
        isPivot: false,
        isHidden: false,
        halfWidth: false,
        verticalLocationOffset: 1 + i * NUMBER_BAR_WIDTH_WITH_MARGIN,
        horizontalLocationOffset: DEFAULT_HORIZ_OFFSET,
        numberBarID: i,
        position: i,
      });
    }

    setNumberArray(newNumberArray);
  };

  const displayNumberBarHandler = () => {
    return numberArray.map((numberBar, index) => {
      return (
        <NumberBar
          redBarColor={numberBar.isCompared}
          greenBarColor={numberBar.isComplete}
          grayBarColor={numberBar.isHidden}
          yellowBarColor={numberBar.isPivot}
          barwidth={NUMBER_BAR_WIDTH}
          yOffset={numberBar.verticalLocationOffset}
          xOffset={numberBar.horizontalLocationOffset}
          length={numberBar.number}
          key={index}
          halfWidth={numberBar.halfWidth}
        />
      );
    });
  };

  // There can be index overlap when there are items on both the right and left
  // This gets index of the one on the left
  const getIndex = (position) => {
    return numberArray.findIndex((item) => {
      return (
        item.position == position &&
        item.horizontalLocationOffset == DEFAULT_HORIZ_OFFSET
      );
    });
  };

  // There can be index overlap when there are items on both the right and left
  // This gets index of the one on the right
  const getIndexOnRight = (position) => {
    return numberArray.findIndex((item) => {
      return (
        item.position == position &&
        item.horizontalLocationOffset !== DEFAULT_HORIZ_OFFSET
      );
    });
  };

  // Swaps Numbers Around by position
  const swapNumbers = (position1, position2) => {
    let index1 = getIndex(position1);
    let index2 = getIndex(position2);
    let difference = 0;

    setNumberArray((prevState) => {
      let newNumberArray = [...prevState];
      newNumberArray[index1].position = position2;
      newNumberArray[index2].position = position1;

      difference =
        newNumberArray[index1].verticalLocationOffset -
        newNumberArray[index2].verticalLocationOffset;

      newNumberArray[index1].verticalLocationOffset =
        newNumberArray[index1].verticalLocationOffset - difference;

      newNumberArray[index2].verticalLocationOffset =
        newNumberArray[index2].verticalLocationOffset + difference;

      return newNumberArray;
    });

    setAnimationWaitTime(500);
  };

  // Marks number bars red to indicate comparison
  const compareNumbers = (positions) => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < positions.length; i++) {
        let index = getIndex(positions[i]);
        newNumberArray[index].isCompared = true;
      }

      return newNumberArray;
    });

    setAnimationWaitTime(500);
  };

  // Removes color visual from compared number bars
  const stopCompareNumbers = (positions) => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < positions.length; i++) {
        let index = getIndex(positions[i]);
        newNumberArray[index].isCompared = false;
      }

      return newNumberArray;
    });

    setAnimationWaitTime(0);
  };

  // Changes bar color to indicate to use that the bar has been sorted
  const markSorted = (positions, waitTime) => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < positions.length; i++) {
        let index = getIndex(positions[i]);
        newNumberArray[index].isComplete = true;
      }

      return newNumberArray;
    });

    if (waitTime) {
      setAnimationWaitTime(500);
    } else {
      setAnimationWaitTime(0);
    }
  };

  // Changes bar color to indicate to use that the bar is the pivot
  const markPivot = (positions) => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < positions.length; i++) {
        let index = getIndex(positions[i]);
        newNumberArray[index].isPivot = true;
      }

      return newNumberArray;
    });

    setAnimationWaitTime(500);
  };

  // Changes bar color to indicate to use that the bar is no longer the pivot
  const unmarkPivot = (positions) => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < positions.length; i++) {
        let index = getIndex(positions[i]);
        newNumberArray[index].isPivot = false;
      }

      return newNumberArray;
    });

    setAnimationWaitTime(500);
  };

  // Changes bar color to grey so that in algorithms such as merge sort
  // Indicating the sub partions used by the algorithms
  const markHidden = (positions) => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < positions.length; i++) {
        let index = getIndex(positions[i]);
        newNumberArray[index].isHidden = true;
      }

      return newNumberArray;
    });

    setAnimationWaitTime(0);
  };

  // Removes grey color so that in algorithms such as merge sort
  const markUnhidden = (positions) => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < positions.length; i++) {
        let index = getIndex(positions[i]);
        newNumberArray[index].isHidden = false;
      }

      return newNumberArray;
    });

    setAnimationWaitTime(0);
  };

  // Moves number bars to the right of the screen
  const moveToRightSide = (positions) => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < positions.length; i++) {
        let index = getIndex(positions[i]);
        newNumberArray[index].horizontalLocationOffset = 0.45 * WIDTH;
      }

      return newNumberArray;
    });

    setAnimationWaitTime(500);
  };

  // halve the size of number bars for the merge sort algorithm
  const shrinkNumberBars = () => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < newNumberArray.length; i++) {
        newNumberArray[i].halfWidth = true;
      }

      return newNumberArray;
    });
    setAnimationWaitTime(500);
  };

  // Expand the size of number bars to full size for merge sort algorithm
  const expandNumberBars = () => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];

      for (let i = 0; i < newNumberArray.length; i++) {
        newNumberArray[i].halfWidth = false;
      }

      return newNumberArray;
    });
    setAnimationWaitTime(500);
  };

  // Moves items on the right to left to a selected position
  const moveToLeftSideAndNewPosition = (position, newPosition) => {
    setNumberArray((prevArray) => {
      let newNumberArray = [...prevArray];
      let index = getIndexOnRight(position);
      let oldPos = newNumberArray[index].position;

      newNumberArray[index].position = newPosition;
      newNumberArray[index].horizontalLocationOffset = DEFAULT_HORIZ_OFFSET;
      newNumberArray[index].verticalLocationOffset =
        newNumberArray[index].verticalLocationOffset +
        (newPosition - Math.abs(oldPos)) * NUMBER_BAR_WIDTH_WITH_MARGIN;

      return newNumberArray;
    });

    setAnimationWaitTime(500);
  };

  // Determines next animation and runs it
  const displayNextStep = () => {
    if (sortingSteps.length == 0) {
      return;
    }

    let nextStep = sortingSteps[0];
    let nextStepType = nextStep.stepType;

    if (nextStepType == COMPARE_NUMS) {
      compareNumbers(nextStep.numberIndexs);
    }

    if (nextStepType == STOP_COMPARE_NUMS) {
      stopCompareNumbers(nextStep.numberIndexs);
    }

    if (nextStepType == SWAP_NUMS) {
      swapNumbers(nextStep.numberIndexOne, nextStep.numberIndexTwo);
    }

    if (nextStepType == MARK_SORTED) {
      markSorted(nextStep.numberIndexs, nextStep.animationWaitTime);
    }

    if (nextStepType == MARK_HIDDEN_NUMS) {
      markHidden(nextStep.numberIndexs);
    }

    if (nextStepType == UNMARK_HIDDEN_NUMS) {
      markUnhidden(nextStep.numberIndexs);
    }

    if (nextStepType == MARK_PIVOT) {
      markPivot(nextStep.numberIndexs);
    }

    if (nextStepType == UNMARK_PIVOT) {
      unmarkPivot(nextStep.numberIndexs);
    }

    if (nextStepType == MOVE_TO_LEFT_AND_NEW_POS) {
      moveToLeftSideAndNewPosition(
        nextStep.numberIndex,
        nextStep.newNumberIndex,
      );
    }

    if (nextStepType == MOVE_TO_RIGHT) {
      moveToRightSide(nextStep.numberIndexs);
    }

    if (nextStepType == SHRINK_NUM_BARS) {
      shrinkNumberBars();
    }

    if (nextStepType == EXPAND_NUM_BARS) {
      expandNumberBars();
    }

    return;
  };

  return (
    <View style={styles.container}>
      <ScreenTitle>{props.pageTitle}</ScreenTitle>

      <View
        style={styles.numberBarContainer}
        onLayout={(event) => {
          var {height} = event.nativeEvent.layout;
          setContainerHeight(height);
        }}>
        {displayNumberBarHandler()}
      </View>

      {!sortComplete && !runningAnimation ? (
        <BlueButton
          title="Sort It!"
          onPress={() => {
            setRunningAnimation(true);
          }}
        />
      ) : !runningAnimation ? (
        <BlueButton
          title="Reset"
          onPress={() => {
            setSortComplete(false);
            generateNumberBars();
          }}
        />
      ) : (
        <BlueButton title="Sorting..." disabled={true} onPress={() => {}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBarContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '90%',
    position: 'relative',
  },
  numberBar: {
    backgroundColor: PURPLE,
    height: HEIGHT * 0.02,
    marginVertical: HEIGHT * 0.015,
    borderRadius: 7,
  },
});

export default RegularSortingTemplate;
