const jumpSearch = (arr, target) => {

    let length = arr.length;
    let prev = 0;

    if( length <= 0 || target > arr[length -1] || target < arr[0]){
        return - 1;
    }

    let jumpStep = Math.floor(Math.sqrt(length));
    let current = jumpStep;

    while(arr[Math.min(current,length -1)] < target){
        prev = current;
        current += jumpStep;
    }

    while(arr[prev] < target){
        prev++;
        if(prev > Math.min(current,length - 1)){
            return -1;
        }
    }

    if(arr[prev] === target){
        return prev;
    }else{
        return -1;
    }

}

const arr = [3, 8, 14, 21, 29, 35, 42, 50, 61, 73, 88, 95];

//test cases

console.log(jumpSearch(arr, 95));
console.log(jumpSearch(arr, 42));
console.log(jumpSearch(arr, 3));
console.log(jumpSearch(arr, 100));
console.log(jumpSearch([42], 42));

const arr5 = Array.from({ length: 1000 }, (_, i) => i * 3);

console.log(jumpSearch(arr5, 1500));
console.log(jumpSearch(arr5, 1501));
console.log(jumpSearch(arr5, 0));
console.log(jumpSearch(arr5, 2997));

/*
 * Time Complexity:
 *
 * Since the time complexity of Jump Search strongly depends on the jump size,
 * the size of the blocks into which the array is divided directly affects
 * the number of operations required to find the target.
 *
 * In our implementation, the jump size is calculated as the square root
 * of the array length:
 *
 * jumpStep = √n
 *
 * Therefore, the algorithm performs approximately √n jumps to find the
 * appropriate block. After that, it performs a linear search within the
 * selected block, which can also contain at most √n elements.
 *
 * Best Case:
 *
 * The best case occurs when the target is found during the first comparison.
 * Therefore, only one operation is required:
 *
 * O(1)
 *
 * Average Case:
 *
 * In the average case, the algorithm performs approximately √n jumps and
 * then searches through approximately √n elements within the selected block.
 *
 * Therefore:
 *
 * O(√n)
 *
 * Worst Case:
 *
 * In the worst case, the algorithm may need to perform approximately √n jumps
 * and then examine approximately √n elements within the final block.
 *
 * Therefore:
 *
 * O(√n)
 *
 * Space Complexity:
 *
 * The space complexity of our implementation is completely independent of
 * the input size because we create only a constant number of variables
 * (length, prev, jumpStep, and current), regardless of the size of the
 * input array.
 *
 * Therefore:
 *
 * O(1)
 */




