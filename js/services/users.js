const url = "http://localhost:5000/users/"

const loginUser = async (user) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        const state = data.find(e => e.userName == user.userName && e.password == user.password)
        if (state != undefined) {
            localStorage.setItem('user', JSON.stringify(state));
            window.location.href = "profile.html";  
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
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...user, gamesId: [], avatar: null })
            })
            if(!response.ok) {
                alert(`Server Error. ${response.statusText}`)
            }
            localStorage.setItem('user', JSON.stringify({ ...response.json(), gamesId: [], avatar: null }));
            window.location.href = "profile.html"; 
        }
    } catch (e) {
        alert(`Server Error. ${e.message}`)
    }
}

const removeUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    try{
        await fetch(url + user.id, {
            method: "DELETE",
        })
        window.location.href = "login.html"
    } catch(e){
        alert(`Server Error. ${e.message}`)
    }
} 

const addGameId = async (user, gameId) => {
    const newUser = { ...user, gamesId: [...user.gamesId, ...[gameId]] }
    try {
        await fetch(url + user.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        localStorage.setItem("user", JSON.stringify(newUser))
    } catch (e) {
        alert(`Server Error. ${e.message}`)
    }
}

const userIsAuthLink = () => { 
    const authLink = document.getElementById('auth-link');
    const user = JSON.parse(localStorage.getItem('user'));  

    if (user) {
        authLink.textContent = "Профиль";
        authLink.href = "profile.html";
    } else {
        authLink.textContent = "Вход";
        authLink.href = "login.html";
    }
}