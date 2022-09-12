import { initialState } from "./InitialState";

export const actions = {
  SET_ORGANIZATION: "SET_ORGANIZATION",
  SET_STOCK_PRICE: "SET_STOCK_PRICE",
  SET_RESET_GLOBAL_STATE: "SET_RESET_GLOBAL_STATE",
  SET_FEEDS: "SET_FEEDS",
  SET_ALL_FEEDS: "SET_ALL_FEEDS",
  SET_MY_NEWS: "SET_MY_NEWS",
  SET_ALL_NEWS: "SET_ALL_NEWS",
  SET_NEWS: "SET_NEWS",
  SET_USER: "SET_USER",
  SET_ITEMS: "SET_ITEMS",
  SET_ROLES: "SET_ROLES",
  SET_GRADES: "SET_GRADES",
  SET_SUBJECTS: "SET_SUBJECTS",
  SET_ORGANIZATION_USERS: "SET_ORGANIZATION_USERS",
  SET_SEARCH_ORGANIZATION: "SET_SEARCH_ORGANIZATION",
  SET_SEARCH_ORGANIZATION_USERS: "SET_SEARCH_ORGANIZATION_USERS",
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
    case actions.SET_ORGANIZATION_USERS:
      return {
        ...state,
        organizationUsers: action.payload,
      };
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actions.SET_GRADES:
      return {
        ...state,
        grades: action.payload,
      };
    case actions.SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };
    case actions.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
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
    case actions.SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    case actions.SET_SEARCH_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
      };
    case actions.SET_SEARCH_ORGANIZATION_USERS:
      return {
        ...state,
        organizationUsers: action.payload,
      };
    default:
      return state;
  }
};
