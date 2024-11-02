const url = "http://localhost:5000/users/"

const loginUser = async (user) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        const state = data.find(e => e.userName == user.userName && e.password == user.password)
        if (state != undefined) {
            return state
        } else {
            return "Пользователь с таким логином или паролем не найден"
        }
    } catch (e) {
        alert(`Server Error. ${e.message}`)
    }
}

const registerUser = async (user) => {
    try {
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
                body: JSON.stringify({ ...user, gamesId: [] })
            })
            return user
        }
    } catch (e) {
        alert(`Server Error. ${e.message}`)
    }
}

const addGameId = async (user, gameId) => {
    const newUser = {...user, gamesId: [...user.gamesId, ...[gameId]]}
    try{
        await fetch(url + user.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
    } catch (e) {
        alert(`Server Error. ${e.message}`)
    }
}