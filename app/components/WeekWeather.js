import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';

import {
  StyleSheet,
  Text,
  Image,
  ListView,
  Button,
  View,
  ViewPagerAndroid,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import api from './../utilities/api';
import date from './../utilities/date'
import Root from './Root';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var pages = [];

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

class WeekWeather extends Component {

  constructor(props){
    super(props);
    this.state = {
      dailyWeather: ds,
      cityName: '',
      dataSource: [],
      isLoading: true,

      weather: [],
			icon: '',
			description: '',
			temp: '',
			pressure: '',
			humidity: '',
			wind:'',
      date:'',
    }
  }

  componentWillMount() {
    api.getDailyWeather().then((response) => {

      this.setState({
        dailyWeather: ds.cloneWithRows(response.list),
        cityName: response.city.name,
        dataSource: response.list,
        isLoading: false,

        weather:response.list[0].weather,
        icon:response.list[0].weather[0].icon,
        description:response.list[0].description,
        temp:Math.round(response.list[0].temp.day - 273),
        pressure:response.list[0].pressure,
        humidity:response.list[0].humidity,
        wind:response.list[0].speed,
        date:date.getDate(response.list[0].dt),
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {

    if(this.state.isLoading) {
      return(
        <ActivityIndicator />
      );
    }

    for(var i = 0; i < this.state.dataSource.length; i++){

      var rowData = this.state.dataSource[i];

      pages.push(

        <TouchableOpacity key={i} keyval={i} onPress={() => this.openWeather(i)} style={styles.touchableOpacity}>
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
              </View>
              <Image source={{uri: 'http://openweathermap.org/img/w/' + rowData.weather[0].icon + '.png'}}
                style={{width:80, height: 80}}/>
        </TouchableOpacity>

      );

    }

		return(

      <View style={styles.mainContainer}>
          <Root style={{flex: 2, backgroundColor: '#fff'}}
            weather = {this.state.weather}
            icon = {this.state.icon}
            cityName = {this.state.cityName}
            description = {this.state.description}
            temp = {this.state.temp}
            pressure = {this.state.pressure}
            humidity = {this.state.humidity}
            wind = {this.state.wind}
            date = {this.state.date}/>

          <Carousel ref={(carousel) => { this._carousel = carousel; }}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}>

            {pages}

          </Carousel>

      </View>
		);
	}

  openWeather(index){
    // alert('Index' + index)
    var rowData = this.state.dataSource[index - 1];
    this.setState({weather:rowData.weather,
      icon:rowData.weather[0].icon,
      description:rowData.description,
      temp:Math.round(rowData.temp.day - 273),
      pressure:rowData.pressure,
      humidity:rowData.humidity,
      wind:rowData.speed,
      date:date.getDate(rowData.dt),});
  }

}

const styles = StyleSheet.create({
  touchableOpacity:{
    flex: 1,
    backgroundColor: '#6ee9ef',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
    margin: 2,
  },
  mainContainer:{
    flex: 1,
    backgroundColor: '#ededed',
  },
  containerView:{
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  temp:{
    flex:1,
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
// <ListView
//   style={{flex: 1, backgroundColor:'#fff'}}
//   horizontal={true}
//   dataSource={this.state.dailyWeather}
//   renderRow={(rowData) =>
//     <TouchableOpacity onPress={()=>{
//       this.setState({weather:rowData.weather,
//         icon:rowData.weather[0].icon,
//         description:rowData.description,
//         temp:Math.round(rowData.temp.day - 273),
//         pressure:rowData.pressure,
//         humidity:rowData.humidity,
//         wind:rowData.speed,
//         date:date.getDate(rowData.dt),});
//     }}>
//       <Text style={[styles.font, styles.date]}>{date.getDate(rowData.dt)}</Text>
//       <View style={styles.containerView}>
//         <View style={styles.temp}>
//           <Text style={styles.font}>Morning: {Math.round(rowData.temp.morn - 273)} C</Text>
//           <Text style={styles.font}>Day: {Math.round(rowData.temp.day - 273)} C</Text>
//           <Text style={styles.font}>Night: {Math.round(rowData.temp.night - 273)} C</Text>
//         </View>
//         <View style={styles.description}>
//           <Text style={styles.font}>Pressure: {rowData.pressure} mm Hg</Text>
//           <Text style={styles.font}>Humidity: {rowData.humidity} %</Text>
//           <Text style={styles.font}>Wind: {rowData.speed} m/s</Text>
//         </View>
//         <Image source={{uri: 'http://openweathermap.org/img/w/' + rowData.weather[0].icon + '.png'}}
//           style={{width:50, height: 50}}/>
//       </View>
//     </TouchableOpacity>
//   }
// />
