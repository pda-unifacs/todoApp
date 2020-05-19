import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import colors from '../Colors';
import tempData from '../tempData';

export default class ModaList extends Component {
  backgroundColors = [
    '#000',
    '#f00',
    '#0f0',
    '#00f',
    '#f5a090',
    '#993',
    '#223',
  ];
  state = {
    listName: '',
    color: this.backgroundColors[0],
  };

  createTodo = () => {
    const {name, color} = this.state;

    tempData.push({
      name,
      color,
      tasks: [],
    });
    this.setState({name: ''});
    this.props.closeModal();
  };

  renderColors() {
    return this.backgroundColors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, {backgroundColor: color}]}
          onPress={() => this.setState({color})}
        />
      );
    });
  }
  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}>
        <TouchableOpacity
          style={{position: 'absolute', top: 44, right: 32}}
          onPress={this.props.closeModal}>
          <Text style={{fontSize: 24}}>x</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
          <Text style={styles.title}>Criar Tarefas</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui o nome da lista"
            onChangeText={text => this.setState({name: text})}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 14,
            }}>
            {this.renderColors()}
          </View>
          <TouchableOpacity
            style={[styles.create, {backgroundColor: this.state.color}]}
            onPress={() => this.createTodo()}>
            <Text style={{color: colors.white, fontWeight: '600'}}>Criar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 0.4,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});