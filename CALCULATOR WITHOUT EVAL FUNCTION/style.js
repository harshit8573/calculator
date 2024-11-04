// 22+77/12-(12/12*12)+76
// 22+77/12-(12/12*12)+76-(18*12)+12
// 22+17-(12-(17/2+16)+(12+14))
// 26+[3+{9+6+(3+5)+(6+7)+6}+56]+36
// 3+5/2*911+22-88/99-(55+11)/12*59/55/66+55*(12*14-(55/66+(8/2-3)+(7+8-9)))/(-22+11*6/2/2*4+5)
// 3+5/2*911+(25/5/5/2*8-(46-36+4))+22-(88/99-(55+11)/12)*59/55/66+55*(12*14-(55/66+(8/2-3)+(7+8-9)))/(-22+11*6/2/2*4+5)

var result = document.getElementById("result");
function display(number) {
    result.value += number;
};

function clr() {
    result.value = "";
}

function dle() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    strToArray();
}

var newAraay = [];
function strToArray() {
  
    final_number = result.value;
    console.log(final_number);
    let digit = Array.from(final_number);
    console.log(digit);

    let currentValue = '';
    for (let i = 0; i < digit.length; i++) {
        if (digit[i] >= '0' && digit[i] <= '9'|| digit[i]=='.') {
            currentValue += digit[i];
        } else {if(currentValue!==''){
            newAraay.push(Number(currentValue));
            currentValue = '';
        }
        newAraay.push(digit[i]);
            
        }
    }
    if( currentValue !==''){
        newAraay.push(Number(currentValue))
    }
    
    console.log(newAraay);
    bigbracket(newAraay)
    curlbracket(newAraay)
    prebracket(newAraay);
    bracket(newAraay);
    divide(newAraay);
    multyply(newAraay);
    additionSubtraction(newAraay)
    result.value = newAraay[0];
}


function divide(equation) {
    let newnum = 0;
    console.log(equation);
    for (let i = 0; i < newAraay.length; i++) {
        if (equation[i] == '/') {
            console.log(i);
            newnum = equation[i - 1] / equation[i + 1]
            console.log(newnum);
            equation[i - 1] = newnum;
            equation.splice(i, 2);
            i--;
            console.log(equation);
        }
    }
}

function multyply(equation) {
    let newnum = 0;
    console.log(equation);
    for (let i = 0; i < newAraay.length; i++) {
        if (equation[i] == '*') {
            console.log(i);
            newnum = equation[i - 1] * equation[i + 1]
            console.log(newnum);
            equation[i - 1] = newnum;
            equation.splice(i, 2);
            i--;
            console.log(equation);
        }
    }
}

function additionSubtraction(equation) {
    let newnum = 0;
    let operator = '+';
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] == '+' || equation[i] == '-') {
            operator = equation[i];
        } else {
            if (operator == '+') {
                newnum += equation[i];
            } else if (operator == '-') {
                newnum -= equation[i];
            }
        }
    }
    equation.length = 0;
    equation.push(newnum);
}
function bracket(newsArray) {
    var start = -1; 
    var end = [];
    let smin = [];
    for (let i in newsArray) {
        if (newsArray[i] == '(') {
            start = parseInt(i);
        }
        if (newsArray[i] == ')') {
            end.push(parseInt(i));
        }
    }
    if (start !== -1) {
        let maxm = Math.max(parseInt(start));
        let eleme = end.length
        for (let i = 0; i < eleme; i++) {
            if (end[i] > maxm) {
                smin.push(end[i]);
            }
        }
        if (smin.length > 0) { 
            let minn = Math.min(parseInt(smin));
            let subarray = newsArray.slice(maxm, minn);
            let result = subarray.filter(x => x !== '(' && x !== ')');
            prebracket(result);
            divide(result);
            multyply(result);
            additionSubtraction(result);
            newsArray.splice(maxm, minn - maxm + 1, result[0]);
        }
    }
    return newsArray;
}
function curlbracket(newsArr) {
    var start = -1; 
    var end = [];
    let smin = [];

    for (let i in newsArr) {
        if (newsArr[i] == '{') {
            start = parseInt(i);
        }
        if (newsArr[i] == '}') {
            end.push(parseInt(i));
        }
    }
    if (start !== -1) {
        let maxm = Math.max(parseInt(start));
        let eleme = end.length;
        for (let i = 0; i < eleme; i++) {
            if (end[i] > maxm) {
                smin.push(end[i]);
            }
        }
        if (smin.length > 0) { 
            let minn = Math.min(parseInt(smin));
            let subarray = newsArr.slice(maxm, minn);
            let result = subarray.filter(x => x !== '{' && x !== '}');
            prebracket(result);
            bracket(result)
            divide(result);
            multyply(result);
       
            newsArr.splice(maxm, minn - maxm + 1, result[0]);
             console.log (newsArr)
        }
    }

    return newsArr;
}
function bigbracket(newsArr) {
    var start = -1; 
    var end = [];
    let smin = [];

    for (let i in newsArr) {
        if (newsArr[i] == '[') {
            start = parseInt(i);
        }
        if (newsArr[i] == ']') {
            end.push(parseInt(i));
        }
    }

    if (start !== -1) {
        let maxm = Math.max(parseInt(start));
        let eleme = end.length;

        for (let i = 0; i < eleme; i++) {
            if (end[i] > maxm) {
                smin.push(end[i]);
            }
        }

        if (smin.length > 0) { 
            let minn = Math.min(parseInt(smin));
            let subarray = newsArr.slice(maxm, minn);
            let result = subarray.filter(x => x !== '[' && x !== ']');

            prebracket(result);
            curlbracket(result)
            bracket(result)
            divide(result);
            multyply(result);
            additionSubtraction(result)
            newsArr.splice(maxm, minn - maxm + 1, result[0]);
            console.log (newsArr)
        }
    }

    return newsArr;
}
function prebracket(newbr){
    let newnum=0;
   let arrlength=newbr.length;
    for(let i=0;i<arrlength;i++){
if(newbr[i]=='('){
     newnum+=1;
     console.log(newbr);
    bracket(newbr);
     i--;
}
    }
    return newbr;
}