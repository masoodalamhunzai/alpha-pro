import {
  CreateUser,
  CreateNewGrade,
  CreateNewSubject,
  NewTagType,
  NewTagHierarchy,
} from "app/main";

const subRoutesConfig = {
  routes: [
    {
      path: "/user-management/create-user",
      component: () => <CreateUser />,
    },
    {
      path: "/user-management/edit-user",
      component: () => <CreateUser />,
    },
    {
      path: "/create-grade",
      component: () => <CreateNewGrade />,
    },
    {
      path: "/edit-grade",
      component: () => <CreateNewGrade />,
    },
    {
      path: "/tag-types/create-tag-type",
      component: () => <NewTagType />,
    },
    {
      path: "/tag-types/edit-tag-type",
      component: () => <NewTagType />,
    },
    {
      path: "/create-tag-hierarchy",
      component: () => <NewTagHierarchy />,
    },
    {
      path: "/edit-tag-hierarchy",
      component: () => <NewTagHierarchy />,
    },

    {
      path: "/create-subject",
      component: () => <CreateNewSubject />,
    },
    {
      path: "/edit-subject",
      component: () => <CreateNewSubject />,
    },
  ],
};

export default subRoutesConfig;
