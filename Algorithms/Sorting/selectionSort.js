function selectionSort(arr){

    const length = arr.length;
    
    for(let i = 0; i < length - 1; i++){

        let minIndex = i;

        for(let j = i + 1; j < length ;j++){

            if(arr[minIndex] > arr[j]){
                minIndex = j;
            }
        }
        if(minIndex !== i){
            [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
        }
    }

    return arr;
}

//test case
console.log(selectionSort([14,4,3,2,84,1,6]));


/*
Time Complexity

Worst Case: O(n^2)
Best Case: O(n^2)
Averge Case: O(n^2)

Space Complexity
O(1)
*/