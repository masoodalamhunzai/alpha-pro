import { settings as s } from "app/services/Settings";
import {
  deleteData,
  getData,
  getDataAnonymously,
  postData,
  postDataAnonymously,
} from "./ApiCalls";

/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */

export const login = async (data) => {
  try {
    const response = await postDataAnonymously(`${s.user.getToken}`, data);
    if (response && response.token) {
      const { token } = response || {};
      if (token) {
        localStorage.setItem("token", token);
      }
    }
    return response;
  } catch (err) {
    return null;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await getData(`${s.user.getUserInfo}`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return response;
  } catch (error) {
    return null;
  }
};

export const switchAlphaEnvironments = async (env) => {
  try {
    const response = await getData(`${s.alphaEnv.setEnvironment(env)}`);
    return response;
  } catch (err) {
    console.error("err", err);
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

export const getOrganizations = async (page = 1, items = 10) => {
  try {
    const url = s.organization.getOrganizations(items, page);
    const response = await getData(url);
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const getOrganizationList = async () => {
  try {
    const url = s.organization.getOrganizationList;
    const response = await getData(url);
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const AddOrganization = async (data) => {
  try {
    const response = await postData(`${s.organization.addOrganizations}`, data);

    return response;
  } catch (error) {
    return null;
  }
};

export const getItems = async (page = 1, items = 10) => {
  try {
    const response = await getData(
      `${s.items.getItems}`.replace("$[items]", items).replace("$[page]", page)
    );
    return response;
  } catch (err) {
    return null;
  }
};
export const getTagsList = async () => {
  try {
    const response = await getData(`${s.items.getTagsList}`);
    return response;
  } catch (err) {
    return null;
  }
};
export const getTagsByTagList = async (tagListId) => {
  try {
    const response = await getData(`${s.items.getTagsByTagList(tagListId)}`);
    return response;
  } catch (err) {
    return null;
  }
};

export const searchItem = async (searchText,grades,tags) => {
  try {
        let response = null;
        if(searchText!='' && grades!='' && tags!='')
        {
          response = await getData(`${s.items.searchItem(searchText,grades,tags)}`);
        }
        else 
        if(searchText!='' && grades!='' && tags=='')
        {
          response = await getData(`${s.items.searchItem1(searchText,grades)}`);
        }
        else 
        if(searchText!='' && grades=='' && tags!='')
        {
          response = await getData(`${s.items.searchItem2(searchText,tags)}`);
        }
        else 
        if(searchText=='' && grades!='' && tags!='')
        {
          response = await getData(`${s.items.searchItem(' ',tags,grades)}`);
        }
        if(searchText!='' && grades=='' && tags=='')
        {
          response = await getData(`${s.items.searchItem3(searchText,tags,grades)}`);
        }
        if(searchText=='' && grades!='' && tags=='')
        {
          response = await getData(`${s.items.searchItem1(' ',grades)}`);
        }
        if(searchText=='' && grades=='' && tags!='')
        {
          response = await getData(`${s.items.searchItem2(' ',tags)}`);
        }

    return response;
  } catch (err) {
    console.log('err ',err);
    return null;
  }
};

export const saveItem = async (data) => {
  try {
    const response = await postData(`${s.items.addItems}`, data);

    return response;
  } catch (error) {
    return null;
  }
};

export const saveQuestion = async (data, id) => {
  try {
    const response = await postData(`${s.items.saveQuestion(id)}`, data);
    return response;
  } catch (error) {
    console.error("api manager savequestion error ", error);
    return null;
  }
};

export const getQuestionByItemId = async (itemId) => {
  try {
    const response = await getData(`${s.items.getQuestionByItemId(itemId)}`);
    return response;
  } catch (err) {
    return null;
  }
};

export const getItemById = async (itemId) => {
  try {
    const response = await getData(`${s.items.getItemById(itemId)}`);
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

export const getOrganizationUsers = async (orgId, page = 1, items = 10) => {
  try {
    const url = s.organizationUsers.getOrganizationUsers(orgId, items, page);
    const response = await getData(url);
    if (response && response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const getAllRoles = async () => {
  try {
    const response = await getData(`${s.roles}`);
    return response;
  } catch (err) {
    return null;
  }
};

export const getAllGrades = async (page = 1, items = 10) => {
  try {
    const response = await getData(
      `${s.grades.getGrades}`
        .replace("$[items]", items)
        .replace("$[page]", page)
    );
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const createUserGrade = async (data) => {
  try {
    const response = await postData(`${s.grades.addGrade}`, data);
    return response;
  } catch (err) {
    return null;
  }
};

export const deleteGrade = async (id) => {
  try {
    const response = await deleteData(`${s.grades.delete(id)}`);
    return response;
  } catch (err) {
    return null;
  }
};

export const getAllSubjects = async () => {
  try {
    const response = await getData(`${s.subjects.getSubjects}`);
    return response;
  } catch (err) {
    return null;
  }
};

export const createUserSubject = async (data) => {
  try {
    const response = await postData(`${s.subjects.addSubject}`, data);
    return response;
  } catch (err) {
    return null;
  }
};
export const deleteSubject = async (id) => {
  try {
    const response = await deleteData(`${s.subjects.delete(id)}`);
    return response;
  } catch (err) {
    return null;
  }
};

export const createOrganizationUser = async (id, data) => {
  try {
    const response = await postData(
      `${s.organizationUsers.createOrganizationUser(id)}`,
      data
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const searchOrganizationUser = async (
  id,
  searchTerm,
  page = 1,
  items = 10
) => {
  try {
    const response = await getData(
      `${s.search.searchOrganizationUsers(id, searchTerm)}`
        .replace("$[items]", items)
        .replace("$[page]", page)
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const searchOrganizations = async (searchTerm) => {
  try {
    const response = await getData(
      `${s.search.searchOrganizations(searchTerm)}`
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const deleteItem = async (itemId) => {
  try {
    const response = await deleteData(`${s.items.deleteItem(itemId)}`);
    return response;
  } catch (err) {
    console.error("err", err);
    return null;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await deleteData(`${s.items.deleteQuestion(questionId)}`);
    return response;
  } catch (err) {
    console.error("err", err);
    return null;
  }
};
