import { makeStyles } from '@material-ui/styles';
// .root{
// 	color: #e7f0f6
// }
// .

// .presentation{
// 	background-color: #0000;
// 	border :2px solid #0000;
// }
const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    left: '60%',
    top: '45%',
    zIndex: '100'
    // transform: 'translate(-50%)'
  },
  loading: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
    margin: 'auto'
  },
  presentaion: {
    border: '1px #000 solid',
    borderRaduis: '15px'
  },
  labelRoot: {
    '&&': {
      color: 'red'
    }
  }
}));
export default useStyles;
