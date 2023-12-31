import { initialData } from "./initialData";

export const STORE_RESET = "store_clear";
export const resetStore = () => ({
  type: STORE_RESET
});

export function CustomReducerEnhancer(originalReducer)
{
  let initialState = null;

  return (storeData, action) =>
  {
    if (action.type === STORE_RESET && initialData != null)
    {
      return initialState;
    }
    else {
      const result = originalReducer(storeData, action);
      if (initialState == null)
      {
        initialState = result;
      }
      return result;
    }
  }
}