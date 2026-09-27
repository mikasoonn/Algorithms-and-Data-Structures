function mergeSort(arr, start, end){
    if(start >= end){
        return;
    }
    const mid = Math.floor((start + end)/2);
    mergeSort(arr,start, mid);
    mergeSort(arr,mid + 1, end);
    merge(arr,start,mid,end);
    return arr;
}

function merge(arr, start, mid, end){
    let left = arr.slice(start,mid + 1);
    let right = arr.slice(mid+1,end + 1);
    const lsize = left.length;
    const rsize = right.length;
    let i = 0; 
    let j = 0;
    let k = start;
    while(i < lsize && j < rsize){
        if(left[i] <= right[j]){
            arr[k++] = left[i++];
        }else{
            arr[k++] = right[j++];
        }
    }
    
    while(i < lsize){
        arr[k++] = left[i++];
    }

    while(j < rsize){
        arr[k++] = right[j++];
    }
}

//test case
let array = [5,4,3,0,0,8,7,3,4,10,2,2];
console.log(mergeSort(array,0,array.length-1));

//Time Complexity

//Worst Case: O(nlogn)
//Best Case: O(nlogn)
//Average Case: O(nlogn)

//Space Complexity
//O(n)