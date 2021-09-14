import jwt_decode from "jwt-decode";

// Nombre del token que se almacena en el LocalStorage para la sesion
const TOKEN_KEY = "auth.token";
const USER_DATA = "auth.user";

const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/gm;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/g;

const displayNameRegex = /^[a-zA-Z0-9]{3,15}$/g;

const creditcarRegex = /^((4\d{3})|(5[1-5]\d{2})|(6011)|(7\d{3}))-?\d{4}-?\d{4}-?\d{4}|3[4,7]\d{13}$/g;

const expirationRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/g;


/// BEGIN OF REFACTORED ELEMENTS TO TYPESCRIPT OR REWRITTING OF FUNCTIONS

/**
 * Type for Auth information
 */
export type Auth = {
    user: {
        displayName: string,
        email: string,
    } | null,
    token: string | null
};

/**
 * This function saves to localstorage information of the user
 * after authenticated
 * 
 * @param param0 Object of type Auth to store information
 */
export const setLocalAuth = ({ user, token }: Auth) => {
    
    if(token && user){
        localStorage.setItem(USER_DATA, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
    }
};

/**
 * Searches for the user already logged in and stored at the localstorage
 * 
 * @returns Returns an object of type Auth with credentials and info or null if empty
 */
export const getLocalAuth = (): Auth | null => {
    let token = localStorage.getItem(TOKEN_KEY);
    let stringUser = localStorage.getItem(USER_DATA);
    let user = null, ret: Auth | null = null;

    if (stringUser && token) {
        user = JSON.parse(stringUser);

        ret = {
            token,
            user,
        };
    }

    return ret;
}

/**
 *  Remueve los datos del usuario autenticado del localstorage
 */
export const removeLocalAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_DATA);
}


/**
 * Chequea si el token ya se encuentra respaldado en el localstorage
 * 
 * @returns True si el token se encuentra en localstorage, False de lo contrario.
 */
export const isLoggedIn = () => localStorage.getItem(TOKEN_KEY) ? true : false;


/**
 * Performs validation over the value received checking for a valid email.
 * 
 * @param {string} value Value to be tested valid for a email.
 * @returns Return an object with valid flag and message.
 */
export const emailValidator = (value: string): { valid: boolean, msg: string | null } => {
    let valid = false, msg = null;

    if (!value) {
        msg = "This field is required.";
    }

    if (!valid && !value.match(emailRegex)) {
        msg = "Email address is not valid.";
    } else {
        valid = true;
    }

    return { valid, msg };
};


/**
 * Performs validation over the value received checking for a valid password.
 * 
 * @param {string} value Value to be tested valid for a username.
 * @returns Return an object with valid flag and message.
 */
export const passwordValidator = (value: string): { valid: boolean, msg: string | null } => {
    let valid = false, msg = null;

    if (!value) {
        msg = "This field is required.";
    }

    if (!valid && !value.match(passwordRegex)) {
        msg = "Please use more than 4 character password requiring numbers and both lowercase and uppercase letters.";
    } else {
        valid = true;
    }

    return { valid, msg };
};


export const requiredField = (value: string): { valid: boolean, msg: string | null } => {
    let valid = false, msg = null;

    if (!value) {
        msg = "This field is required.";
    }

    return { valid, msg };
};

export const optionalField = (value: string): { valid: boolean, msg: string | null } => {
    return { valid: true, msg: null };
};


export const creditCardValidator = (value: string): { valid: boolean, msg: string | null } => {
    let valid = false, msg = null;

    if (!value) {
        msg = "This field is required.";
    }

    if (!valid && !value.match(creditcarRegex)) {
        msg = "Credit card number is not valid.";
    } else {
        valid = true;
    }

    return { valid, msg };
};


export const expirationDateValidator = (value: string): { valid: boolean, msg: string | null } => {
    let valid = false, msg = null;

    if (!value) {
        msg = "This field is required.";
    }

    if (!valid && !value.match(expirationRegex)) {
        msg = "Expiration Date is not valid.";
    } else {
        valid = true;
    }

    return { valid, msg };
};


/// END OF REFACTORED ELEMENTS TO TYPESCRIPT OR REWRITTING OF FUNCTIONS



// /**
//  * Searches for the token stored at the localstorage
//  * 
//  * @returns {string} Returns an string for the token stored
//  */
// export const getLocalToken = () => {
//     let token = localStorage.getItem(TOKEN_KEY);

//     token = token && isJwtExpired(token) ? null : token;

//     return token;
// }

// /**
//  * Searches for the user already logged in and stored at the localstorage
//  * 
//  * @returns Returns an object
//  */
// export const getLocalUser = () => {
//     let stringUser = localStorage.getItem(USER_DATA);
//     let user = null;

//     if (stringUser) {
//         user = JSON.parse(stringUser);
//     }

//     return user;
// }

// /**
//  * Sets at localstorage an string of the user data in JSON format.
//  * 
//  * @param {object} user Object containing data of the user
//  */
// export const setLocalUser = (user) => {
//     if (user) {
//         localStorage.setItem(USER_DATA, JSON.stringify(user));
//     }
// }

/**
 * Agrega el token obtenido del login en el localstorage
 *
 * @param {string} token Token obtenido del servidor y almacenar en localstorage
 */
// export const setLocalToken = (token) => {
//     localStorage.setItem(TOKEN_KEY, token);
// }

/**
 * Remueve el token utilizado para login del localstorage
 */
// export const removeLocalToken = () => {
//     localStorage.removeItem(TOKEN_KEY);
// }

// /**
//  * Remueve los datos de usuario almacenados en el localstorage
//  */
// export const removeLocalUser = () => {
//     localStorage.removeItem(USER_DATA);
// }

// /**
//  * Performs validation over the value received checking for a valid username.
//  * 
//  * @param {string} value Value to be tested valid for a username.
//  * @returns Return an object with valid flag and message.
//  */
// // export const usernameValidator = (value) => {
// //     let valid = false, msg = null;

// //     if (!value) {
// //         msg = "This field is required.";
// //     }

// //     if (!valid && !value.match(displayNameRegex)) {
// //         msg = "Username not valid. Use alphanumeric values up to 15 characters.";
// //     } else {
// //         valid = true;
// //     }

// //     return { valid, msg };
// // };


// /**
//  * Checks if the form received contains all error attributes with null
//  * to determine that the form is valid.
//  * 
//  * @param {object} value Form with structure to validate.
//  * @returns {boolean} Returns a flag indicating if the form is valid.
//  */
// export const validForm = (form) => {
//     let ret = true;

//     if (form) {
//         for (var [, value] of Object.entries(form)) {
//             ret = value.error === null;

//             ret = value.required ? ret && value.value !== "" : ret;

//             if (!ret)
//                 break;
//         }
//     } else {
//         ret = false;
//     }

//     return ret;
// }

// export const getFormErrors = (form) => {
//     let errors = [];

//     if (form) {
//         for (var [, value] of Object.entries(form)) {
//             if (value.error) {
//                 errors.push(value.error);
//             }
//         }
//     }

//     return errors;
// }

// /**
//  * Prueba si el token jwt recibido esta expirado.
//  * 
//  * @param {string} token Token en formato jwt para validar
//  * @returns True si elk token ha expirado.
//  */
// export const isJwtExpired = (token) => {
//     if (token !== null && typeof token !== "undefined" && token !== "") {
//         var decoded = jwt_decode(token);
//         var now = new Date().getTime();

//         //Se multiplica por 1000 ya que la libreria regresa el tiempo de expiracion 
//         // lo regresa en segundos y poder pasarlo a milisegundos
//         return now > decoded.exp * 1000;
//     } else {
//         return true;
//     }
// };