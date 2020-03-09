const toFixed = (x, fraction) => {
    // if the number doesn't have any fraction, then nothin to do 
    if (Number.isInteger(x)) {
        return x;
        // else - vice-versa
    } else {
        x = String(x.toFixed(fraction))
        return Number(x.replace(/0+/, ''))
    }
}
export default toFixed;