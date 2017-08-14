let isObject = (object)=>{
    if (object){
        return object.toString() === '[object Object]' ? true : false;
    }
    return false;
}

let isEmptyObject = (object)=>{
    return JSON.stringify(object) === '{}' ? true : false;
}

let isArray = (array)=>{
    return Array.isArray(array) ? true : false;
}

let isString = (string)=>{
    return typeof string === 'string' ? true : false;
}

let isNumber = (number)=>{
    return Number(number) ? true : false;
}

let stringHasValue = (string, value)=>{
    return string.search(value) !== -1 ? true : false;
}

let hasValue = (object, key)=>{
    return object[key] ? true : false;
}

let getValueFromObject = (object, key)=>{
    return object[key];
}

let nonMutateData = (data)=>{
    let newData;
    if (isObject(data)){
        newData = Object.assign({}, data);
    }else if (isArray(data)){
        newData = data.slice();
    }else{
        newData = data;
    }
    return data;
}

export {
    isObject,
    isEmptyObject,
    isArray,
    isString,
    isNumber,
    stringHasValue,
    hasValue,
    getValueFromObject,
    nonMutateData
}
