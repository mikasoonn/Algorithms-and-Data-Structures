function insertionSort(arr){

    const length = arr.length;
    
    for(let i = 1; i < length; i++){

        let key = arr[i];
        let j = i - 1;

        while(j >= 0 && arr[j] > key){

            arr[j+1] = arr[j];
            j--;
        }

        arr[j+1] = key;
    }

    return arr;
}

let arr = [8,5,1,4,3,2,9,1.5];

//test case
console.log(insertionSort(arr));

//Time Complexity

//Worst Case: O(n^2)
//Best Case: O(n)
//Average Case O(n^2)

//Space Complexity

// O(1);