'use client'
import { redirect } from 'next/navigation'
import { AppConst } from './const';


export function getRoutPath(path: string) {
    return AppConst.rootPage + path
}

export const executeFetchRequest = async (url: string, payload: string, method = 'POST') => {
    const options: RequestInit = {
        method,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: payload
    };

    try {
        const response = await fetch(url, options);

        if (response.ok) {
            return (await response.json());
        }

        return Promise.reject(response.status);
    } catch (e) {
        return Promise.reject(e);
    }
}