import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import colors from '../Colors';
import TaskModal from './TaskModal';

export default class Card extends Component {
  state = {
    showList: false,
  };

  toggleListModal() {
    this.setState({showList: !this.state.showList});
  }

  deleteAlert() {
    Alert.alert(
      `Deseja excluir ${this.props.list.name} ?`,
      'Ela será excluída permanentemente',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
        },
        {text: 'Sim', onPress: () => this.props.deleteTodo(this.props.list)},
      ],
      {cancelable: false},
    );
  }

  render() {
    const list = this.props.list;

    var completedCount = list.tasks.filter(task => task.completed).length
      ? list.tasks.filter(task => task.completed).length
      : 0;

    const remainingCount = list.tasks.length - completedCount;
    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showList}
          onRequestClose={() => this.toggleListModal()}>
          <TaskModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, {backgroundColor: list.color}]}
          onLongPress={() => this.deleteAlert()}
          onPress={() => this.toggleListModal()}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>À fazer</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Finalizadas</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});
