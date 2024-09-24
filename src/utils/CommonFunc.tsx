
export const ToNumber = (value) => {
    let rtn = 0
    if (isNaN(value) || value == undefined || value == "" || value == Infinity || value == -Infinity) {
        rtn = 0
    } else {
        rtn = Number(value)
    }

    return rtn
}

export const ToString = (value) => {
    let rtn = ""

    if (value === null || value === undefined || value === "" || value === "null" || value == "undefined") {
        rtn = ""
    } else {
        rtn = value.toString()
    }

    return rtn
}

export const IsNullOrEmpty = (value) => {
    let isEmpty = false

    if ([undefined, null, "", Infinity, 'null', 'undefined'].includes(value)) {
        isEmpty = true
    } else if (typeof value === "string" && value.trim() === "") {
        isEmpty = true
    }

    return isEmpty
}



export const MarkComma = (num) => {
    let len, point, str = '';

    if (!IsNullOrEmpty(num)) {
        num = num + "";
        point = num.length % 3;
        len = num.length;

        str = num.substring(0, point);
        while (point < len) {
            if (str != "") str += ",";
            str += num.substring(point, point + 3);
            point += 3;
        }
    }

    return str;
}

export const AddHyphen = (gubun, value) => {
    value = ToString(value);

    if (!IsNullOrEmpty(gubun) && !IsNullOrEmpty(value)) {
        if (gubun == '사업자등록번호') {
            value = value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')
        } else if (gubun == '주민등록번호') {
            value = value.replace(/([0-9*]{6})([0-9*]{7})/, '$1-$2')
        }
    }

    return value;
}

export const AddDivDate = (gubun, value) => {
    value = ToString(value);

    if (!IsNullOrEmpty(gubun) && !IsNullOrEmpty(value)) {
        value = value.replace(/(\d{4})(\d{2})(\d{2})/, `$1${gubun}$2${gubun}$3`)
    }

    return value;
}
