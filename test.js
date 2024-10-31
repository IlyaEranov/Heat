let user = {name: "John", keys: []}

let newKey = 4

let a = {...user, keys: [...user.keys, ...[newKey]]}

console.log(a.keys)