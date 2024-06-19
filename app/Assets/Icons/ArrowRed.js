import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ArrowRedoOutlineSVG = () => {
  return (
    <View>
      <Svg height="124" width="124" viewBox="0 0 24 24">
        <Path
          fill="#000000"
          d="M14 17V19H6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2v2H7v4h6v-3.586l5.293 5.293 1.414-1.414L14 17z"
        />
        <Path d="M17.293 7.293L12 12.586V9a1 1 0 0 0-1-1H5a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0V7.414l-5.293 5.293-1.414-1.414L10 4.586A1 1 0 0 1 11.414 4L17.293 9.879a1 1 0 0 1 0 1.414z" />
      </Svg>
    </View>
  );
};

export default ArrowRedoOutlineSVG;
