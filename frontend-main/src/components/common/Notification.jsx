import { Tabs, message } from 'antd';
import axios from '../../utils/axios'; // Ensure Axios instance is imported
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const [user, setUser] = useState(null); // Ensure initial state is null
  const navigate = useNavigate();
  
  const getUser = () => {
    const userdata = JSON.parse(localStorage.getItem('userData'));
    if (userdata) {
      setUser(userdata);
    }
  };

  const handleAllMarkRead = async () => {
    if (!user) return;
    try {
      const res = await axios.post('/user/getallnotification', { userId: user._id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        const updatedUser = { ...user, notification: [], seennotification: [...user.seennotification, ...user.notification] };
        localStorage.setItem('userData', JSON.stringify(updatedUser));

        message.success(res.data.message);
        setUser(updatedUser);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error('Error during marking all notifications as read:', error.response ? error.response.data : error);
      message.error('Something went wrong');
    }
  };

  const handleDeleteAllMark = async () => {
    if (!user) return;
    try {
      const res = await axios.post('/user/deleteallnotification', { userId: user._id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        const updatedUser = { ...user, seennotification: [] };
        localStorage.setItem('userData', JSON.stringify(updatedUser));

        message.success(res.data.message);
        setUser(updatedUser);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error('Error during deleting all notifications:', error.response ? error.response.data : error);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
  <h2 className="p-3 text-center">Notification</h2>
  <Tabs>
    <Tabs.TabPane tab={<span className="unread-tab">Unread</span>} key={0}>
      <div className="d-flex justify-content-end">
        <h4 className="delmar" onClick={handleAllMarkRead}>
          Mark all read
        </h4>
      </div>
      <div className="unread-tab-content">
        {user?.notification.map((notificationMsg) => (
          <div
            key={notificationMsg._id}
            onClick={() => navigate(notificationMsg.onClickPath)}
            className="card-box"
          >
            <div className="card-box-text">{notificationMsg.message}</div>
          </div>
        ))}
      </div>
    </Tabs.TabPane>
    <Tabs.TabPane tab={<span className="read-tab">Read</span>} key={1}>
      <div className="d-flex justify-content-end">
        <h4 className="delmar" style={{ cursor: 'pointer' }} onClick={handleDeleteAllMark}>
          Delete all read
        </h4>
      </div>
      <div className="read-tab-content">
        {user?.seennotification.map((notificationMsg) => (
          <div
            key={notificationMsg._id}
            style={{ cursor: 'pointer' }}
            className="card-box"
            onClick={() => navigate(notificationMsg.onClickPath)}
          >
            <div className="card-box-text">{notificationMsg.message}</div>
          </div>
        ))}
      </div>
    </Tabs.TabPane>
  </Tabs>
</div>

  );
};

export default Notification;
