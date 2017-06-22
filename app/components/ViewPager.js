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
			// <ViewPagerAndroid style={[styles.viewPager]} initialPage={0}>
      //   <Root></Root>
      //   <WeekWeather></WeekWeather>
			// </ViewPagerAndroid>
			<View style={styles.viewPager}>
				<Root style={styles.root}/>
				<WeekWeather style={styles.weather}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    viewPager: {
      flex: 1,
    },
		root:{
			flex: 2,
		},
		list:{
			flex: 1,
		},
		container: {
			alignItems: 'center',
		}
});


export default ViewPager;
