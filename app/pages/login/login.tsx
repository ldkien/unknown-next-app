import { create } from "zustand";

interface LoginParams {
    email: string;
    password: string;
}

interface LoginState {
    loginParams: LoginParams;
    isValid: boolean;
    invalidMessage: string;
}

const useLoginStore = create<LoginState>((set) => ({
    loginParams: {
        email: '',
        password: ''
    },
    isValid: true,
    invalidMessage: '',
    setState: (e : LoginState) =>
        set((state) => ({
            loginParams: {
                ...e.loginParams,
            },
            isValid: e.isValid,
            invalidEmailMessage: e.invalidMessage
        })),
}));

export const login = async () => {
    const state = useLoginStore.getState();
    if (!validateEmail(state.loginParams.email)) {
        const data = {
            ...state,
            isValid: false,
            invalidMessage: 'Email is valid'
        };
        useLoginStore.setState(data)
        return;
    }

    if (state.loginParams.password == null || state.loginParams.password == undefined || state.loginParams.password === '') {
        const data = {
            ...state,
            isValid: false,
            invalidMessage: 'Email is valid'
        };
        useLoginStore.setState(data)
        return;
    }

    
};

const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};

export const onPasswordChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const state = useLoginStore.getState();
    const data = {
        ...state,
        loginParams: {
            ...state.loginParams,
            password: e.target.value
        }
        
    };
    useLoginStore.setState(data)

}

export const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("email change")
    const state = useLoginStore.getState();
    const data = {
        ...state,
        loginParams: {
            ...state.loginParams,
            email: e.target.value
        }
        
    };
    useLoginStore.setState(data)
}

export default useLoginStore;
