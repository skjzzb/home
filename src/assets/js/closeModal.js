function closeWindow(){
    // console.log("closing now...")
    let element = document.getElementsByClassName('modal-backdrop')[0];
    element.parentNode.removeChild(element);
}

export {closeWindow}