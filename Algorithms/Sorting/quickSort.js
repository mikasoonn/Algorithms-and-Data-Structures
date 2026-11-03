function quickSort(arr,first,last){
    if(first < last){
    let pivotIndex = partition(arr,first,last);
    quickSort(arr,first,pivotIndex-1);
    quickSort(arr,pivotIndex+1,last);
    }
    return arr;

}

function partition(arr,first,last){
    let pivotIndex = findPivot(arr,first,last);
    [arr[first],arr[pivotIndex]] = [arr[pivotIndex],arr[first]];
    // console.log(`${pivotIndex}: ${pivot}\n`);
    let pivot = arr[first];
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
    [arr[right],arr[first]] = [arr[first],arr[right]];
    return right;
}

function findPivot(arr,first,last){
    let startVal = arr[first];
    let endVal = arr[last];
    let mid = Math.floor((first+last)/2);
    let midVal = arr[mid];
    if(startVal >= endVal && startVal <= midVal || startVal <= endVal && startVal >= midVal){
        return first;
    }else if(endVal >= startVal && endVal <= midVal || endVal <= startVal && endVal >= midVal){
        return last;
    }else{
        return mid;
    }
   
}

console.log(quickSort([14,4,3,2,84,1,6],0,6));
