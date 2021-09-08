function unitSuggestions(startEnd) {
    var div, input, filter, ul, li, a, i;
    if (startEnd == 'start') {
        div = document.getElementById("myDropdown1");
        input = document.getElementById("startUnit");
    } else if (startEnd == 'end') {
        div = document.getElementById("myDropdown2");
        input = document.getElementById("endUnit");
    }
    filter = input.value.toUpperCase();
    a = div.getElementsByTagName("p");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function clickFill(startEnd, value) {
    if (startEnd == "start") {
        let inputField = document.getElementById("startUnit");
        inputField.value = value;
    } else if (startEnd == "end") {
        let inputField = document.getElementById("endUnit");
        inputField.value = value;
    }
}

function invalidConversionDict() {
    var invalidConversions = {
        'cup' : ['gram', 'kilogram', 'ounce', 'pound'],
        'teaspoon' : ['gram', 'kilogram', 'ounce', 'pound'],
        'tablespoon' : ['gram', 'kilogram', 'ounce', 'pound'],
        'fluid ounce' : ['gram', 'kilogram', 'ounce', 'pound'],
        'pint' : ['gram', 'kilogram', 'ounce', 'pound'],
        'quart' : ['gram', 'kilogram', 'ounce', 'pound'],
        'gallon' : ['gram', 'kilogram', 'ounce', 'pound'],
        'milliliter' : ['gram', 'kilogram', 'ounce', 'pound'],
        'liter' : ['gram', 'kilogram', 'ounce', 'pound'],
        'ounce' : ['cup', 'teaspoon', 'tablespoon', 'fluid ounce', 'pint', 'quart', 'gallon', 'milliliter', 'liter'],
        'pound' : ['cup', 'teaspoon', 'tablespoon', 'fluid ounce', 'pint', 'quart', 'gallon', 'milliliter', 'liter'],
        'gram' : ['cup', 'teaspoon', 'tablespoon', 'fluid ounce', 'pint', 'quart', 'gallon', 'milliliter', 'liter'],
        'kilogram' : ['cup', 'teaspoon', 'tablespoon', 'fluid ounce', 'pint', 'quart', 'gallon', 'milliliter', 'liter']
    };

    return invalidConversions;
}

function validConversion(startUnit, endUnit) {
    var invalidConversions = invalidConversionDict();
    if (invalidConversions[startUnit].includes(endUnit)) {
        return false;
    } else {
        return true;
    }
}

function validateInput(value) {
    var invalidConversions = invalidConversionDict();
    if (value in invalidConversions) {
        return true;
    } else {
        return false;
    }
}

function imperialUnits() {
    return [
        'teaspoon',
        'tablespoon',
        'fluid ounce',
        'cup',
        'pint',
        'quart',
        'gallon',
        'ounce',
        'pound',
    ];
}

function unitOrders() {
    return [
        'teaspoon',
        'tablespoon',
        'fluid ounce',
        'cup',
        'pint',
        'quart',
        'gallon',
        'ounce',
        'pound',
        'gram',
        'kilogram',
        'milliliter',
        'liter'
    ];
}

function sameSystem(startUnit, endUnit) {
    var imperialUnit = imperialUnits();
    
    if (imperialUnit.includes(startUnit)) {
        if (imperialUnit.includes(endUnit)) {
            return true;
        } else {
            return false;
        }
    } else {
        if (imperialUnit.includes(endUnit)) {
            return false;
        } else {
            return true;
        }
    }
}

function isImperial(unit) {
    var imperialUnit = imperialUnits()

    if (imperialUnit.includes(unit)) {
        return true;
    } else {
        return false;
    }
}

function unitConversions() {
    return {
        'teaspoon' : ['tablespoon', 1/3],
        'tablespoon' : ['fluid ounce', 1/2],
        'fluid ounce' : ['cup', 1/8],
        'cup' : ['pint', 1/2],
        'pint' : ['quart', 1/2],
        'quart' : ['gallon', 1/4],
        'ounce' : ['pound', 1/16],
        'milliliter' : ['liter', 1/1000],
        'gram' : ['kilogram', 1/1000]
    };
}

function conversionRate(currentUnit, goalUnit) {
    var unitConversion = unitConversions();

    if (currentUnit == goalUnit) {
        return 1;
    } else {
        let nextUnit = unitConversion[currentUnit][0];
        let cumulativeRate = unitConversion[currentUnit][1];
        return conversionRate(nextUnit, goalUnit) * cumulativeRate;
    }
}

function fixedConversionRate(startUnit, endUnit) {
    if (sameSystem(startUnit, endUnit)) {
        let startValue = unitOrders().indexOf(startUnit);
        let endValue = unitOrders().indexOf(endUnit);
        if (startValue <= endValue) {
            return conversionRate(startUnit, endUnit);
        } else {
            return 1/conversionRate(endUnit, startUnit);
        }
    } else {
        return toDifferentSystem(startUnit, endUnit);
    }
}

function complexConversionDict() {
    return {
        "ounce" : ["gram", 28.3495],
        "fluid ounce" : ["milliliter", 29.574],
    };
}

function toDifferentSystem(startUnit, endUnit) {
    var firstRate = 1;
    var secondRate = 1;
    if (isImperial(startUnit)) {
        // simplify with a function
        if (validConversion(startUnit, "ounce")) {
            firstRate = fixedConversionRate(startUnit, "ounce");
            secondRate = fixedConversionRate("gram", endUnit);
            return firstRate * secondRate * complexConversionDict()["ounce"][1];
        } else {
            firstRate = fixedConversionRate(startUnit, "fluid ounce");
            secondRate = fixedConversionRate("milliliter", endUnit);
            return firstRate * secondRate * complexConversionDict()["fluid ounce"][1];
        }
    } else {
        if (validConversion(startUnit, "gram")) {
            firstRate = fixedConversionRate(startUnit, "gram");
            secondRate = fixedConversionRate("ounce", endUnit);
            return firstRate * secondRate * (1/complexConversionDict()["ounce"][1]);
        } else {
            firstRate = fixedConversionRate(startUnit, "milliliter");
            secondRate = fixedConversionRate("fluid ounce", endUnit);
            return firstRate * secondRate * (1/complexConversionDict()["fluid ounce"][1]);
        }
    }
}

function buildString(amount, startUnit, endUnit) {
    var rate = fixedConversionRate(startUnit, endUnit);
    var result = (amount * rate);
    var output = amount + " " + startUnit + "s ";
    output += "is equivalent to " + result + " " + endUnit + ".";
    return output;
}



function convert() {
    var startUnit = document.getElementById("startUnit").value.toLowerCase();
    var endUnit = document.getElementById("endUnit").value.toLowerCase();
    var result = document.getElementById("result");
    var amount = parseFloat(document.getElementById("quantity").value);
    if (validateInput(startUnit)) {
        if (validateInput(endUnit)) {
            if (validConversion(startUnit, endUnit)) {
                result.textContent = buildString(amount, startUnit, endUnit);
            } else {
                result.textContent = "Invalid conversion";
            }
        } else {
            result.textContent = "Invalid end unit";
        }
    } else {
        result.textContent = "Invalid start unit";
    }
}