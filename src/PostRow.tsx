import React from 'react';
import {Text, View} from 'react-native';

type PostItem = {
  title: string;
  image: string;
  date: string;
  author: string;
};

const PostRow = ({title, image, date, author}: PostItem) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{author}</Text>
    </View>
  );
};

export {PostRow};
