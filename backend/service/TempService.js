// Service methods for temperature calculations

// Finds the value that is closest to 0
// If two values are the same absolute distance from 0, the positive value is returned
// If any of the values are of the wrong type, null is returned
function findCloseToZero(temperatures) {
    var closestToZero = temperatures[0];
    temperatures.forEach(temp => {
        if (typeof temp !== "number") { // if the provided value is not a number
            return null;
        }
        else {
            let absoluteTemp = Math.abs(temp);
            // if the absolute value of the current closest number is the same as the temp, but temp is a higher number (same absolute value, but one number is negative)
            if (absoluteTemp === Math.abs(closestToZero) && temp > closestToZero) {
                closestToZero = temp;
            }
            // if the absolute temp is lower than the current closest temp
            else if (absoluteTemp < Math.abs(closestToZero)) {
                closestToZero = temp;
            }
        }
    });

    return closestToZero;
}

export { findCloseToZero };