function rangeLimit(myString, lowerValue, upperValue) {
    if (myString == '') {
        myString = 0;
    }
    if (myString < lowerValue) {
        myString = lowerValue;
    }
    if (myString > upperValue) {
        myString = upperValue;
    }
    return myString;
}