import M from "materialize-css/dist/js/materialize.min.js";
let instance;
export const collapsibleAnimation = (node, options) => {
    let instances = M.Collapsible.init(node, options);
    instance = M.Collapsible.getInstance(node);
}
export const collapsibleDestroy = () => {
    instance.destroy();
}

