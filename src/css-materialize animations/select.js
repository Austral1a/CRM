import M from "materialize-css/dist/js/materialize.min.js";
let elems;
export const selectAnimation = () => {
    elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
}
export const selectAnimationDestroy = () => {
    let instance = M.FormSelect.getInstance(...elems);
    instance.destroy();
}

