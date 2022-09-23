import { createSelector, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import navigationConfig from 'app/fuse-configs/navigationConfig';
import FuseUtils from '@fuse/utils';
import i18next from 'i18next';
import _ from '@lodash';

const navigationAdapter = createEntityAdapter();
const emptyInitialState = navigationAdapter.getInitialState();
const initialState = navigationAdapter.upsertMany(emptyInitialState, navigationConfig);

export const appendNavigationItem = (item, parentId) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.appendNavItem(navigation, item, parentId)));
};

export const prependNavigationItem = (item, parentId) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.prependNavItem(navigation, item, parentId)));
};

export const updateNavigationItem = (id, item) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.updateNavItem(navigation, id, item)));
};

export const removeNavigationItem = (id) => (dispatch, getState) => {
  const navigation = selectNavigationAll(getState());

  return dispatch(setNavigation(FuseUtils.removeNavItem(navigation, id)));
};

export const {
  selectAll: selectNavigationAll,
  selectIds: selectNavigationIds,
  selectById: selectNavigationItemById,
} = navigationAdapter.getSelectors((state) => state.fuse.navigation);

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: navigationAdapter.setAll,
    resetNavigation: (state, action) => initialState,
  },
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

const getUserRole = (state) => state.auth.user.role;

export const selectNavigation = createSelector(
  [selectNavigationAll, ({ i18n }) => i18n.language, getUserRole],
  (navigation, language, userRole) => {
    const localStorageUser = localStorage.getItem('user');
    const user = JSON.parse(localStorageUser);
    console.log('here is user: ', user);
    const role =
      user && user.user && user.user.roles && user.user.roles.length > 0 && user.user.roles[0].name;

    function setTranslationValues(data) {
      // loop through every object in the array
      return data.map((item) => {
        if (item.translate && item.title) {
          item.title = i18next.t(`navigation:${item.translate}`);
        }

        if (
          role &&
          role === 'super-admin' &&
          (item.id === 'items' ||
            item.id === 'activities' ||
            item.id === 'tags' ||
            item.id === 'configuration')
        ) {
          return {};
        }
        if (
          role &&
          role === 'client-admin' &&
          (item.id === 'insight' || item.id === 'configuration')
        ) {
          return {};
        }
        if (role && role === 'author' && (item.id === 'insight' || item.id === 'configuration')) {
          return {};
        }
        if (
          role &&
          role === 'student' &&
          (item.id === 'items' ||
            item.id === 'activities' ||
            item.id === 'tags' ||
            item.id === 'insight' ||
            item.id === 'configuration')
        ) {
          return {};
        }

        // see if there is a children node
        if (item.children) {
          // .. below code is for role based menu item access restrictions

          const childrens = item.children.filter((childrenItem) => {
            if (role && role === 'super-admin') {
              if (childrenItem.id === 'home') {
                return true;
              }
              if (childrenItem.id === 'OrganizationManagement') {
                return true;
              }
              if (childrenItem.id === 'UserManagment') {
                return true;
              }
              if (childrenItem.id === 'itemAnalysis') {
                return true;
              }
              if (childrenItem.id === 'authorSiteSettings') {
                return true;
              }
              if (childrenItem.id === 'sessionDetails') {
                return true;
              }
              if (childrenItem.id === 'itemBankDetails') {
                return true;
              }
              if (childrenItem.id === 'myAccount') {
                return true;
              }
              if (childrenItem.id === 'settings') {
                return true;
              }
              if (childrenItem.id === 'logout') {
                return true;
              }
              return false;
            }
            if (role && role === 'client-admin') {
              if (
                childrenItem.id === 'home' ||
                childrenItem.id === 'UserManagment' ||
                childrenItem.id === 'allitems' ||
                childrenItem.id === 'createnewitem' ||
                childrenItem.id === 'itembulkupdates' ||
                childrenItem.id === 'allactivities' ||
                childrenItem.id === 'newactivity' ||
                childrenItem.id === 'basetemplates' ||
                childrenItem.id === 'activitybulkupdates' ||
                childrenItem.id === 'tagtypes' ||
                childrenItem.id === 'taghierarchies' ||
                childrenItem.id === 'grade' ||
                childrenItem.id === 'subject' ||
                childrenItem.id === 'myAccount' ||
                childrenItem.id === 'settings' ||
                childrenItem.id === 'logout'
              ) {
                return true;
              }
              return false;
            }
            if (role && role === 'author') {
              if (
                childrenItem.id === 'home' ||
                childrenItem.id === 'allitems' ||
                childrenItem.id === 'createnewitem' ||
                childrenItem.id === 'itembulkupdates' ||
                childrenItem.id === 'allactivities' ||
                childrenItem.id === 'newactivity' ||
                childrenItem.id === 'basetemplates' ||
                childrenItem.id === 'activitybulkupdates' ||
                childrenItem.id === 'tagtypes' ||
                childrenItem.id === 'taghierarchies' ||
                childrenItem.id === 'myAccount' ||
                childrenItem.id === 'settings' ||
                childrenItem.id === 'logout'
              ) {
                return true;
              }
              return false;
            }
            if (role && role === 'student') {
              if (
                childrenItem.id === 'home' ||
                childrenItem.id === 'myAccount' ||
                childrenItem.id === 'settings' ||
                childrenItem.id === 'logout'
              ) {
                return true;
              }
              return false;
            }
            return true;
          });

          // .. above code is for role based menu item access restrictions

          // run this function recursively on the children array
          item.children = setTranslationValues(childrens);
        }
        return item;
      });
    }

    return setTranslationValues(
      _.merge(
        [],
        FuseUtils.filterRecursive(navigation, (item) =>
          FuseUtils.hasPermission(item.auth, userRole)
        )
      )
    );
  }
);

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) =>
  FuseUtils.getFlatNavigation(navigation)
);

export default navigationSlice.reducer;
