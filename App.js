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
import Card from './components/Card';
import AddModal from './components/AddModal';
import AsyncStorage from '@react-native-community/async-storage';
import Historic from './components/Historic';
export default class App extends Component {
  state = {
    modalVisible: false,
    historicVisible: false,
    lists: [],
    historicLists: [],
  };
  getData = async () => {
    let todos = await AsyncStorage.getItem('todos');
    this.setState({lists: JSON.parse(todos)});

    let historicTodos = await AsyncStorage.getItem('historic');

    if (historicTodos == null) {
      historicTodos = [];
    } else {
      this.setState({historicLists: JSON.parse(historicTodos)});
    }
  };

  componentDidMount() {
    this.getData();
    console.log(this.state.historicLists);
  }

  toogleAddTodoModal() {
    this.setState({modalVisible: !this.state.modalVisible});
  }
  toogleHistoricModal() {
    this.setState({historicVisible: !this.state.historicVisible});
  }

  renderList = list => {
    return (
      <Card
        list={list}
        updateList={this.updateList}
        deleteTodo={this.deleteTodo}
      />
    );
  };

  getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return date + '/' + month + '/' + year;
  };

  addList = async list => {
    const existingTodos = await AsyncStorage.getItem('todos');
    const existingHistoric = await AsyncStorage.getItem('historic');

    const date = this.getCurrentDate();

    let newTodo = JSON.parse(existingTodos);
    let newHistoric = JSON.parse(existingHistoric);
    if (!newTodo) {
      newTodo = [];
    }
    if (!newHistoric) {
      newHistoric = [];
    }

    newTodo.push(list);
    newHistoric.push({name: list.name, date});

    console.log('HISTORICO', newHistoric);

    await AsyncStorage.setItem('historic', JSON.stringify(newHistoric))
      .then(() => {
        console.log('Salvou');
      })
      .catch(() => {
        console.log('Erro');
      });

    await AsyncStorage.setItem('todos', JSON.stringify(newTodo))
      .then(() => {
        console.log('Salvou');
      })
      .catch(() => {
        console.log('Erro');
      });
    this.getData();
  };

  updateList = async list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      }),
    });

    await AsyncStorage.setItem('todos', JSON.stringify(this.state.lists))
      .then(() => {
        console.log('Atualizou');
      })
      .catch(() => {
        console.log('Erro');
      });
    this.getData();
  };

  deleteTodo = async list => {
    const existingTodos = await AsyncStorage.getItem('todos');
    const todos = JSON.parse(existingTodos);
    console.log(list);
    console.log(todos);

    todos.splice(todos.findIndex(item => item.id === list.id), 1);

    await AsyncStorage.setItem('todos', JSON.stringify(todos))
      .then(() => {
        console.log('Excluiu');
      })
      .catch(() => {
        console.log('Erro');
      });

    this.getData();
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <Modal
            animationType="slide"
            visible={this.state.modalVisible}
            onRequestClose={() => this.toogleAddTodoModal()}>
            <AddModal
              closeModal={() => this.toogleAddTodoModal()}
              addList={this.addList}
              lists={this.state.lists}
            />
          </Modal>
          <Modal
            animationType="slide"
            visible={this.state.historicVisible}
            onRequestClose={() => this.toogleHistoricModal()}>
            <Historic
              closeModal={() => this.toogleHistoricModal()}
              historicLists={this.state.historicLists}
            />
          </Modal>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.divider} />
            <Text style={styles.title}>
              Mobile
              <Text style={{fontWeight: '600', color: '#900c3f'}}>Notes</Text>
            </Text>
            <View style={styles.divider} />
          </View>

          <View style={{marginTop: 48}}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.toogleAddTodoModal()}>
              <Text style={{fontSize: 16, color: colors.red}}>+</Text>
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
            {!this.state.lists ? (
              <View>
                <Text
                  style={
                    (styles.title,
                    {fontSize: 18, marginRight: 24, marginTop: 44})
                  }>
                  Você não possui nenhuma tarefa :(
                </Text>
              </View>
            ) : (
              <View />
            )}

            <FlatList
              data={this.state.lists}
              keyExtractor={(item, index) => `list${item.id}-${index}`}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => this.renderList(item)}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#f4f4f4',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => this.toogleHistoricModal()}>
            <Text style={styles.addText}>Ver Histórico</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightRed,
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
    borderColor: colors.lightRed,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: colors.red,
    fontWeight: '800',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 20,
  },
});
