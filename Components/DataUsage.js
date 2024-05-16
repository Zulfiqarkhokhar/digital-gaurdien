import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart, BarChart} from 'react-native-chart-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DataUsage = () => {
  const [wifiData, setWifiData] = useState([500, 600, 700, 300, 200, 800, 300]);
  const [mobileData, setMobileData] = useState([
    500, 200, 600, 300, 1000, 900, 300,
  ]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#190152',
          width: 370,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 25,
            fontWeight: 'bold',
          }}>
          Data Usage
        </Text>
      </View>
      <View style={{marginTop: 70, marginLeft: 10, marginRight: 10}}>
        <Text style={styles.chartTitle}>WiFi Usage</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: wifiData,
              },
            ],
          }}
          width={350}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
      <View style={{marginRight: 6}}>
        <Text style={styles.chartTitle}>Mobile Data Usage</Text>
        <BarChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: mobileData,
              },
            ],
          }}
          width={350}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#190152',
          width: 120,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 10,
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Set Data Limits</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    marginTop: 30,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
});

export default DataUsage;
