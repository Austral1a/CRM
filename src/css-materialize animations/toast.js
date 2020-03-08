import M from "materialize-css/dist/js/materialize.min.js";
const toastAnimation = () => {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
}
export default toastAnimation;