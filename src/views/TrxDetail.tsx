import React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TrxDetail = ({route}) => {
  const data = route.params;
  console.log({data});
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailContainer}>
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>ID TRANSAKSI: #{data.id}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>DETAIL TRANSAKSI</Text>
          <Text style={styles.detailClose}>Tutup</Text>
        </View>
        <View style={styles.detailSection}>
          <View>
            <View>
              <Text style={styles.detailTransaction}>
                {data?.sender_bank}{' '}
                <Icon name="arrow-forward" size={18} color="#000" />{' '}
                {data?.beneficiary_bank}
              </Text>
            </View>

            <View style={styles.detailDataWrapper}>
              <View style={styles.detailDataItem}>
                <Text style={styles.detailDataLabel}>
                  {data.beneficiary_name}
                </Text>
                <Text style={styles.detailDataValue}>
                  {data.account_number}
                </Text>
              </View>

              <View style={styles.detailDataItem}>
                <Text style={styles.detailDataLabel}>Nominal</Text>
                <Text style={styles.detailDataValue}>{data.amount}</Text>
              </View>

              <View style={styles.detailDataItem}>
                <Text style={styles.detailDataLabel}>Berita Transfer</Text>
                <Text style={styles.detailDataValue}>{data.remark}</Text>
              </View>

              <View style={styles.detailDataItem}>
                <Text style={styles.detailDataLabel}>Kode Unik</Text>
                <Text style={styles.detailDataValue}>{data.unique_code}</Text>
              </View>

              <View style={styles.detailDataItem}>
                <Text style={styles.detailDataLabel}>Waktu Dibuat</Text>
                <Text style={styles.detailDataValue}>{data.completed_at}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  detailContainer: {
    backgroundColor: '#fff',
    marginVertical: 16,
  },
  detailSection: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#d2d2d2',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailClose: {
    color: '#f26947',
  },
  detailTransaction: {
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#000',
    marginTop: 4,
    fontWeight: 'bold',
  },
  detailDataWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailDataItem: {
    width: '50%',
    marginVertical: 16,
  },
  detailDataLabel: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  detailDataValue: {},
});

export default TrxDetail;
