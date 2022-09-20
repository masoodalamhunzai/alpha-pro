export const getUserRole = (user) => {
  const { user: _user = {} } = user || {};
  const { roles = [] } = _user || {};
  const role = roles.find((r) => true);
  if (role) {
    return role.name;
  }
  return null;
};

export const getUserPermissions = (user) => {
  const { permissions = [] } = user || {};
  return permissions;
};

export const userHasPermission = (permission, user) => {
  const { permissions = [] } = user || {};
  const perm = permissions.find((p) => p === permission);
  if (perm) return true;
  return false;
};
