export const getPastelColor = () => {
    return "hsl(" + 360 * Math.random() + ',' +
    (25 + 70 * Math.random()) + '%,' + 
    (75 + 10 * Math.random()) + '%)'
}

export let randomColor =() => {
    return Math.floor(Math.random() * 16777215).toString(16);
}
