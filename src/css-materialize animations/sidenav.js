import M from "materialize-css/dist/js/materialize.min.js";
let instance;
export const sidenavAnimation = (node) => {
    var instances = M.Sidenav.init(node);
    instance = M.Sidenav.getInstance(node);
}

export const sidenavDestroy = () => {
    instance.destroy();
};

export const sidenavClose = () => {
    instance.close();
}

