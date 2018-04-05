import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import PropTypes from 'prop-types';

export default class Example extends Component {
    render() {
        <ActionBar
            backgroundColor={'#3B373C'}
            leftIconName={'menu'}
            onLeftPress={this.handleLeftAction}
            leftBadge={1}
            leftText={'Left'}
            title={'Title'}
            onTitlePress={this.handleTitlePress}
            rightIconName={'star'}
            onRightPress={this.handleRightAction}
            rightText={'Right'}
            rightBadge={4}
        />
    }
}