import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import modelReducer from "./modelReducer";
import stateReducer from "./stateReducer";
import { CustomReducerEnhancer } from "./CustomReducerEnhancer";
import { multiActions } from "./multiActionMiddleware";
import { asyncEnhancer } from "./asyncEnhancer";
import { createRestMiddleware } from "../webservice/RestMiddleware";

const enhancerReducer = CustomReducerEnhancer(
  combineReducers({
    modelData: modelReducer,
    stateData: stateReducer
  })
)

const restMiddleware = createRestMiddleware(
  "http://192.168.43.1:3500/api/products",
  "http://192.168.43.1:3500/api/suppliers"
)

export default createStore(
	enhancerReducer,
	compose(
    applyMiddleware(multiActions),
    applyMiddleware(restMiddleware),
		asyncEnhancer(2000)
	)
);

export {
  saveProduct,
  saveSupplier,
  deleteProduct,
  deleteSupplier
} from "./modelActionCreators";