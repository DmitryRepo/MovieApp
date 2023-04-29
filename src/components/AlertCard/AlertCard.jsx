import React from 'react';
import { Result } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import './AlertCard.css'

const AlertCard = () => (
    <div className="movie-card">
      <Result size="small" icon={<FrownOutlined />} title="We've lost this film and we decided to reshoot it ourself" />
    </div>
);

export default AlertCard;