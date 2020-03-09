import M from "materialize-css/dist/js/materialize.min.js";
const tooltipAnimation = () => {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
}
export default tooltipAnimation;