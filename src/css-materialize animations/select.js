import M from "materialize-css/dist/js/materialize.min.js";
let elems;
export const selectAnimation = (node) => {
    ///elems = document.querySelectorAll('select');
    elems = node.current;
    console.log(node)
    let instances = M.FormSelect.init(elems);
}
export const selectAnimationDestroy = () => {
    let instance = M.FormSelect.getInstance(elems);
    instance.destroy();
}

