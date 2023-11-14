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
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    const articles = data && data.articles && Array.isArray(data.articles) ? data.articles : [];

    // Check if IDs are not in sequential order
    const isSequential = articles.every((article, index) => article.id === index);

    if (!isSequential) {
      // If IDs are not in sequential order, renumber them
      renumberArticleIds(articles);
      saveArticlesData(articles);
    }

    return articles;
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

function renumberArticleIds(articlesData) {
  for (let i = 0; i < articlesData.length; i++) {
    articlesData[i].id = i;
  }
}

// Middleware to check and renumber IDs before any route is processed
app.use((req, res, next) => {
  const articlesData = getArticlesData();

  // Check if IDs are not in sequential order
  const isSequential = articlesData.every((article, index) => article.id === index);

  if (!isSequential) {
    // If IDs are not in sequential order, renumber them
    renumberArticleIds(articlesData);
    saveArticlesData(articlesData);
  }

  next(); // Move to the next middleware or route handler
});

app.get("/api/articles", (req, res) => {
  const articlesData = getArticlesData();
  res.json(articlesData);
});

app.post("/api/articles", (req, res) => {
  const { title, content, categories } = req.body;
  const articlesData = getArticlesData();

  const newArticleId = articlesData.length > 0 ? Math.max(...articlesData.map(article => article.id)) + 1 : 0;

  const newArticle = {
    id: newArticleId,
    title: title,
    content: content,
    categories: categories,
  };

  articlesData.push(newArticle);
  renumberArticleIds(articlesData);
  saveArticlesData(articlesData);

  res.json({ message: "Стаття успішно збережена", article: newArticle });
});

app.put("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, categories } = req.body;
  const articlesData = getArticlesData();

  const articleToUpdate = articlesData.find(article => article.id == id);

  if (articleToUpdate) {
    articleToUpdate.title = title;
    articleToUpdate.content = content;
    articleToUpdate.categories = categories;

    renumberArticleIds(articlesData);
    saveArticlesData(articlesData);

    res.json({ message: "Стаття успішно оновлена" });
  } else {
    res.status(404).json({ message: "Статтю не знайдено" });
  }
});

app.delete("/api/articles/:id", (req, res) => {
  const { id } = req.params;
  const { renumber } = req.query;
  const articlesData = getArticlesData();

  const articleIndex = articlesData.findIndex(article => article.id == id);

  if (articleIndex !== -1) {
    articlesData.splice(articleIndex, 1);

    if (renumber === 'true') {
      renumberArticleIds(articlesData);
    }

    saveArticlesData(articlesData);
    res.json({ message: "Стаття успішно видалена" });
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
