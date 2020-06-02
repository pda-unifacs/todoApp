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
    name: this.props.list.name,
    color: this.props.list.color,
    tasks: this.props.list.tasks,
  };

  renderTask = task => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity>
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
    const taskCount = this.state.tasks.length;
    const completedCount = this.state.tasks.filter(task => task.completed)
      .length;

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
            {borderBottomColor: this.state.color},
          ]}>
          <View>
            <Text style={styles.title}>{this.state.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} de {taskCount} tarefas
            </Text>
          </View>
        </View>
        <View style={[styles.section, {flex: 3}]}>
          <FlatList
            data={this.state.tasks}
            renderItem={({item}) => this.renderTask(item)}
            keyExtractor={item => item.title}
            contentContainerStyle={{paddingHorizontal: 28, paddingVertical: 64}}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <KeyboardAwareScrollView
          behavior="padding"
          style={styles.section}
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 32,
            flexDirection: 'row',
          }}>
          <TextInput style={[styles.input, {borderColor: this.state.color}]} />
          <TouchableOpacity
            style={[styles.addTask, {backgroundColor: this.state.color}]}>
            <Text style={{fontSize: 16, color: '#fff'}}>+</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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
});
