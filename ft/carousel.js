import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const {width} = Dimensions.get('window');
const height = width * 0.8;

class Carousel extends React.Component {
  render() {
    const { images } = this.props;
    if (images && images.length) {
      return (
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {images.map((image, i) => (
              <Image key={i} style={styles.image} source={image.source} />
            ))}
          </ScrollView>
        </View>
      );
    }
    console.log('Please provide images');
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height,
  },
  image: {
    width,
    height,
  },
});

export default Carousel;
