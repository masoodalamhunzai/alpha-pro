import { initialState } from './InitialState';

export const actions = {
  SET_ORGANIZATION: 'SET_ORGANIZATION',
  SET_STOCK_PRICE: 'SET_STOCK_PRICE',
  SET_RESET_GLOBAL_STATE: 'SET_RESET_GLOBAL_STATE',
  SET_FEEDS: 'SET_FEEDS',
  SET_ALL_FEEDS: 'SET_ALL_FEEDS',
  SET_MY_NEWS: 'SET_MY_NEWS',
  SET_ALL_NEWS: 'SET_ALL_NEWS',
  SET_NEWS: 'SET_NEWS',
  SET_USER: 'SET_USER',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_RESET_GLOBAL_STATE:
      return initialState;
    case actions.SET_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
      };
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actions.SET_STOCK_PRICE:
      return {
        ...state,
        stockPrice: action.payload,
      };
    case actions.SET_FEEDS:
      return {
        ...state,
        feeds: action.payload,
      };
    case actions.SET_NEWS:
      return {
        ...state,
        news: action.payload,
      };
    case actions.SET_ALL_FEEDS:
      return {
        ...state,
        allFeeds: action.payload,
      };
    case actions.SET_MY_NEWS:
      return {
        ...state,
        myNews: action.payload,
      };
    case actions.SET_ALL_NEWS:
      return {
        ...state,
        allNews: action.payload,
      };
    default:
      return state;
  }
};
