import React, { useEffect, useState } from 'react';
import { Divider, List, Typography } from 'antd';
const SessionList = () => {
    const [sessions, setSessions] = useState([]);
    useEffect(() => {
       
    }, []);
    return (
        <>
            <Divider orientation="left">Last sessions</Divider>
            <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={sessions}
                renderItem={(item) => (
                    <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    </List.Item>
                )}
            />
        </>
    );
}

export default SessionList;
