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

export default class AddModal extends Component {
  backgroundColors = [
    '#900c3f',
    '#ff5733',
    '#12947f',
    '#c70039',
    '#f5a090',
    '#511845',
    '#2fc4b2',
    '#f17808',
  ];
  state = {
    listName: '',
    color: this.backgroundColors[0],
  };

  createTodo() {
    const {name, color} = this.state;
    const id = !this.props.lists ? 0 : this.props.lists.length + 1;

    const list = {name, color, tasks: [], id};

    this.props.addList(list);

    this.setState({name: ''});
    this.props.closeModal();
  }

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
    fontSize: 30,
    fontWeight: '800',
    color: colors.red,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.black,
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
