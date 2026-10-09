function quickSort(arr,first,last){
    if(first < last){
    let pivotIndex = partition(arr,first,last);
    quickSort(arr,first,pivotIndex-1);
    quickSort(arr,pivotIndex+1,last);
    }
    return arr;

}

function partition(arr,first,last){
    // let pivotIndex = findPivot(arr,first,last);
    let pivotIndex = first;
    let pivot = arr[pivotIndex];
    // console.log(`${pivotIndex}: ${pivot}\n`);
    let left = first;
    let right = last;
    while(left <= right){
        while(arr[left] <= pivot){
            left++;
        }
        while(arr[right] > pivot){
            right--;
        }
        if(left < right){
            [arr[left],arr[right]] = [arr[right],arr[left]];
            left++;
            right--;
        }
    }
    [arr[right],arr[pivotIndex]] = [arr[pivotIndex],arr[right]];
    return right;
}

function findPivot(arr,first,last){
    let startIndex = arr[first];
    let endIndex = arr[last];
    let mid = Math.floor((first+last)/2);
    let midIndex = arr[mid];
    if(startIndex >= endIndex && startIndex <= midIndex || startIndex <= endIndex && startIndex >= midIndex){
        return first;
    }else if(endIndex >= startIndex && endIndex <= midIndex || endIndex <= startIndex && endIndex >= midIndex){
        return last;
    }else{
        return mid;
    }
   
}

console.log(quickSort([14,4,3,2,84,1,6],0,6));
