import { combineReducers } from 'redux';
import drawerReducer from './reducers/drawerReducer';
import modalReducer from './reducers/modalReducer';
import userDataReducer from './reducers/userDataReducer';
import mainDataReducer from './reducers/mainDataReducer';

export default combineReducers({
  drawer: drawerReducer,
  modal: modalReducer,
  user: userDataReducer,
  main: mainDataReducer,
});
