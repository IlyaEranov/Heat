const gameUrl = "http://localhost:5000/games/";

const getGames = async (gamesId) => {
    try{
        const response = await fetch(gameUrl)
        const data = await response.json()
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
        const response = await fetch(gameUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameData)
        });
        gameId = (await response.json()).id
        localStorage.setItem("GAME_ID", gameId)
    } catch (e) {
        alert("Ошибка выпуска игры")
    }
};

const removeGame = async () => {
    const game = JSON.parse(localStorage.getItem("game"))
    try{
        await fetch(gameUrl + game.id, {
            method: "DELETE"
        })
        window.location.href = "profile.html"
    } catch(e) {
        alert(`Server Error. ${e.message}`)
    }
}