import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {getTransactionList} from '../services';

const RenderItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      key={item.key}
      onPress={() => navigation.navigate('Transaction Detail', item)}>
      <View style={styles.itemData}>
        <Text style={styles.itemBank}>
          {item?.sender_bank}{' '}
          <Icon name="arrow-forward" size={12} color="#000" />{' '}
          {item?.beneficiary_bank}
        </Text>
        <Text>{item.beneficiary_name}</Text>
        <Text style={styles.itemInfo}>
          {item?.amount} <Icon name="arrow-forward" size={12} color="#000" />{' '}
          {item?.completed_at}
        </Text>
      </View>
      <View style={styles.itemStatus}>
        <Text>{item?.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const TrxList = ({navigation}) => {
  const [baseData, setBaseData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    try {
      setIsLoading(true);
      const res = getTransactionList();
      if (res) {
        // convert getTransactionList to array
        const arrData = Object.keys(res).map(key => res[key]);
        setBaseData(arrData);
        setData(arrData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (search) {
      handleSearch();
    } else {
      setData(baseData);
    }
  }, [search]);

  const handleSearch = () => {
    const searchText = search.toLowerCase();

    const filteredData = baseData.filter(item => {
      console.log({searchText, am: item.amount});
      return (
        item?.beneficiary_name?.toLowerCase().includes(searchText) ||
        item?.sender_bank?.toLowerCase().includes(searchText) ||
        item?.beneficiary_bank?.toLowerCase().includes(searchText) ||
        item?.amount?.toString()?.includes(searchText)
      );
    });
    setData(filteredData);
  };

  const handleChangeSearch = (text: string) => {
    setSearch(text);
  };

  // const handleSort = () => {

  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbarContainer}>
        <Icon name="search" size={12} color="#000" />
        <TextInput
          value={search}
          onChangeText={value => handleChangeSearch(value)}
          placeholder="Cari nama, bank, atau nominal"
        />
        <Button title="URUTKAN" />
      </View>
      <FlatList
        style={styles.listContainer}
        data={data}
        renderItem={props => <RenderItem {...props} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  toolbarContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
  },
  listContainer: {
    marginVertical: 12,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 8,
    flexDirection: 'row',
  },
  itemData: {
    flex: 1,
  },
  itemStatus: {},
  itemBank: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#000',
    marginTop: 4,
    fontWeight: 'bold',
  },
  itemInfo: {},
});

export default TrxList;
