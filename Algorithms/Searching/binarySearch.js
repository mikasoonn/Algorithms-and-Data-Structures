const binarySearch = (arr, target)=>{
    
    let start = 0;
    let end = arr.length -1;

    while(start <= end){

        const mid = Math.floor((start + end)/2);

        if(arr[mid] === target){
            return mid;
        }else if(arr[mid] > target){
            end = mid - 1;
        }else{
            start = mid  + 1;
        }

    }

    return -1;
}

const arr = [3, 8, 14, 21, 29, 35, 42, 50, 61, 73, 88, 95];

//test cases

console.log(binarySearch(arr, 95));
console.log(binarySearch(arr, 42));
console.log(binarySearch(arr, 3));
console.log(binarySearch(arr, 100));
console.log(binarySearch([42], 42));

/*
* Time Complexity:
 *
 * Since the time complexity of Binary Search directly depends on
 * the position of the target element, it also depends on the number
 * of divisions required before the target is found.
 *
 * Let the number of elements be n and the number of divisions be k.
 * After k divisions, the size of the remaining search space is:
 *
 *                  n / (2^k) >= 1
 *
* Solving this inequality gives:
 *
 *                  k <= log2(n)
 *
 * Therefore, the worst-case time complexity is:
 *
 *                  O(log n)
 *
* Best Case:
 * The best case occurs when the middle element (mid) is the target
 * during the very first comparison. Therefore, only one operation
 * is required:
 *
 *                  O(1)
 *
* Average Case:
 * In the average case, the target is expected to be found
 * after several divisions of the search space. Since the search
 * space is divided by two at each step, the number of required
 * operations grows logarithmically with the input size.
 *
 * Therefore:
 *
 *                  O(log n)
 *
* Space Complexity:
 * The space complexity of our implementation is completely
 * independent of the input size because we create only three
 * variables (low, high, and mid), regardless of the size of the
 * input array.
 *
 * Therefore, the space complexity is:
 *
 *                  O(1)
 */