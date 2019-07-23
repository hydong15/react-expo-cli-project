import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

const APP_ID = 'ed47fd9ca2f0ce282cf330ecfd9fa587';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city')}`,
    };
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: true,
    };
  }
  
  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city');
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`)
    .then(response => response.json())
    .then(info => {
      this.setState({
        ...info,
        isLoading: false,
      });
    });
  }
  
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        <Text>loading...</Text>
        </View>
      )
    }
    
    console.log(JSON.stringify(this.state));
    let celsius = this.state.main.temp - 273.15;
    let weatherMain = this.state.weather[0].main;
    let iconId = this.state.weather[0].icon;
    
    return (
      <View style={styles.container}>
        <Text style={styles.temp}>{celsius.toFixed(1)}°</Text>
        <Text style={styles.main}>{weatherMain}</Text>
        <Image source={{uri: `http://openweathermap.org/img/wn/${iconId}@2x.png`, width: 200, height: 200}} style={styles.image}/>
      </View>
      );
    }
  }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
      },
      temp: {
        marginTop: 100,
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#397db1',
      },
      main: {
        margin: 0,
        fontSize: 40,
        textAlign: 'center',
        color: '#88b6d8',
      },
      image: {
        marginTop: 10,
        alignSelf: "center",
        backgroundColor: '#acacac',
      }
    });