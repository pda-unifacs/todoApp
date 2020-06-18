import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import colors from '../Colors';
export default class Historic extends Component {
  renderList = list => {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 22, color: '#900c3f'}}>
          Título: <Text style={{color: colors.black}}>{list.name}</Text>
        </Text>
        <Text>Criado em: {list.date}</Text>
        <Text />
      </View>
    );
  };

  componentDidMount() {
    this.props.historicLists.reverse();
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>
            Histórico de <Text style={{color: '#900c3f'}}>Tarefas</Text>
          </Text>
        </View>
        <View style={{flex: 1, marginTop: 0, marginLeft: 20}}>
          <FlatList
            data={this.props.historicLists.reverse()}
            renderItem={({item}) => this.renderList(item)}
            keyExtractor={(item, index) => `list${item.id}-${index}`}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.black,
    paddingHorizontal: 64,
  },
});
