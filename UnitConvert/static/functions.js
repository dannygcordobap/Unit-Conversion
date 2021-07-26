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

function convert() {
    var startUnit = document.getElementById("startUnit").value.toLowerCase();
    var endUnit = document.getElementById("endUnit").value.toLowerCase();
    var result = document.getElementById("result");
    if (validateInput(startUnit)) {
        if (validateInput(endUnit)) {
            if (validConversion(startUnit, endUnit)) {
                result.textContent = "Calculated";
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