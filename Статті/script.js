document.getElementById("articleForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Зупиняємо стандартну поведінку форми (не перезавантажує сторінку)

    // Отримуємо значення полів форми
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").innerHTML; // Використовуємо innerHTML
    var imageUrl = document.getElementById("imageUrl").value;

    // Створюємо об'єкт статті
    var article = {
        "title": title,
        "content": content,
        "imageUrl": imageUrl
    };

    // Зберігаємо статтю в localStorage
    var articles = localStorage.getItem("articles") ? JSON.parse(localStorage.getItem("articles")) : [];
    articles.push(article);
    localStorage.setItem("articles", JSON.stringify(articles));

    // Перенаправляємо користувача на сторінку з каталогом статей
    window.location.href = "catalog.html";
});