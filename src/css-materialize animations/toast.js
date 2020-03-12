import M from "materialize-css/dist/js/materialize.min.js";

export const toastAnimation = (text) => {
    if (text === false) {
        return null;
    } else {
        M.toast(({ html: text }));
    }
}

export const toastAnimationDestroy = () => {
    M.Toast.dismissAll();
}