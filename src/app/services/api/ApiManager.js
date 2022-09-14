import {
  deleteData,
  getData,
  getDataAnonymously,
  postData,
  postDataAnonymously,
} from "./ApiCalls";

/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { settings as s } from "app/services/Settings";

export const login = async (data) => {
  try {
    const response = await postDataAnonymously(`${s.getToken}`, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const getAllOrganizations = async () => {
  try {
    const response = await getDataAnonymously(
      `${s.organization.getAllOrganizations}`
    );
    return response;
  } catch (error) {
    return null;
  }
};

export const getOrganizations = async (user) => {
  try {
    const response = await getData(`${s.organization.getOrganizations}`, user);
    return response;
  } catch (err) {
    return null;
  }
};
export const AddOrganization = async (data, user) => {
  try {
    const response = await postData(
      `${s.organization.addOrganizations}`,
      user,
      data
    );

    return response;
  } catch (error) {
    return null;
  }
};

export const getItems = async (user) => {
  try {
    const response = await getData(`${s.items.getItems}`, user);
    return response;
  } catch (err) {
    return null;
  }
};

export const saveItem = async (data, user) => {
  try {
    const response = await postData(`${s.items.addItems}`, user, data);

    return response;
  } catch (error) {
    return null;
  }
};

export const saveQuestion = async (data, id, user) => {
  try {
    console.log('api manager savequestion');
    const response = await postData(
      `${s.items.saveQuestion(id)}`,
      user,
      data
    );
    console.log('api manager savequestion response ', response);
    return response;
  } catch (error) {
    console.log('api manager savequestion error ', error);
    return null;
  }
};
export const getQuestionByItemId = async (itemId, user) => {
  try {
    const response = await getData(
      `${s.items.getQuestionByItemId(itemId)}`,
      user
    );
    return response;
  } catch (err) {
    return null;
  }
};
export const getItemById = async (itemId, user) => {
  try {
    const response = await getData(
      `${s.items.getItemById(itemId)}`,
      user
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getOrganizationsByAnalyst = async (id) => {
  try {
    const response = await getData(
      `${s.organization.getOrganizationsByAnalyst.replace("$[analystId]", id)}`
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getOrganizationsBySector = async (id) => {
  try {
    const response = await getData(
      `${s.organization.getOrganizationsBySector.replace("$[sectorId]", id)}`
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getSectorById = async (id) => {
  try {
    const response = await getData(
      `${s.sector.getSectorById.replace("$[id]", id)}`
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const saveOrganization = async (data) => {
  try {
    const response = await postData(`${s.organization.saveOrganization}`, data);
    return response;
  } catch (error) {
    return null;
  }
};

export const getOrganizationByFilter = async (data) => {
  try {
    const response = await getData(
      `${s.organization.getOrganizationByFilter
        .replace("$[tab]", data.tab)
        .replace("$[riskReward]", data.riskReward)
        .replace("$[riskProfile]", data.riskProfile)}`
    );
    return response;
  } catch (error) {
    return null;
  }
};

export const getOrganizationUsers = async (orgId, user) => {
  try {
    const response = await getData(
      `${s.organizationUsers.getOrganizationUser(orgId)}`,
      user
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getAllRoles = async (user) => {
  try {
    const response = await getData(`${s.roles}`, user);
    return response;
  } catch (err) {
    return null;
  }
};
export const getAllGrades = async (user) => {
  try {
    const response = await getData(`${s.grades.getGrades}`, user);
    return response;
  } catch (err) {
    return null;
  }
};
export const createUserGrade = async (user, data) => {
  try {
    const response = await postData(`${s.grades.addGrade}`, user, data);
    return response;
  } catch (err) {
    return null;
  }
};
export const deleteGrade = async (id, user) => {
  try {
    const response = await deleteData(`${s.grades.delete(id)}`, user);
    return response;
  } catch (err) {
    return null;
  }
};
export const getAllSubjects = async (user) => {
  try {
    const response = await getData(`${s.subjects.getSubjects}`, user);
    return response;
  } catch (err) {
    return null;
  }
};
export const createUserSubject = async (user, data) => {
  try {
    const response = await postData(`${s.subjects.addSubject}`, user, data);
    return response;
  } catch (err) {
    return null;
  }
};
export const deleteSubject = async (id, user) => {
  try {
    const response = await deleteData(`${s.subjects.delete(id)}`, user);
    return response;
  } catch (err) {
    return null;
  }
};

export const createOrganizationUser = async (id, user, data) => {
  try {
    const response = await postData(
      `${s.organizationUsers.createOrganizationUser(id)}`,
      user,
      data
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const searchOrganizationUser = async (id, user, searchTerm) => {
  try {
    const response = await getData(
      `${s.search.searchOrganizationUsers(id, searchTerm)}`,
      user
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const searchOrganizations = async (searchTerm, user) => {
  try {
    const response = await getData(
      `${s.search.searchOrganizations(searchTerm)}`,
      user
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const switchAlphaEnvironments = async (env, user) => {
  try {
    const response = await getData(`${s.alphaEnv.setEnvironment(env)}`, user);
    return response;
  } catch (err) {
    console.log('err', err);
    return null;
  }
};

export const deleteItem = async (itemId, user) => {
  try {
    const response = await deleteData(`${s.items.deleteItem(itemId)}`, user);
    return response;
  } catch (err) {
    console.log('err', err);
    return null;
  }
};

export const deleteQuestion = async (questionId, user) => {
  try {
    const response = await deleteData(`${s.items.deleteQuestion(questionId)}`, user);
    return response;
  } catch (err) {
    console.log('err', err);
    return null;
  }
};
