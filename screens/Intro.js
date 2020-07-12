import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import * as theme from '../theme'

const slides = [
  {
    key: 'one',
    title: 'Covid19 Monitoring',
    text: '',
    image: require('../assets/appcovid.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: '',
    text: 'Lindungi Keluarga Tercinta \n\n Pantau kondisi covid19 di sekitar anda',
    image: require('../assets/slide1.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: '',
    text: 'Akses Map Covid19 secara realtime \n\n dan mulai pantau sekarang.',
    image: require('../assets/slide3.png'),
    backgroundColor: '#22bcb5',
  }
];

const App = (props) => {

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };


  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const _renderItem = ({ item }) => {
    return (
      <ImageBackground style={styles.slide} source={require('../assets/bg.jpg')}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={{ height: 250, width: 250 }} />
        <View>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <Text></Text>
      </ImageBackground>
    );
  }
  return (
    <AppIntroSlider
      dotStyle={styles.active}
      renderNextButton={_renderNextButton}
      renderDoneButton={_renderDoneButton}
      activeDotStyle={styles.activeDot}
      renderItem={_renderItem}
      data={slides}
      onDone={() => props.navigation.navigate('Login')}
    />
  )

}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.black
  },
  text: {
    textAlign: 'center',
    color: theme.colors.black,
    fontSize: 18,
  },
  activeDot: {
    backgroundColor: 'blue'
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#27AE60',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    width: 40,
    height: 40,
    backgroundColor: '#27AE60',
    borderRadius: 20,
  }
})


export default App 