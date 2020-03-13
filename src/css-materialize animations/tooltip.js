import M from "materialize-css/dist/js/materialize.min.js";
let instance;
export const tooltipAnimation = (elem) => {
    var instances = M.Tooltip.init(elem);
    instance = M.Tooltip.getInstance(elem);
};
export const tooltipDestroy = () => {
    instance.destroy();
}

/* import M from "materialize-css/dist/js/materialize.min.js";
let instance;
export const tooltipAnimation = (elem) => {
    var instances = M.Tooltip.init(elem);
    instance = M.Tooltip.getInstance(elem);
    
};
export const tooltipDestroy = () => {
    instance.destroy();
}
 */