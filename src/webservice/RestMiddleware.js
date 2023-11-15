import { STORE, UPDATE, DELETE } from "../store/modelActionTypes";
import { RestDataSource } from "./RestDataSource";
import { PRODUCTS, SUPPLIERS } from "../store/dataTypes";

export const GET_DATA = "rest_ge_data";

export const getData = (dataType) => {
  return {
    type: GET_DATA,
    dataType: dataType
  }
}

export const createRestMiddleware = (productsURL,suppliersURL) =>
{
  const dataSource = {
    [PRODUCTS]: new RestDataSource(productsURL, () => {}),
    [SUPPLIERS]: new RestDataSource(suppliersURL, () => {})
  }

  return ({dispatch,getState}) => next => action =>
  {
    switch (action.type) {
      case GET_DATA:
        if (getState().modelData[action.dataType].length === 0)
        {
          dataSource[action.dataType].GetData( (data) =>
            data.forEach(item =>
              next({
                type: STORE,
                dataType: action.dataType,
                payload: item
              })
            )
          );
        }
        break;
      case STORE:
        action.payload.id = null;
        dataSource[action.dataType].Store(
          action.payload,
          data =>
            next({
              ...action,
              payload: data
            })
        )
        break;
      case UPDATE:
        dataSource[action.dataType].Update(
          action.payload,
          data =>
            next({
              ...action,
              payload: data
            })
        )
        break;
      case DELETE:
        dataSource[action.dataType].Delete({
            id: action.payload
          },
          () => next(action)
        )
        break;
      default:
        next(action);
    }
  }
}