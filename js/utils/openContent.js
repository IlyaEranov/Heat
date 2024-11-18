function openContent(content){
    content.dispatchEvent(new MouseEvent("click"))
    localStorage.removeItem("content")
}