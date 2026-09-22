function bubbleSort (arr){

    const length = arr.length;
    
    for(let i = 0; i < length; i++){

        let swapCount = 0;

        for(let j = 0; j < length - 1 - i; j++){

            if(arr[j] > arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
                swapCount++;
            }
        }

        if(swapCount === 0){
            return arr;
        }
    }

    return arr;
}

//test case
console.log(bubbleSort([14,4,3,2,84,1,6]));

/* 
Time Complexity

Worst Case: O(n^2)
Best Case: O(n)
Average Case: O(n^2)

Space Complexity
O(1)
*/