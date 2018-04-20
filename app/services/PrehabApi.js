import React from 'react';
import { AsyncStorage } from "react-native";

export const API_TOKEN = "auth-prehab-api-token";
export const PREHAB_ID = "auth-prehab-id";

export default class PrehabApi extends React.Component {

    constructor(props) {
        super(props);
        this.API_URL = 'http://ec2-18-130-0-119.eu-west-2.compute.amazonaws.com/api/';
    }

    signIn(username, password) {        
        let loginUrl = this.API_URL + "login/"; 
        
        return fetch(loginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'platform' : 'mobile'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
    }

    registerPassword(usercode, password) {
        let registerPasswordUrl = this.API_URL + "user/activate/";

        return fetch(registerPasswordUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'platform' : 'mobile'
            },
            body: JSON.stringify({
                activation_code: usercode.toString(),
                password: password.toString(),
            }),
        });
    }

    async getPrehabPlan() {
        let apiToken;
        let prehabId;

        let data = await AsyncStorage.multiGet([API_TOKEN, PREHAB_ID]);

        apiToken = data[0][1];
        prehabId = data[1][1];
        
        let prehabPlanUrl = this.API_URL + "prehab/" + prehabId + "/";

        return fetch(prehabPlanUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'platform' : 'mobile',
                'jwt' : apiToken
            },
        });
    }

    async executeTaskWithoutDifficulties(taskId, hasExecuted) {
        let apiToken;
        let prehabId;

        let data = await AsyncStorage.multiGet([API_TOKEN, PREHAB_ID]);
        
        apiToken = data[0][1];
        prehabId = data[1][1];
        
        let executeTaskUrl = this.API_URL + "patient/schedule/task/";

        return fetch(executeTaskUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'platform' : 'mobile',
                'jwt' : apiToken
            },
            body: JSON.stringify({
                prehab_id: Number(prehabId),
                patient_task_schedule_id: Number(taskId),
                completed: hasExecuted,
                difficulties: false,
            }),
        });
    }

    async executeTaskWithDifficulties(taskId, hasExecuted, difficulties) {
        let apiToken;
        let prehabId;

        let data = await AsyncStorage.multiGet([API_TOKEN, PREHAB_ID]);
        
        apiToken = data[0][1];
        prehabId = data[1][1];
        
        let executeTaskUrl = this.API_URL + "patient/schedule/task/";

        return fetch(executeTaskUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'platform' : 'mobile',
                'jwt' : apiToken
            },
            body: JSON.stringify({
                prehab_id: Number(prehabId),
                patient_task_schedule_id: Number(taskId),
                completed: hasExecuted,
                difficulties: true,
                notes: difficulties,
            }),
        });
    }

}