import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import colors from './Colors';
import tempData from './tempData';
import TodoList from './components/Card';
import Card from './components/Card';
import ModalList from './components/ModalList';
export default class App extends Component {
  state = {
    modalVisible: false,
  };

  toogleAddTodoModal() {
    this.setState({modalVisible: !this.state.modalVisible});
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => this.toogleAddTodoModal()}>
          <ModalList closeModal={() => this.toogleAddTodoModal()} />
        </Modal>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo
            <Text style={{fontWeight: '300', color: colors.blue}}>List</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{marginTop: 48}}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.toogleAddTodoModal()}>
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
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Card list={item} />}
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
