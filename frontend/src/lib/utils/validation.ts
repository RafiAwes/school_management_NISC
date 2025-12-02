import {LoginData,RegisterData, FormErrors} from '../../types/auth';

export const validateEmail = (email:string): string | undefined => {
    if(!email) return 'Email is required';
    if(!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return undefined;
}

export const validatePassword = (password:string): string | undefined => {
    if(!password) return 'Password is Required';
    if(password.length < 6) return 'Password must be at least 6 characters';
    return undefined;
}

export const validateLoginForm = (data:LoginData): FormErrors => {
    const errors: FormErrors = {};

    const emailError = validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(data.password);
    if (passwordError) errors.password = passwordError;

    return errors;

}

export const validateRegisterForm = (data:RegisterData): FormErrors => {

    const errors: FormErrors = {};

    const emailError = validateEmail(data.email);
    if (emailError) errors.email = emailError;
    const passwordError = validatePassword(data.password);
    if (passwordError) errors.password = passwordError;
    
    if(!data.fullName) {
        errors.fullName = 'Full Name is required';
    }

    if(data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }


    return errors;
}