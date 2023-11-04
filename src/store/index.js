import { createStore, combineReducers } from "redux";
import modelReducer from "./modelReducer";
import stateReducer from "./stateReducer";
import { CustomReducerEnhancer } from "./CustomReducerEnhancer";

const enhancerReducer = CustomReducerEnhancer(
  combineReducers({
    modelData: modelReducer,
    stateData: stateReducer
  })
)

export default createStore(enhancerReducer);

export {
  saveProduct,
  saveSupplier,
  deleteProduct,
  deleteSupplier
} from "./modelActionCreators";