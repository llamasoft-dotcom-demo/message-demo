import { routerReducer as routing } from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import { combineReducers } from 'redux';

import { message } from './main.js';

const rootReducer = combineReducers({
    message,
    toastr: toastrReducer,
    routing
});

export default rootReducer;
