const gameUrl = "http://localhost:5000/games/";

const getGames = async (gamesId) => {
    try{
        const response = await fetch(gameUrl)
        const data = await response.json()
        console.log(gamesId)
        if(gamesId != undefined){
            for(let i = 0; i < gamesId.length; i++){
                data.filter(e => e.id == gamesId[i])
            }
            return data
        } else {
            return data
        }
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