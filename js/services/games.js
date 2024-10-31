const gameUrl = "http://localhost:5000/games/";

const getGames = async () => {
    const response = await fetch(gameUrl)
    const data = await response.json()
    return data
}

const publishGame = async (gameData) => {
    // Получаем существующие игры
    const data = await getGames()
    // Добавляем новую игру в массив
    data.push(gameData)
    // Сохраняем обновленный массив обратно в db.json
    await fetch(gameUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameData)
    });
};

const addGameKey = async (game, gameKey) => {
    const newGame = {...game, keys: [...game.keys, ...[gameKey]]}
    try{
        await fetch(url + game.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newGame)
        })
    } catch (e){
        console.log(e.message)
    }
}