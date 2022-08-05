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
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {getTransactionList} from '../services';

const optSort = [
  {label: 'Nama A-Z', value: 'name_asc'},
  {label: 'Nama Z-A', value: 'name_desc'},
  {label: 'Tanggal Terbaru', value: 'date_desc'},
  {label: 'Tanggal Terlama', value: 'date_asc'},
];

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
          {item?.created_at}
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
  const [modalSort, setModalSort] = useState(false);

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

  useEffect(() => {
    if (sort) {
    } else {
      setData(baseData);
    }
  }, [sort]);

  const handleSearch = () => {
    const searchText = search.toLowerCase();

    const filteredData = baseData.filter(item => {
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

  const handleSort = (sortValue: string) => {
    let sortedData = [...baseData];
    if (sortValue === 'name_asc') {
      sortedData = baseData.sort((a, b) => {
        if (a.beneficiary_name < b.beneficiary_name) {
          return -1;
        }
        if (a.beneficiary_name > b.beneficiary_name) {
          return 1;
        }
        return 0;
      });
    }
    if (sortValue === 'name_desc') {
      sortedData = baseData.sort((a, b) => {
        if (a.beneficiary_name > b.beneficiary_name) {
          return -1;
        }
        if (a.beneficiary_name < b.beneficiary_name) {
          return 1;
        }
        return 0;
      });
    }
    if (sortValue === 'date_desc') {
      sortedData = baseData.sort((a, b) => {
        if (a.created_at > b.created_at) {
          return -1;
        }
        if (a.created_at < b.created_at) {
          return 1;
        }
        return 0;
      });
    }
    if (sortValue === 'date_asc') {
      sortedData = baseData.sort((a, b) => {
        if (a.created_at < b.created_at) {
          return -1;
        }
        if (a.created_at > b.created_at) {
          return 1;
        }
        return 0;
      });
    }

    setData(sortedData);
    setSort(sortValue);
    setModalSort(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbarContainer}>
        <Icon name="search" size={12} color="#000" />
        <TextInput
          value={search}
          onChangeText={value => handleChangeSearch(value)}
          placeholder="Cari nama, bank, atau nominal"
        />
        <Button onPress={() => setModalSort(true)} title="URUTKAN" />
      </View>
      <FlatList
        style={styles.listContainer}
        data={data}
        renderItem={props => <RenderItem {...props} />}
      />
      <Modal
        transparent={true}
        visible={modalSort}
        onRequestClose={() => setModalSort(false)}>
        <View style={styles.modalCenter}>
          <View style={styles.modalContent}>
            {optSort.map((item, i) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleSort(item.value)}
                key={i}>
                <Icon
                  name={
                    item.value === sort
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={14}
                  color="#000"
                />
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    backgroundColor: 'red',
  },
  modalCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalItem: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
});

export default TrxList;
