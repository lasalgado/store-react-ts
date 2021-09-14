import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import rootReducerGlobal from "./rootSlice";
// import expensesReducer from "./expenses/reducer";
// import filtersReducer from "./filters/reducer";

export const rootReducer = combineReducers({
  storeAuth: authReducer,
  storeRoot: rootReducerGlobal,
//   expenses: expensesReducer,
//   filters: filtersReducer,
});

export default rootReducer;