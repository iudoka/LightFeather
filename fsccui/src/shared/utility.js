import punycode from 'punycode';

export const encode = (value, delimiter) => {
    //
    if (delimiter && value.includes(delimiter)) {
        //
        const delimiterIndex = value.indexOf(delimiter);
        const valLeft = value.substring(0, delimiterIndex);
        const valRight = value.substring(delimiterIndex + 1);

        return encode(valLeft, delimiter) + delimiter + encode(valRight, delimiter);
    } else {
        try {
            return punycode.encode(value)
        } catch (ex) {
            return value;
        }
    }
}

export const updateObject = (oldObject, updatedValues) => {
    //
    return {
        ...oldObject,
        ...updatedValues
    }
}

export const datePatternMMDDYYYY = /^(0[1-9]|1[012])[/ /.](0[1-9]|[12][0-9]|3[01])[/ /.](19|20)\d\d$/;
export const datePatternYYYYMMDD = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
export const emailPattern = /^[a-zA-Z0-9.!#$%&‚Äô*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/; ///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const checkFormValidity = (form, rules) => {
    //
    let errors = null;
    let isValid = true;

    if (rules) {
        if (rules.required) {
            rules["errors"] = null;

            let valid = true;
            rules.required.map(req => (
                req.target.map(target => {
                    //
                    let emptyValue = '';

                    if (form[target].elementConfig.type === 'checkbox') {
                        emptyValue = 'false';
                    }

                    if (trim(form[target].value) !== emptyValue) {
                        if (req.shortCircuit) {
                            // short-circuit if any one of the fields is set
                            let localErrors = null;
                            let found = false;

                            for (let key in req.field) {
                                let emptyReqValue = '';

                                if (form[req.field[key]].elementConfig.type === 'checkbox') {
                                    emptyReqValue = 'false';
                                }

                                if (!found && trim(form[req.field[key]].value) === emptyReqValue) {
                                    if (!localErrors) {
                                        localErrors = {};
                                    }

                                    localErrors[req.field[key]] = req.message;
                                } else {
                                    found = true;
                                }
                            }

                            if (!found) {
                                errors = localErrors;
                                valid = false;
                            }
                        } else {
                            // all inclusive by default
                            for (let key in req.field) {
                                let emptyReqValue = '';

                                if (form[req.field[key]].elementConfig.type === 'checkbox') {
                                    emptyReqValue = 'false';
                                }

                                if (trim(form[req.field[key]].value) === emptyReqValue) {
                                    if (!errors) {
                                        errors = {};
                                    }

                                    errors[req.field[key]] = req.message;
                                    valid = false;
                                }
                            }
                        }
                    }

                    return valid;
                })
            ));

            isValid &= valid;
        }
    }

    return { valid: isValid, errors: errors };
}

export const checkFieldValidity = (value, rules, label, value2) => {
    //
    let isValid = true;
    let errorMessage = [];

    if (rules) {
        if (rules.required) {
            const valid = trim(value) !== '';

            if (!valid)
                errorMessage.push('Please enter ' + label);

            isValid &= valid;
        }

        if (rules.minLength) {
            const valid = value.length >= rules.minLength;

            if (!valid)
                errorMessage.push('Minimum length is ' + rules.minLength + " characters");

            isValid &= valid;
        }

        if (rules.maxLength) {
            const valid = value.length <= rules.maxLength;

            if (!valid)
                errorMessage.push('Maximum length is ' + rules.maxLength + " characters");

            isValid &= valid;
        }

        if (rules.isEmail) {
            const pattern = emailPattern;
            const encodedVal = encode(value, '@');
            const valid = pattern.test(encodedVal);

            if (!valid)
                errorMessage.push('Please enter a valid Email');

            isValid &= valid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            const valid = pattern.test(value);

            if (!valid)
                errorMessage.push("Must be a numeric value");

            isValid &= valid;
        }

        if (rules.isDate && trim(value) !== '') {
            const valid = datePatternYYYYMMDD.test(value);

            if (!valid)
                errorMessage.push("Date must follow pattern mm/dd/yyyy");

            isValid &= valid;
        }

        if (rules.pattern && trim(value) !== '') {
            const valid = rules.pattern.valid.test(value);

            if (!valid)
                errorMessage.push(rules.pattern.message);

            isValid &= valid;
        }

        if (rules.match && trim(value2) !== '') {
            //
            const valid = value === value2;

            if (!valid)
                errorMessage.push(rules.match.message);

            isValid &= valid;
        }
    }

    return { valid: isValid, errorMessage: errorMessage.length > 0 ? errorMessage[0] : '' };//errorMessage.join(', ') };
}

export const trim = (value) => {
    let trimmedValue = '';

    if (value) {
        try {
            trimmedValue = value.trim();
        } catch (e) {
            trimmedValue = '';
        }
    }

    return trimmedValue;
}

/**
 * If you do not use Dates, functions, undefined, Infinity, RegExps, Maps, 
 * Sets, Blobs, FileLists, ImageDatas, sparse Arrays, Typed Arrays or other 
 * complex types within your object, a very simple one liner to deep clone an 
 * object is
 */
export const jsonClone = (jsonValue) => {
    //
    return JSON.parse(JSON.stringify(jsonValue));
}

export const isBlank = (value) => {
    try {
        return (!value || /^\s*$/.test(value));
    } catch (error) { }

    return true;
}

export const isNotBlank = (value) => {
    return !isBlank(value);
}

export const emptyIfNull = (value) => {
    //
    if (!value) return '';

    return value;
}

/**
 * Returns the number of years that has passed since the given date. An example
 * of use is to determine one's age.
 * @param {*} date 
 */
export const getNoYearsSince = (date) => {
    var today = new Date();
    var birthDate = new Date(date);
    var yearsSince = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        yearsSince = yearsSince - 1;
    }

    return yearsSince;
}

/**
 * Returns the boolean equivalent of the given value. If a number,
 * any value that is not zero is considered true.
 * Otherwise, the only value that is considered true will be a
 * trimmed value of 'yes', 'y', 'true', or 't', case insensitive.
 * @param {} value 
 */
export const toBoolean = (value) => {
    if (!value || isBlank(value)) {
        return false;
    }

    if (isNaN(value)) {
        let valueStr = String(value).trim().toLowerCase();
        return valueStr === "yes" || valueStr == "y" ||
               valueStr === "true" || valueStr === "t";
    }

    // Numeric - currently anything that is not zero is considered true
    return Number(value) !== 0
}

export const getUpperCaseLetters = (stringValue) => {
    let result = ""

    if (isBlank(stringValue)) {
        return result;
    }

    stringValue = stringValue.trim();
    for (let i = 0; i < stringValue.length; ++i) {
        if (stringValue.charAt(i) >= 'A' && stringValue.charAt(i) <= 'Z') {
            result += stringValue.charAt(i)
        }
    }
    return result
}

export const toInitialUpper = (value) => {
    if (isBlank(value)) {
        return "";
    }

    let valueStr = value.trim();
    return valueStr.charAt(0).toUpperCase() + (valueStr.length > 1 ? valueStr.slice(1) : '');
}

export const prettyPrintJson = (json) => {
    if (!json) return '';

    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = emptyIfNull(json).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export const shallowEqual = (objA, objB) => {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}

export const shallowCompare = (instance, nextProps, nextState) => {
    const propsEquals = shallowEqual(instance.props, nextProps);
    const stateEquals = shallowEqual(instance.state, nextState);
    //console.log("PROPS EQUALS?", propsEquals);
    //console.log("STATE EQUALS?", stateEquals);
    return (
        !propsEquals || !stateEquals
    );
}

/**
 * Compare the given objects based on the given field to compare
 * @param {} object1 
 * @param {*} object2 
 * @param {*} fieldToCompare 
 */
export const compareObjects = (object1, object2, fieldToCompare) => {

    // Construct expression to compare and let Javascript do the work
    const fieldPortion = fieldToCompare ? ("." + fieldToCompare) : "";
    const value1 = "object1" + fieldPortion;
    const value2 = "object2" + fieldPortion;
    let expression = value1 + " > " + value2 + " ? 1 : (" + 
        value1 + " < " + value2 + " ? -1 : 0)";
    try {
        return eval(expression);
    }
    catch (err) {
        console.log("ERROR: failed to evaluate:\n" + expression + " due to " + err);
        return undefined;
    }
}

/**
 * Constructs a new array which is sorted version of the given array using the
 * optional array fieldsToCompare (and order/direction) to compare the elements
 * in the array. If fieldsToCompare is not specified, each whole element object
 * will be used for comparison and it will be done based on how Javascript will
 * do it. This is when the optional order argument is applicable. When an array
 * of sort elements are provided, each element will be in format "fieldName,desc"
 * where ",asc" or ",desc" portion is optional and it will default to ascending.
 * Sample usage to sort an array using their "category" field in ascending order
 * and "lastUpdateDatetime" in descending order:
 * sortObjectArray(array, [ "category", "lastUpdateDateTime,desc" ])
 * @param {} array
 * @param {*} fieldToCompare 
 */
export const sortObjectArray = (array, fieldsToCompare, order="asc") => {      

    // If there is no field of object specified to compare, use Javascript
    // default sort which compares whole objects in array
    if (!fieldsToCompare || fieldsToCompare.length < 1) {
        let result = array.slice().sort();
        if (order.toLowerCase().startsWith("desc")) {
            result = result.reverse();
        }
        return result;
    }

    // Unfortunately currently do not see a way to use externally defined
	// compareObjects since sort function expects the passed compare function
	// to only have two args
    function thisCompareObjects(object1, object2) {

        let fieldToCompare;
        for (let i = 0; i < fieldsToCompare.length; ++i) {
            fieldToCompare = fieldsToCompare[i];
            // Each fieldToCompare is in form of "fieldName,asc" following
            // Spring Pageable convention with asc/desc being optional, 
            // defaulting to asc
            let sortInfo = fieldToCompare.split(",");
            let fieldName = sortInfo[0].trim()
            let order = (sortInfo[1] || "asc").trim().toLowerCase()

            // Construct expression to compare and let Javascript do the work
            const fieldPortion = "." + fieldName
            const value1 = "object1" + fieldPortion;
            const value2 = "object2" + fieldPortion;
            let expression = value1 + " > " + value2 + " ? 1 : (" + 
                value1 + " < " + value2 + " ? -1 : 0)";
            // if descending, negate result of current expression
            if (order.startsWith("desc")) {
                expression = "- (" + expression + ")"
            }
            
            try {
                let comparisonSoFar = parseInt(eval(expression));
                // If current result of comparison of current field is different, return
                // result, otherwise, check next field in comparison
                if (comparisonSoFar != 0) {
                    //console.log("Returning " + comparisonSoFar + " as a result of " + expression)
                    return comparisonSoFar;
                }
                //console.log("Checking next field after " + expression)
            }
            catch (err) {
                console.log("ERROR: failed to evaluate:\n" + expression + " due to " + err);
                return 0; // to check for next field
            }
        }
    
        // All comparison values same so far
        //console.log("All field comparison results in 0");
        return 0;
    }

    let result = array.slice();
    //console.log("Original array is " + JSON.stringify(result))
    result.sort(thisCompareObjects);
    //console.log("Sorted array is " + JSON.stringify(result))
    return result;
}

/**
 * Checks if the given two array of objects contain the same elements using the
 * optional array of fieldsToCompare to compare the elements. The two arrays do
 * not need to be sorted.
 * Function works by first sorting each of the object arrays and then compare
 * their JSON string representations.
 * Sample usage to compare two objects using their "value" and "label" fields of
 * each element:
 * equalObjectArrays(array1, array2, [ "value", "label" ])
 * @param {} array1 
 * @param {*} array2 
 */
export const equalObjectArrays = (array1, array2, fieldsToCompare) => {
    // Set to vars to help debugging
    const array1Str = JSON.stringify(sortObjectArray(array1, fieldsToCompare))
    const array2Str = JSON.stringify(sortObjectArray(array2, fieldsToCompare))
    return array1Str === array2Str;
}

export const separatePascalCase = (str) => { 
    return str
    // Look for long acronyms and filter out the last letter
    .replace(/([A-Z]+)([A-Z][a-z])/g, ' $1 $2')
    // Look for lower-case letters followed by upper-case letters
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    // Look for lower-case letters followed by numbers
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/^./, function(str){ return str.toUpperCase(); })
    // Remove any white space left around the word
    .trim();
}

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const validWildCard = (str) => {
    //
    var pattern = /^[^*]{3,}[*]$/;

    return pattern.test(str);
}

export const hasOnlySpecialChars = (str) => {
    //
    var pattern = /^[^a-zA-Z0-9]+$/;

    return pattern.test(str);
}