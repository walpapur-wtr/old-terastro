const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.json());

const dataFolderPath = path.join(__dirname, "data");

function getArticlesData() {
  const filePath = path.join(dataFolderPath, "articles.json");
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

function saveArticlesData(data) {
  const filePath = path.join(dataFolderPath, "articles.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

app.get("/api/articles", (req, res) => {
  const articles = getArticlesData();
  res.json(articles);
});

app.post("/api/articles", (req, res) => {
  const { title, content, categories } = req.body;
  const { articles, lastId } = getArticlesData();

  // Збільшити id на 1 порівняно з останнім id
  const newId = lastId + 1;

  // Переконайтеся, що категорії є масивом
  const articleCategories = Array.isArray(categories) ? categories : [categories];

  const article = {
    id: newId, // Встановити нове id
    title: title,
    content: content,
    categories: articleCategories, // Зберігайте категорії як масив
  };

  articles.push(article);
  saveArticlesData(articles);
  res.json({ message: "Стаття успішно збережена" });
});


app.get("/api/articles/:categories", (req, res) => {
  const selectedCategories = req.params.categories.split(',');
  const articles = getArticlesData();

  const filteredArticles = articles.filter((article) => {
    return selectedCategories.some((category) => article.categories.includes(category.trim()));
  });

  res.json(filteredArticles);
});


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(dataFolderPath));

app.listen(port, () => {
  console.log(`Сервер запущено на порті ${port}`);
});