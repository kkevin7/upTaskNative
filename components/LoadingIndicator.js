import React from 'react';
import { View, ActivityIndicator} from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E84347'}}>
      <ActivityIndicator size="large" color="#28303B" />
    </View>
  );
};

export default LoadingIndicator;
