import findNestedValue from './common/findNestedValue';
import { nonMutateData } from './common/utils';

function setn(object, keyPath, value){
    let option = {
        type: 'SET_VALUE',
        value: value
    }
    let newObject = nonMutateData(object);
    return findNestedValue(newObject, keyPath, option);
}

export default setn;
