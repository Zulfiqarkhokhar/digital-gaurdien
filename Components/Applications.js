import {icon} from '@fortawesome/fontawesome-svg-core';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {InstalledApps} from 'react-native-launcher-kit';
const Applications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchInstalledApps = () => {
      try {
        const res = InstalledApps.getApps();
        setApps(res);
        // console.log(res);
        console.log(icon);
      } catch (error) {
        console.error('Error fetching installed apps:', error);
      }
    };

    fetchInstalledApps();
  }, []);

  return (
    <View>
      <Text>Installed Apps:</Text>
      <FlatList
        data={apps}
        horizontal={false}
        renderItem={item => {
          return (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                style={{width: 50, height: 50}}
                source={{
                  uri: `data:image/png;base64,${item.item.icon}`,
                }}></Image>
              <Text style={{fontSize: 20, color: 'black'}}>
                {item.item.label}
              </Text>
            </View>
          );
        }}></FlatList>
    </View>
  );
};

export default Applications;
