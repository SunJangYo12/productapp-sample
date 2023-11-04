import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import modelReducer from "./modelReducer";
import stateReducer from "./stateReducer";
import { CustomReducerEnhancer } from "./CustomReducerEnhancer";
import { multiActions } from "./multiActionMiddleware";
import { asyncEnhancer } from "./asyncEnhancer";

const enhancerReducer = CustomReducerEnhancer(
  combineReducers({
    modelData: modelReducer,
    stateData: stateReducer
  })
)

export default createStore(
	enhancerReducer,
	compose(
		applyMiddleware(multiActions),
		asyncEnhancer(2000)
	)
);

export {
  saveProduct,
  saveSupplier,
  deleteProduct,
  deleteSupplier
} from "./modelActionCreators";