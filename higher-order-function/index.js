// return a function
function multiplyBy(num1){
    return function(num2){
        return num1 * num2
    }
};

const multiply = multiplyBy(2);
console.log(multiply(4));


// take a funtion as parametar

function applyOperation(x,y,operation){
    return operation(x,y);
};

const output= applyOperation(2,3,(a,b)=>{
    console.log(a,b);
    const result = a*b;
    return result;
});

console.log(output)