const url = "http://localhost:5000/users/"

const loginUser = async (user) => {
    const response = await fetch(url)
    const data = await response.json()
    const state = data.find(e => e.userName == user.userName && e.password == user.password)
    if (state != undefined) {
        return state
    } else {
        return "Пользователь с таким логином или паролем не найден"
    }

}

const registerUser = async (user) => {
    const response = await fetch(url)
    const data = await response.json()
    if (data.find(e => user.userName == e.userName)) {
        return "Пользователь с таким логином уже зарегестрирован"
    } else if (data.find(e => user.email == e.email)) {
        return "Пользователь с такой почтой уже зарегестрирован"
    } else {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        return user
    }
} 