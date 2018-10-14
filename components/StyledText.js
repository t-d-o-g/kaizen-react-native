/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import { Text } from 'react-native';

export default class MonoText extends React.Component {
  render() {
    const { style } = this.props;
    return <Text {...this.props} style={[style, { fontFamily: 'space-mono' }]} />;
  }
}
