<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["login"])) {
    // Приймання даних з форми
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Перевірка даних (додайте додаткові перевірки, якщо необхідно)
    if (empty($email) || empty($password)) {
        die("Будь ласка, заповніть всі поля");
    }

    // Підключення до бази даних (замість dbname, username та password вкажіть свої дані для підключення)
    $conn = new mysqli("localhost:3306", "id21071492_dbdb", "Walpapur123$", "id21071492_db");

    // Перевірка підключення до бази даних
    if ($conn->connect_error) {
        die("Помилка підключення: " . $conn->connect_error);
    }

    // Захист від SQL-ін'єкцій
    $email = $conn->real_escape_string($email);
    $password = $conn->real_escape_string($password);

    // Запит до бази даних для перевірки існування користувача
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // Користувач знайдений, виконайте дії для авторизації
        echo "Вхід успішний!";
    } else {
        // Невірні дані для входу
        echo "Невірний електронний лист або пароль";
    }

    // Закриття з'єднання з базою даних
    $conn->close();
}
?>
