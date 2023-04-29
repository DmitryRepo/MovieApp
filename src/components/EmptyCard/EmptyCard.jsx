import React from 'react';
import { Empty } from 'antd';

const EmptyCard = ({ description }) => (
  <Empty
    size="large"
    description={description}
    style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    imageStyle={{
      height: 200,
    }}
    className="movies-list movies-list_empty"
  />
);

export default EmptyCard;

