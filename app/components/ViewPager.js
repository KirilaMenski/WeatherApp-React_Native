import React, { Component } from 'react';
import {
	ViewPagerAndroid,
  StyleSheet,
  View,
} from 'react-native';

import Root from './Root';
import WeekWeather from './WeekWeather';

class ViewPager extends Component {

	render() {

		return(
			<ViewPagerAndroid style={[styles.viewPager]} initialPage={0}>
        <Root style={styles.container}></Root>
        <WeekWeather style={styles.container}></WeekWeather>
			</ViewPagerAndroid>
		);
	}
}

const styles = StyleSheet.create({
    viewPager: {
      flex: 1,
    },
		container: {
			alignItems: 'center',
		}
});


export default ViewPager;
