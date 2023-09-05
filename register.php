<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["register"])) {
    // Приймання даних з форми
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Перевірка даних (додайте додаткові перевірки, якщо необхідно)
    if (empty($name) || empty($email) || empty($password)) {
        die("Будь ласка, заповніть всі поля");
    }

    // Підключення до бази даних (замість dbname, username та password вкажіть свої дані для підключення)
    $conn = new mysqli("localhost:3306", "id21071492_dbdb", "Walpapur123$", "id21071492_db");

    // Перевірка підключення до бази даних
    if ($conn->connect_error) {
        die("Помилка підключення: " . $conn->connect_error);
    }

    // Захист від SQL-ін'єкцій та хешування паролів
    $name = $conn->real_escape_string($name);
    $email = $conn->real_escape_string($email);
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Запит до бази даних для вставки нового користувача
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        // Успішно зареєстровано
        echo "Реєстрація успішна!";
    } else {
        // Помилка при реєстрації
        echo "Помилка реєстрації: " . $conn->error;
    }

    // Закриття з'єднання з базою даних
    $conn->close();
}
?>