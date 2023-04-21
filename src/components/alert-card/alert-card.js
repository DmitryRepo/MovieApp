import React from 'react';
import { Result, Card } from 'antd';
import { FrownOutlined } from '@ant-design/icons';

const AlertCard = () => (
    <Card className="movies-list_card" bordered="false" style={{ width: '100%', height: '100%' }} size="small" hoverable="true">
      <Result size="small" icon={<FrownOutlined />} title="We've lost this film and we decided to reshoot it ourself" />
    </Card>
);

export default AlertCard;