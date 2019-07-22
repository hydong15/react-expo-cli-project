import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={[styles.textBig, styles.textBlue]}>Hello, world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textBig: {
    fontSize: 40,
  },
  textBlue: {
    color: 'blue',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
