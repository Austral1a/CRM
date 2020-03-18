import M from "materialize-css/dist/js/materialize.min.js";
let elems;
export const selectAnimation = (node) => {
    elems = node.current;
    let instances = M.FormSelect.init(elems);
}
export const selectAnimationDestroy = () => {
    let instance = M.FormSelect.getInstance(elems);
    instance.destroy();
}

