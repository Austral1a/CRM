import M from "materialize-css/dist/js/materialize.min.js";
const toastAnimation = async (text) => {
    if (text == false) {
        return null;
    } else {
        M.toast(({ html: text }))
    }
}
export default toastAnimation;