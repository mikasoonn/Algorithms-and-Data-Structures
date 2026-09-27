function countingSort(arr){
    if(arr.length <= 1){
        return arr;
    }
    let res = [];
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const length = Math.floor(max - min + 1);

    let count = new Array(length).fill(0);

    for(let i = 0; i < arr.length; i++){
        count[arr[i] - min]++;
    }

    for(let i = 0; i < count.length; i++){
        while(count[i]){
            res.push(i + min);
            count[i]--;
        }
    }
    return res;
}

//test case
console.log(countingSort([5,5,-5,7,-7,0,1,2,3,2]));

//Time Complexity

//Worst Case: O(n + k)
//Best Case: O(n + k)
//Average Case: O(n + k)

//Space Complexity
//O(k + n)