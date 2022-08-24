/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import { settings as s } from 'app/services/Settings';
import { getData, postData, getDataAnonymously } from './ApiCalls';

export const login = async () => {
  try {
    const response = await getData(`${s.login}`);
    return response;
  } catch (err) {
    return null;
  }
};

export const getAllOrganizations = async () => {
  try {
    const response = await getDataAnonymously(`${s.organization.getAllOrganizations}`);
    return response;
  } catch (error) {
    return null;
  }
};

export const getOrganizationsByAnalyst = async (id) => {
  try {
    const response = await getData(
      `${s.organization.getOrganizationsByAnalyst.replace('$[analystId]', id)}`
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getOrganizationsBySector = async (id) => {
  try {
    const response = await getData(
      `${s.organization.getOrganizationsBySector.replace('$[sectorId]', id)}`
    );
    return response;
  } catch (err) {
    return null;
  }
};

export const getSectorById = async (id) => {
  try {
    const response = await getData(`${s.sector.getSectorById.replace('$[id]', id)}`);
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
        .replace('$[tab]', data.tab)
        .replace('$[riskReward]', data.riskReward)
        .replace('$[riskProfile]', data.riskProfile)}`
    );
    return response;
  } catch (error) {
    return null;
  }
};
