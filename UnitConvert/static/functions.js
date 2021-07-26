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
        'cup' : ['grams', 'kilograms', 'ounce', 'pound'],
        'teaspoon' : ['grams', 'kilograms', 'ounce', 'pound'],
        'tablespoon' : ['grams', 'kilograms', 'ounce', 'pound'],
        'fluid ounce' : ['grams', 'kilograms', 'ounce', 'pound'],
        'pint' : ['grams', 'kilograms', 'ounce', 'pound'],
        'quart' : ['grams', 'kilograms', 'ounce', 'pound'],
        'gallon' : ['grams', 'kilograms', 'ounce', 'pound'],
        'milliliters' : ['grams', 'kilograms', 'ounce', 'pound'],
        'liters' : ['grams', 'kilograms', 'ounce', 'pound'],
        'ounce' : ['cup', 'teaspoon', 'tablespoon', 'fluid ounce', 'pint', 'quart', 'gallon'],
        'pound' : ['cup', 'teaspoon', 'tablespoon', 'fluid ounce', 'pint', 'quart', 'gallon'],
        'grams' : ['cup', 'teaspoon', 'tablespoon', 'fluid ounce', 'pint', 'quart', 'gallon'],
        'kilograms' : ['cup', 'teaspoon', 'tablespoon', 'fluid ounce', 'pint', 'quart', 'gallon']
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
    var units = [
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

    return units;
}

function unitOrders() {
    var unitOrder = [
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

    return unitOrder;
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
    var increasingConversions = {
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

    return increasingConversions;
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
    let startValue = unitOrders().findIndex(startUnit);
    let endValue = unitOrder().findIndex(endUnit);
    if (startValue > endValue) {
        return (1 / conversionRate(endUnit, startUnit));
    } else {
        return conversionRate(startUnit, endUnit);
    }
}

function buildString(amount, startUnit, endUnit) {
    var rate = fixedConversionRate(startUnit, endUnit);
    var result = (amount * rate);
    var output = amount + " " + startUnit + "s ";
    output += "is equivalent to " + result + " " + endUnit + "s.";
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