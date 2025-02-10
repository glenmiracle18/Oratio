
// a short lesson on promises

function orderFood(dish: string){
    return new Promise((resolve, reject) => {
        if ((dish) === "burger") {
            setTimeout(() => resolve("burger is ready"), 2000)
        } else {
            reject("we ran out of ingredients");
        }
    })
}


orderFood("burger")
    .then((food) => {
        console.log("yay, got my order: ", food)
    })
    .catch((error) => {
        console.log("there was a pb: ", error)
    });