import React from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
const RateForm = () => {
    const customIcons = {
        1: <FrownOutlined />,
        2: <FrownOutlined />,
        3: <MehOutlined />,
        4: <SmileOutlined />,
        5: <SmileOutlined />,
      };
    return (
        <div>
            <h3>Doctor</h3>
            <p>How do you feel?</p>
            <Rate defaultValue={3} character={({ index }) => customIcons[index + 1]} />
        </div>
    );
}

export default RateForm;
