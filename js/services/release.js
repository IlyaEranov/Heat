const gameUrl = "http://localhost:5000/games/";

const publishGame = async (gameData) => {
    // Получаем существующие игры
    const response = await fetch(gameUrl);
    const data = await response.json();

    // Добавляем новую игру в массив
    data.games.push(gameData);

    // Сохраняем обновленный массив обратно в db.json
    await fetch(gameUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
};