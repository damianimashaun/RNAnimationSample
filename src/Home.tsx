import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const POSTS_URL = 'https://6307df2c46372013f5732d41.mockapi.io/post';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isRequestFailed, setRequestFailed] = useState(false);

  const fetchPosts = () => {
    setLoading(true);
    setRequestFailed(false);

    axios
      .get(POSTS_URL)
      .then(({data}) => {
        setPosts(data);
      })
      .catch(_err => {
        setRequestFailed(true);
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={s.container}>
      {isLoading && (
        <View style={[s.centered, s.container]}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!isLoading && !isRequestFailed && (
        <FlatList
          data={posts}
          renderItem={({item}: {item: any}) => {
            return <Text>{item.title}</Text>;
          }}
        />
      )}
      {!isLoading && isRequestFailed && (
        <View style={[s.centered, s.container]}>
          <TouchableOpacity onPress={fetchPosts}>
            <Text>Request failed. Tap to try again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export {Home};
