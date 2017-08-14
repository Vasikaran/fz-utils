import copyContent from './common/copyContent';

function move(srcPath, targetPath){
    let isCopy = false;
    copyContent(srcPath, targetPath, isCopy);
}

export default move;
