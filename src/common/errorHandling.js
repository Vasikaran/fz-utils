import { isObject, isString, isEmptyObject } from './utils';

function errorHandling(object, keyPath, important = false){
    if (!object || (!keyPath && important)){
        let error = !object ? 'object of undefined' : 'keyPath of undefined';
        throw error;
    }

    if (!isObject(object)){
        let error = 'object type must be an object not the ' + typeof object;
        throw error;
    }

    if (!isString(keyPath) && important){
        let error = 'keyPath type must be string not the ' + typeof keyPath;
        throw error;
    }

    if (isEmptyObject(object) && important){
        let error = 'empty object not allowed and didn"t get value from empty object of your keyPath ' + keyPath;
        throw error;
    }
    return true;
}

export default errorHandling;
