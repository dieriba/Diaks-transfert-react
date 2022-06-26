/* eslint-disable linebreak-style */
function calculFees(value) {
    let fees;

    if (value >= 20 && value <= 50) return (fees = 2);
    if (value >= 50 && value < 100) return (fees = 3);
    if (value >= 100 && value < 1000) {
        if (Number.isInteger((4 * value) / 100)) {
            return (fees = 4 * (value / 100));
        }
        return (fees = Math.floor((fees = 4 * (value / 100))));
    }
    if (value >= 1000) {
        if (Number.isInteger((3 * value) / 100)) {
            return (fees = 3 * (value / 100));
        }
        return (fees = Math.floor(3 * (value / 100)));
    }
}

export default calculFees;
