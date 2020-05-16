import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';

import colors from './Colors';
import tempData from './tempData';
import TodoList from './components/Card';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo
            <Text style={{fontWeight: '300', color: colors.blue}}>List</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{marginTop: 48}}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={{fontSize: 16, color: colors.blue}}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.addText}>Adicionar</Text>
        </View>

        <View
          style={{
            height: 275,
            paddingLeft: 32,
          }}>
          <FlatList
            data={tempData}
            keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <TodoList list={item} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.black,
    paddingHorizontal: 64,
  },
  addButton: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: colors.blue,
    fontWeight: '800',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 20,
  },
});
