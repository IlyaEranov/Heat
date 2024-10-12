const users = [
    {"id": 1, "name": "John", "userName": "John", "email": "enau@mail.ru", "password": "qwezxc123", "type": "developer"}
]

const loginUser = (user) => {
    const state = users.find(e => e.userName == user.userName && e.password == user.password)
    if (state == undefined) {
        return "Пользователя с такой почтой или паролем не существует"
    } else {
        return state
    }
}
const registerUser = (user) => {
    if (users.find(e => e.email == user.email) != undefined) {
        return "Пользователь с такой почтой уже существует"
    } else if (users.find(e => e.name == user.name) != undefined) {
        return "Пользователь с таким именем уже существует"
    } else if (users.find(e => e.userName == user.userName) != undefined) {
        return "Пользователь с таким логином уже существует"
    } else {
        users.push(user)
        return user
    }
}
