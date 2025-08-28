import {
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
  LOAD_FAVOURITES_REQUEST,
  LOAD_FAVOURITES_SUCCESS,
  LOAD_FAVOURITES_FAIL,
  CLEAR_FAVOURITES,
} from "../constans/FavouriteConstans";

export const favouriteReducer = (
  state = { 
    favouriteItems: [], 
    loading: false, 
    error: null 
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_FAVOURITE:
      const item = action.payload;

      const isItemExist = state.favouriteItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          favouriteItems: state.favouriteItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          favouriteItems: [...state.favouriteItems, item],
        };
      }

    case REMOVE_FROM_FAVOURITE:
      return {
        ...state,
        favouriteItems: state.favouriteItems.filter((i) => i.product !== action.payload),
      };

    case LOAD_FAVOURITES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOAD_FAVOURITES_SUCCESS:
      return {
        ...state,
        loading: false,
        favouriteItems: action.payload,
        error: null,
      };

    case LOAD_FAVOURITES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_FAVOURITES:
      return {
        favouriteItems: [],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};