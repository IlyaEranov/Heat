function generateKey(){
    const a = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890"
    let result = ""
    for(let i = 0; i < 15; i++){
        if(i == 5 || i == 10){
            result += "-"
        }
        result += a[Math.floor(Math.random() * a.length)]
    }
    return result
}