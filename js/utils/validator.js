const ValidateErrors = {
    isRequired: "Заполните это поле",
    isEmail: "Введен неккоректный email",
    isShortName: "Имя пользователя должно быть не меньше 3 букв",
    isLongName: "Имя пользователя должно быть не больше 12 букв",
    isUserName: "Логин должен быть не меньше 3 и не больше 12 букв, а также содержать только латинские буквы",
    isPassword: "Пароль должен содержать не менее 8 символов, как минимум включать одну цифру, 1 заглавную и 1 строчную латинские буквы, а также содержать хоят бы 1 спец. символ"
}

const validate = (key, value) => {
    if (value.trim().length == 0) {
        return ValidateErrors.isRequired
    }
    switch (key) {
        case "email":
            const emailRegExp = /^\S+@\S+\.\S+$/g
            if (emailRegExp.test(value)) {
                return null
            } else {
                return ValidateErrors.isEmail
            }
        case "userName":
            const userNameRegExp = /^[a-zA-Z][\sa-zA-Z]{2,12}$/g
            if(userNameRegExp.test(value)){
                return null
            } else {
                return ValidateErrors.isUserName
            }
        case "password":
            const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,}$/g
            if(passwordRegExp.test(value)){
                return null
            } else {
                return ValidateErrors.isPassword
            }
        default:
            return null
    }
}

const validateForm = (data) => {
    const stateValidate = {}
    for (let key in data) {
        const state = validate(key, data[key])
        if (state != null) {
            stateValidate[key] = state
        }
    }
    return stateValidate
}