import M from "materialize-css/dist/js/materialize.min.js";
let instance;
export const modalAnimation = (node, options) => {
    let instances = M.Modal.init(node, options);
    instance = M.Modal.getInstance(node);
}
export const modalDestroy = () => {
    instance.destroy();
}
export const modalOpen = () => {
    instance.open();
}
