const gameUrl = "http://localhost:5000/games/";

const getGames = async () => {
    try{
        const response = await fetch(gameUrl)
        const data = await response.json()
        return data
    } catch (e) {
        alert("Ошибка получения игр")
    }
}

const publishGame = async (gameData) => {
    // Получаем существующие игры
    const data = await getGames()
    // Добавляем новую игру в массив
    data.push(gameData)
    // Сохраняем обновленный массив обратно в db.json
    try {
        await fetch(gameUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameData)
        });
    } catch (e) {
        alert("Ошибка выпуска игры")
    }
};