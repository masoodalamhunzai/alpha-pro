import { settings as s } from "app/services/Settings";
import {
    getData,
    postData,
    getDataAnonymously,
    postDataAnonymously,
} from "./ApiCalls";



export const getAllOrganizationUsers = async (orgId) => {
    try {
        console.log("org Id is here:", orgId);
        const response = await getData(
            `${s.userOrganizations.getOrganizationUsers(orgId)}`, user
        );
        return response;
    } catch (err) {
        return null;
    }
};