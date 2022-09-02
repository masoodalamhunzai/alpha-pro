import { CreateUser } from "app/main";

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
  ],
};

export default subRoutesConfig;
