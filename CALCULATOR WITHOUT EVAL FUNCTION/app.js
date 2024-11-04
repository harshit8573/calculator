$(document).ready(function(){
    var result = $("#result");
    $(".screen").on("click", function() {
        var buttonText = $(this).text();
        result.val(result.val() + buttonText);
    });
$(".clear").on("click",function(){
    $('#result').val("");
})
$(".delete").on("click", function () {
    var currentText = $("#result").val();
    $("#result").val(currentText.slice(0, -1));
});
$(".equal").on("click", function calculate() {
    var element=$("#result").val()
    var currentValue='';
    var mainArray=[];
    var arr=element.split("");
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i] === '(' || arr[i] === '{' || arr[i] === '[') && arr[i + 1] === '-') {
            currentValue += arr[i + 1] + arr[i + 2];
            // console.log(currentValue)
            arr.splice(i + 1, 2, currentValue);
            // console.log(arr);
            currentValue = '';
        }
        if (!isNaN(arr[i]) || arr[i] == '.') {
            currentValue += arr[i];
        }
        else {
            if (currentValue !== '') {
                mainArray.push(Number(currentValue));
                currentValue = '';
            }
            mainArray.push(arr[i]);
        }
    }
    if (currentValue !== '') {
        mainArray.push(Number(currentValue));
    }
    console.log(mainArray)
    bigbracket(mainArray)
    curlbracket(mainArray)
    prebracket(mainArray);
    bracket(mainArray);
    divide(mainArray);
    multyply(mainArray);
    additionSubtraction(mainArray)
    var element=$("#result").val(mainArray)
function divide(equation) {
    let newnum = 0;
    console.log(equation);
    for (let i = 0; i < equation.length; i++) {
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
    for (let i = 0; i < equation.length; i++) {
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
    console.log(equation)
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
});
});
// 3+5/2*911+22-88/99-(55+11)/12*59/55/66+55*(12*14-(55/66+(8/2-3)+(7+8-9)))/(-22+11*6/2/2*4+5)
// 3+5/2*911+(25/5/5/2*8-(46-36+4))+22-(88/99-(55+11)/12)*59/55/66+55*(12*14-(55/66+(8/2-3)+(7+8-9)))/(-22+11*6/2/2*4+5)
