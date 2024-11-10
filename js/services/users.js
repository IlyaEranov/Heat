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
                body: JSON.stringify({ ...user, gamesId: [], avatar: null, cartId: [], balance: 0 })
            })
            localStorage.setItem('user', JSON.stringify(await response.json()));
            window.location.href = "profile.html";
        }
    } catch (e) {
        alert(`Server Error. ${e.message}`)
    }
}

const removeUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"))
    try {
        await fetch(url + user.id, {
            method: "DELETE",
        })
        window.location.href = "login.html"
    } catch (e) {
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

const addGameInCart = async (user, gameId) => {
    try {
        // Проверяем, если игра уже в корзине
        if (user.cartId.includes(gameId)) {
            alert("Игра уже добавлена в корзину");
            return;
        }

        // Создаем обновленный объект пользователя с новой игрой в корзине
        const updatedUser = { ...user, cartId: [...user.cartId, gameId] };

        // Логируем данные перед отправкой запроса
        console.log('Отправляем запрос на обновление пользователя: ', updatedUser);

        // Отправляем запрос на обновление данных пользователя
        const response = await fetch(url + user.id, {
            method: "PATCH", // Используем PATCH для частичного обновления данных
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        });

        // Проверяем, успешен ли ответ
        if (!response.ok) {
            alert("Ошибка при обновлении данных пользователя");
            console.error(`Ошибка при обновлении пользователя: ${response.statusText}`);
            return;
        }

        // Получаем обновленные данные пользователя
        const updatedUserData = await response.json();
        
        // Логируем полученные данные
        console.log('Обновленные данные пользователя:', updatedUserData);

        // Сохраняем обновленные данные в localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        // Перенаправляем на страницу профиля
        window.location.href = "profile.html";
    } catch (e) {
        alert(`Ошибка при добавлении игры в корзину: ${e.message}`);
        console.error(`Ошибка при добавлении игры в корзину: ${e.message}`);
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

const topUpBalance = async (user) => {
    const newBalance = user.balance + 500; // увеличиваем баланс на 500 рублей
    const updatedUser = { ...user, balance: newBalance };
    try {
        const response = await fetch(url + user.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        });
        const updatedUserData = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUserData)); // сохраняем обновленного пользователя в localStorage
        return updatedUserData; // возвращаем обновленного пользователя
    } catch (e) {
        alert(`Ошибка при пополнении баланса: ${e.message}`);
    }
}
