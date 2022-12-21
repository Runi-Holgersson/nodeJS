import process from 'node:process'

const revertString = (data: string) => {
    return data.split("").reverse().join("");
}

process.stdin.on("data", function(data){
    process.stdout.write("--> ");
    process.stdout.write(revertString(data.toString()));
    process.stdout.write("\n");
})