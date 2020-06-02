import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../Colors';

export default class TaskModal extends Component {
  state = {
    newTask: '',
  };

  toogleTaskCompleted = index => {
    let list = this.props.list;
    list.tasks[index].completed = !list.tasks[index].completed;

    this.props.updateList(list);
  };

  addTask = () => {
    let list = this.props.list;
    list.tasks.push({title: this.state.newTask, completed: false});

    this.props.updateList(list);
    this.setState({newTask: ''});
  };

  renderTask = (task, index) => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => this.toogleTaskCompleted(index)}>
          <Text
            style={[task.completed ? styles.checkboxDone : styles.checkbox]}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.task,
            {
              textDecorationLine: task.completed ? 'line-through' : 'none',
              color: task.completed ? colors.grey : colors.black,
            },
          ]}>
          {task.title}
        </Text>
      </View>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.tasks.length;
    const completedCount = list.tasks.filter(task => task.completed).length;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 14, right: 22}}
          onPress={this.props.closeModal}>
          <Text style={{fontSize: 24}}>x</Text>
        </TouchableOpacity>
        <View
          style={[
            styles.section,
            styles.header,
            {borderBottomColor: list.color},
          ]}>
          <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} de {taskCount} tarefas
            </Text>
          </View>
        </View>
        <View style={[styles.section, {flex: 3}]}>
          <FlatList
            data={list.tasks}
            renderItem={({item, index}) => this.renderTask(item, index)}
            keyExtractor={item => item.title}
            contentContainerStyle={{
              paddingHorizontal: 28,
              paddingVertical: 64,
            }}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, {borderColor: list.color}]}
            onChangeText={text => this.setState({newTask: text})}
            value={this.state.newTask}
          />
          <TouchableOpacity
            style={[styles.addTask, {backgroundColor: list.color}]}
            onPress={() => this.addTask()}>
            <Text style={{fontSize: 16, color: '#fff'}}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    marginTop: 32,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.grey,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },

  addTask: {
    borderRadius: 4,
    padding: 14,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  taskContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    height: 10,
    width: 10,
    marginRight: 12,
    borderWidth: 2,
    borderRadius: 4,
  },

  checkboxDone: {
    height: 10,
    width: 10,
    marginRight: 12,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#000',
  },

  task: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },

  footer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    flexDirection: 'row',
  },
});
