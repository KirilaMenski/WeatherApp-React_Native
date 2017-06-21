import React, { Component } from 'react';
import {
	ActivityIndicator,
	Text,
	StyleSheet,
	ViewPagerAndroid,
	View,
	Image,
} from 'react-native';

import api from './../utilities/api';
import date from './../utilities/date'

class Root extends Component {
	constructor(props){
		super(props);
		this.state = {
			weather: [],
			icon: '',
			cityName: '',
			description: '',
			temp: '',
			pressure: '',
			humidity: '',
			wind:''
		}
	}

	componentWillMount() {
			api.getWeather().then((response) => {
				this.setState({
					cityName: response.name,
					weather: response.weather,
					icon: response.weather[0].icon,
					description: response.weather[0].description,
					temp: Math.round(response.main.temp - 273),
					pressure: response.main.pressure,
					humidity: response.main.humidity,
					wind: response.wind.speed,
					date: response.dt,
				})
			});
	}

	render() {

		let pic = {
			uri: 'http://openweathermap.org/img/w/' + this.state.icon + '.png'
		};

		return(
				<Image source={require('./../resources/images/few_clouds.jpg')} style={styles.container}>
					<Text style={[styles.description, styles.marginTop]}>
						{date.getDate(this.state.date)}
					</Text>
					<View style={[styles.weatherView]}>
						<Text style={styles.title}>
							{this.state.cityName}
						</Text>
						<Image source={pic} style={styles.iconStyle}/>
						<Text style={[styles.description, styles.font]}>
							{this.state.description}
						</Text>
						<Text style={styles.description}>
							Temperature: {this.state.temp} C
						</Text>
						<Text style={styles.description}>
							Pressure: {this.state.pressure} mm Hg
						</Text>
						<Text style={[styles.description, styles.font]}>
							Humidity: {this.state.humidity} %
						</Text>
						<Text style={[styles.description, styles.font]}>
							Wind: {this.state.wind} m/s
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
			justifyContent: 'center',
			backgroundColor: 'transparent'
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
		},
		description:{
			fontSize: 20,
		},
		font:{
			fontFamily: 'serif',
		},
		marginTop:{
			margin: 20,
		}
});


export default Root;
