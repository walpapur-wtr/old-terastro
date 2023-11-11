const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.json());

const dataFolderPath = path.join(__dirname, "data");
const filePath = path.join(dataFolderPath, "articles.json");

function getArticlesData() {
  const filePath = path.join(dataFolderPath, "articles.json");
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    return data && data.articles && Array.isArray(data.articles) ? data.articles : [];
  } catch (error) {
    return [];
  }
}

function saveArticlesData(articlesData) {
  const dataToSave = {
    articles: articlesData
  };
  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2), "utf-8");
}

app.get("/api/articles", (req, res) => {
  const articlesData = getArticlesData();
  res.json(articlesData);
});

app.post("/api/articles", (req, res) => {
  const { title, content, categories } = req.body;
  const articlesData = getArticlesData();

  const newArticle = {
    id: articlesData.length > 0 ? articlesData[articlesData.length - 1].id + 1 : 0, // Ensure a unique and incrementing ID
    title: title,
    content: content,
    categories: categories,
  };

  articlesData.push(newArticle);
  saveArticlesData(articlesData);

  res.json({ message: "Стаття успішно збережена", article: newArticle });
});

// New route to handle updating articles
app.put("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, categories } = req.body;
  const articlesData = getArticlesData();

  const articleToUpdate = articlesData.find(article => article.id == id);

  if (articleToUpdate) {
    articleToUpdate.title = title;
    articleToUpdate.content = content;
    articleToUpdate.categories = categories;

    saveArticlesData(articlesData);

    res.json({ message: "Стаття успішно оновлена" });
  } else {
    res.status(404).json({ message: "Статтю не знайдено" });
  }
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
