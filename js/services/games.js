const gameUrl = "http://localhost:5000/games/";

const getGames = async (gamesId) => {
    try{
        const response = await fetch(gameUrl)
        const data = await response.json()
        if(gamesId != undefined){
            console.log(data.filter(e => e.id == gamesId.find(i => i == e.id)))
            return data.filter(e => e.id == gamesId.find(i => i == e.id))
        } else {
            return data
        }
    } catch (e) {
        alert("Ошибка получения игр")
    }
}

const publishGame = async (gameData) => {
    const data = await getGames()
    data.push(gameData)
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