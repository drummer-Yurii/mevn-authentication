import { defineStore } from "pinia";
import useApi from '@/composables/useApi';

export interface LoginData {
    email: string,
    password: string
}
export interface RegisterData {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    password_confirm: string
}

export interface User {
    id: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string
}

export interface State {
    user: User,
    accessToken: string
}

export const useAuthStore = defineStore('auth', {
    state: (): State => {
        return {
            user: {} as User,
            accessToken: "" as string,
        };
    },
    getters: {
        userDetail: (state: State) => state.user,
        isAuthenticated: (state: State) => state.user?.id ? true : false
    },
    actions: {
        async login(payload: LoginData) {
            try {
                const { data } = await useApi().post(`/api/auth/login`, payload);
                this.accessToken = data?.access_token
                return data
            } catch (error: Error | any) {
                throw error.response.message
            }
        },
        async register(payload: RegisterData) {
            try {
                const { data } = await useApi().post(`/api/auth/register`, payload);
                return data
            } catch (error: Error | any) {
                throw error.response.message
            }
        },
        async getUser() {
            try {
                const { data } = await useApi().get(`/api/auth/user`);
                this.user = data
                return data
            } catch (error: Error | any) {
                throw error.response.message
            }
        },
        async logout() {
            try {
                const { data } = await useApi().post(`/api/auth/logout`);
                this.accessToken = '';
                this.user = {} as User;
                return data
            } catch (error: Error | any) {
                throw error.response.message
            }
        },
        async refresh() {
            try {
                const { data } = await useApi().post(`/api/auth/refresh`);
                this.accessToken = data?.access_token
                return data
            } catch (error: Error | any) {
                throw error.response.message
            }
        },
    }
});