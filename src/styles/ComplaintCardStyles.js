import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 7,
    marginBottom: 22,
    marginHorizontal: 20,
    shadowColor: '#00000040',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    marginBottom: 8,
    paddingHorizontal: 14,
  },
  avatar: {
    width: 29,
    height: 29,
    borderRadius: 14,
    marginRight: 9,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: '#000000',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  description: {
    color: '#000000',
    fontSize: 9,
    lineHeight: 12,
  },
  statusBadge: {
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#B5B6BF',
    marginBottom: 3,
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 4,
  },
  link: {
    color: '#0668AD',
    fontSize: 9,
    fontWeight: 'bold',
  },
  time: {
    color: '#A2A3A7',
    fontSize: 8,
  },
});

export default styles;
