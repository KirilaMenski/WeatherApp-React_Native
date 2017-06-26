import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	ViewPagerAndroid,
	View,
	Image,
} from 'react-native';

import background from './../utilities/backgroundUtils';

class Root extends Component {

	render() {

		let pic = {
			uri: 'http://openweathermap.org/img/w/' + this.props.icon + '.png'
		};

		return(

				<Image source={background.getIcon(this.props.icon)} style={styles.container}>
					<Text style={[styles.description, styles.marginTop, styles.font]}>
						{this.props.date}
					</Text>
					<View style={[styles.weatherView]}>
						<Text style={styles.title}>
							{this.props.cityName}
						</Text>
						<Image source={pic} style={styles.iconStyle}/>
						<Text style={[styles.description, styles.font]}>
							{this.props.description}
						</Text>
						<Text style={[styles.description, styles.font]}>
							Temperature: {this.props.temp} C
						</Text>
						<Text style={[styles.description , styles.font]}>
							Pressure: {this.props.pressure} mm Hg
						</Text>
						<Text style={[styles.description, styles.font]}>
							Humidity: {this.props.humidity} %
						</Text>
						<Text style={[styles.description, styles.font]}>
							Wind: {this.props.wind} m/s
						</Text>
					</View>
				</Image>
		);
	}
}

const styles = StyleSheet.create({
		container: {
			width: null,
			height: null,
			alignItems: 'center',
		},
		weatherView:{
			alignItems: 'center',
			justifyContent: 'center',
		},
		iconStyle:{
			width: 150,
			height: 150,
		},
		title:{
			fontSize: 40,
			color: '#ffffff'
		},
		description:{
			fontSize: 20,
		},
		font:{
			fontFamily: 'serif',
			color: '#ffffff',
		},
		marginTop:{
			margin: 20,
		}
});


export default Root;
