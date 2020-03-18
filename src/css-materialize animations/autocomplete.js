import M from "materialize-css/dist/js/materialize.min.js";
let instance; 
export const autocomplete = (node, options) => {
    let instances = M.Autocomplete.init(node, options);
    instance = M.Autocomplete.getInstance(node);
};

export const autocompleteDestroy = () => {
    instance.destroy();
}