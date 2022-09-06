import { CreateUser, CreateNewGrade, CreateNewSubject } from "app/main";

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
      path: "/create-subject",
      component: () => <CreateNewSubject />,
    },
  ],
};

export default subRoutesConfig;
