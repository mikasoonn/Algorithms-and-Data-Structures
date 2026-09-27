function countingSortCumulative(arr){
    if(arr.length <= 1){
        return arr;
    }
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const length = Math.floor(max - min + 1);

    let countArr = new Array(length).fill(0);

    for(let i = 0; i < arr.length;i++){
        countArr[arr[i] - min]++;
    }

    for(let i = 1; i < countArr.length; i++){
        countArr[i] += countArr[i - 1];
    }
    let res = [];
    for(let i = arr.length - 1; i >= 0; i--){
        res[countArr[arr[i] - min] - 1] = arr[i];
        countArr[arr[i] - min]--;
        
    }
    return res;
}

//test case
console.log(countingSortCumulative([5,5,-5,7,-7,0,1,2,3,2]));

//Time Complexity

//Worst Case: O(n + k)
//Best Case: O(n + k)
//Average Case: O(n + k)

//Space Complexity
//O(k + n)
