// eslint-disable-next-line import/prefer-default-export
export const initialState = {
  currentEnv: 'prod',
  organization: null,
  publishingEnvironment: '',
  organizationUsers: null,
  stockPrice: 0,
  items: null,
  feeds: null,
  grade: null,
  subjects: null,
  itemQuestionsList: [],
  news: {
    header: 'This is Header Stored in Global State',
    des: 'This Description is stored in Global State',
  },
  user: {},
  roles: null,
  defaultPageSize: 10,
};
