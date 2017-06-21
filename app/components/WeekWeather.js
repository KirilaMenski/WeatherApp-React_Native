import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ListView,
  View,
} from 'react-native';

import api from './../utilities/api';
import date from './../utilities/date'

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class WeekWeather extends Component {

  constructor(props){
    super(props);
    this.state = {
      dailyWeather: ds,
      cityName: '',
    }
  }

  componentWillMount() {
    api.getDailyWeather().then((response) => {

      this.setState({
        dailyWeather: ds.cloneWithRows(response.list),
        cityName: response.city.name,
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
		return(
      <View style={styles.mainContainer}>
        <Text style={[styles.title, styles.font]}>{this.state.cityName}</Text>
          <ListView
            dataSource={this.state.dailyWeather}
            renderRow={(rowData) =>
              <View>
                <Text style={[styles.font, styles.date]}>{date.getDate(rowData.dt)}</Text>
                <View style={styles.containerView}>
                  <View style={styles.temp}>
                    <Text style={styles.font}>Morning: {Math.round(rowData.temp.morn - 273)} C</Text>
                    <Text style={styles.font}>Day: {Math.round(rowData.temp.day - 273)} C</Text>
                    <Text style={styles.font}>Night: {Math.round(rowData.temp.night - 273)} C</Text>
                  </View>
                  <View style={styles.description}>
                    <Text style={styles.font}>Pressure: {rowData.pressure} mm Hg</Text>
                    <Text style={styles.font}>Humidity: {rowData.humidity} %</Text>
                    <Text style={styles.font}>Wind: {rowData.speed} m/s</Text>
                  </View>
                  <Image source={{uri: 'http://openweathermap.org/img/w/' + rowData.weather[0].icon + '.png'}}
                    style={{width:50, height: 50}}/>
                </View>
              </View>
            }
          />
      </View>
		);
	}
}

const styles = StyleSheet.create({
  mainContainer:{
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  containerView:{
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
  },
  temp:{
    flex:1,
    borderRightWidth: 1,
  },
  description:{
    flex:1.5,
    paddingLeft: 10,
  },
  title:{
    fontSize: 20,
    textAlign: 'center',
  },
  date:{
    textAlign: 'center',
    paddingTop: 5,
  },
  font:{
    fontFamily: 'serif',
  },
});

export default WeekWeather;
