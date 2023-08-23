export default function formatAssignmentNames(arr){
    if (arr.length === 1) {
        return arr[0];
    } else if (arr.length === 2) {
        //joins all with "and" but no commas
        //example: "bob and sam"
        return arr.join(' and ');
    } else if (arr.length > 2) {
        //joins all with commas, but last one gets ", and" (oxford comma!)
        //example: "bob, joe, and sam"
        return arr.slice(0, -1).join(', ') + ', and ' + arr.slice(-1);
    }
}