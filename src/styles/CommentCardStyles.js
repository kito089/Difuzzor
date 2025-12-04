import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 13,
    marginBottom: 14,
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
    marginBottom: 6,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 29,
    height: 29,
    borderRadius: 14,
    marginRight: 9,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#000000',
    fontSize: 9,
    fontWeight: '600',
    marginBottom: 7,
  },
  text: {
    color: '#000000',
    fontSize: 9,
    lineHeight: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 53,
    marginTop: 8,
  },
  time: {
    color: '#A2A3A7',
    fontSize: 8,
    marginRight: 14,
  },
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionIcon: {
    width: 11,
    height: 11,
    marginRight: 3,
  },
  reactionText: {
    color: '#5A5A60',
    fontSize: 9,
  },
});

export default styles;
