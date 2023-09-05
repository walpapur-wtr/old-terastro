const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000; // Змініть на потрібний порт
const bodyParser = require("body-parser");
const path = require("path");

// Додайте обмеження розміру запиту в 5 мегабайт (або інший розмір, який вам потрібен)
app.use(bodyParser.json({ limit: "100mb" }));

app.use(bodyParser.json());

// Шлях до папки, де будуть зберігатись JSON файли
const dataFolderPath = path.join(__dirname, "data");

// Отримати дані про статті з JSON файлу
function getArticlesData() {
  const filePath = path.join(dataFolderPath, "articles.json");
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

// Зберегти дані про статті у JSON файл
function saveArticlesData(data) {
  const filePath = path.join(dataFolderPath, "articles.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Роут для отримання всіх статей
app.get("/api/articles", (req, res) => {
  const articles = getArticlesData();
  res.json(articles);
});

// Роут для збереження статті
app.post("/api/articles", (req, res) => {
  const article = req.body;
  const articles = getArticlesData();
  articles.push(article);
  saveArticlesData(articles);
  res.json({ message: "Стаття успішно збережена" });
});

// Додаємо middleware для обробки статичних файлів
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(dataFolderPath)); // Додайте цей middleware для каталогу data

app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});