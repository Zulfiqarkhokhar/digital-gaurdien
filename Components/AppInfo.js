import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {NativeModules} from 'react-native';

const AppInfoModule = NativeModules.AppInfoModule;

const AppInfo = () => {
  const [appList, setAppList] = useState([]);

  useEffect(() => {
    // Call the method to get all installed apps
    AppInfoModule.getAllInstalledApps(apps => {});
    setAppList(apps);
  }, []);

  const renderItem = ({item}) => (
    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
      <Image
        source={{uri: `data:image/png;base64,${item.icon}`}}
        style={{width: 50, height: 50, marginRight: 10}}
      />
      <View>
        <Text style={{fontSize: 16}}>{item.name}</Text>
        <Text style={{fontSize: 12, color: 'gray'}}>{item.packageName}</Text>
        <Text>Hello</Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, paddingTop: 50}}>
      <FlatList
        data={appList}
        renderItem={renderItem}
        keyExtractor={item => item.packageName}
      />
    </View>
  );
};

export default AppInfo;
