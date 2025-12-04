import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/ComplaintCardStyles';

const ComplaintCard = ({ complaint }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'pendiente':
      case 'en revisión':
        return '#FFCB528A';
      case 'resuelta':
      case 'resolved':
        return '#89F1569C';
      default:
        return '#FFCB528A';
    }
  };

  const getStatusTextColor = (status) => {
    switch(status) {
      case 'pendiente':
      case 'en revisión':
        return '#8B6244';
      case 'resuelta':
      case 'resolved':
        return '#2C7508';
      default:
        return '#8B6244';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={complaint.userAvatar ? { uri: complaint.userAvatar } : require('../../assets/icons/defaultavatar.png')}
          style={styles.avatar}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{complaint.title}</Text>
          <Text style={styles.description}>{complaint.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(complaint.status) }]}>
          <Text style={[styles.statusText, { color: getStatusTextColor(complaint.status) }]}>
            {complaint.status}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.footer}>
        <Text style={styles.link}>Ver detalles</Text>
        <Text style={styles.time}>{complaint.time}</Text>
      </View>
    </View>
  );
};

export default ComplaintCard;
