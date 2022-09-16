import {
  CreateUser,
  CreateNewGrade,
  CreateNewSubject,
  NewTagType,
  NewTagHierarchy,
  EditTagHierarchy,
  EditTagType,
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
      path: "/edit-tag-type",
      component: () => <EditTagType />,
    },
    {
      path: "/create-tag-hierarchy",
      component: () => <NewTagHierarchy />,
    },
    {
      path: "/edit-tag-hierarchy",
<<<<<<< HEAD
      component: () => <EditTagHierarchy />,
    },
    {
      path: "/edit-grade",
      component: () => <CreateNewGrade />,
=======
      component: () => <NewTagHierarchy />,
>>>>>>> 69a11f735a32dd6bfc8b900306b87f678643321e
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
