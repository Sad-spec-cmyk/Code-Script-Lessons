/*
  Offline practical tasks for lesson pages.
  The checker does not execute code. It verifies whether the learner used
  the required language constructs for the selected task.
*/
(function () {
  const page = location.pathname.split(/[\\/]/).pop().replace(".html", "").toLowerCase();
  const supportedPages = {
    html: "HTML",
    css: "CSS",
    javascript: "JavaScript",
    csharp: "C#",
    python: "Python",
    cpp: "C++",
    java: "Java",
    rust: "Rust",
    go: "Go",
    assembler: "Assembly",
    c: "C",
    sql: "SQL",
    json: "JSON",
    typescript: "TypeScript",
    php: "PHP",
    powershell: "PowerShell"
  };

  if (!supportedPages[page] || document.querySelector(".practice-lab")) return;

  const supported = ["uk", "en", "ru", "id", "ja"];
  const params = new URLSearchParams(location.search);
  const requested = params.get("lang");
  const saved = localStorage.getItem("siteLanguage");
  const savedVersion = localStorage.getItem("siteLanguageChoiceVersion");
  const lang = supported.includes(requested)
    ? requested
    : savedVersion === "2" && supported.includes(saved)
      ? saved
      : "en";

  const ui = {
    uk: {
      title: "Практичні задачі",
      intro: "Напиши повний код у полі нижче. Перевірка дивиться, чи використані потрібні конструкції з уроку.",
      task: "Задача",
      hints: "Підказки",
      showHint: "Показати підказку",
      check: "Перевірити код",
      next: "Інша задача",
      reset: "Очистити",
      placeholder: "Напиши свій код тут...",
      ok: "Добре! Код містить усі потрібні частини для цієї задачі.",
      partial: "Ще не все. Перевір, чого бракує, і допиши код.",
      empty: "Спочатку напиши код для перевірки.",
      missing: "Бракує:",
      score: "Результат",
      solution: "Приклад рішення",
      showSolution: "Показати приклад рішення",
      hideSolution: "Сховати приклад рішення"
    },
    en: {
      title: "Practice Tasks",
      intro: "Write full code in the field below. The checker verifies whether the required lesson constructs are used.",
      task: "Task",
      hints: "Hints",
      showHint: "Show hint",
      check: "Check code",
      next: "Another task",
      reset: "Clear",
      placeholder: "Write your code here...",
      ok: "Good! The code contains all required parts for this task.",
      partial: "Not yet. Check what is missing and complete the code.",
      empty: "Write code before checking.",
      missing: "Missing:",
      score: "Score",
      solution: "Sample solution",
      showSolution: "Show sample solution",
      hideSolution: "Hide sample solution"
    },
    ru: {
      title: "Практические задачи",
      intro: "Напиши полный код в поле ниже. Проверка смотрит, использованы ли нужные конструкции из урока.",
      task: "Задача",
      hints: "Подсказки",
      showHint: "Показать подсказку",
      check: "Проверить код",
      next: "Другая задача",
      reset: "Очистить",
      placeholder: "Напиши свой код здесь...",
      ok: "Хорошо! Код содержит все нужные части для этой задачи.",
      partial: "Еще не все. Проверь, чего не хватает, и допиши код.",
      empty: "Сначала напиши код для проверки.",
      missing: "Не хватает:",
      score: "Результат",
      solution: "Пример решения",
      showSolution: "Показать пример решения",
      hideSolution: "Скрыть пример решения"
    },
    id: {
      title: "Tugas Praktik",
      intro: "Tulis kode lengkap di kolom di bawah. Pemeriksa akan melihat apakah konstruksi penting dari pelajaran sudah digunakan.",
      task: "Tugas",
      hints: "Petunjuk",
      showHint: "Tampilkan petunjuk",
      check: "Periksa kode",
      next: "Tugas lain",
      reset: "Bersihkan",
      placeholder: "Tulis kodemu di sini...",
      ok: "Bagus! Kode berisi semua bagian yang diperlukan untuk tugas ini.",
      partial: "Belum lengkap. Periksa bagian yang kurang lalu lengkapi kode.",
      empty: "Tulis kode terlebih dahulu sebelum diperiksa.",
      missing: "Kurang:",
      score: "Hasil",
      solution: "Contoh solusi",
      showSolution: "Tampilkan contoh solusi",
      hideSolution: "Sembunyikan contoh solusi"
    },
    ja: {
      title: "実践タスク",
      intro: "下の入力欄に完全なコードを書いてください。チェッカーは、レッスンで必要な構文が使われているかを確認します。",
      task: "タスク",
      hints: "ヒント",
      showHint: "ヒントを表示",
      check: "コードを確認",
      next: "別のタスク",
      reset: "クリア",
      placeholder: "ここにコードを書いてください...",
      ok: "よくできました！このタスクに必要な部分がすべて含まれています。",
      partial: "まだ不足があります。足りない部分を確認してコードを完成させてください。",
      empty: "確認する前にコードを書いてください。",
      missing: "不足:",
      score: "結果",
      solution: "解答例",
      showSolution: "解答例を表示",
      hideSolution: "解答例を隠す"
    }
  };

  const tasks = {
    html: [
      {
        title: { uk: "Картка профілю", en: "Profile Card", ru: "Карточка профиля" },
        body: {
          uk: "Створи HTML-картку з заголовком h2, абзацом, зображенням з alt і посиланням на профіль.",
          en: "Create an HTML card with an h2 heading, paragraph, image with alt, and a profile link.",
          ru: "Создай HTML-карточку с заголовком h2, абзацем, изображением с alt и ссылкой на профиль."
        },
        hints: {
          uk: ["Використай div або article як контейнер.", "Зображення має мати атрибут alt.", "Посилання створюється тегом a з href."],
          en: ["Use div or article as a container.", "The image needs an alt attribute.", "A link uses the a tag with href."],
          ru: ["Используй div или article как контейнер.", "У изображения должен быть alt.", "Ссылка создается тегом a с href."]
        },
        checks: [["<article", "<div"], "<h2", "<p", "<img", "alt=", "<a", "href="],
        solution: '<article>\n  <img src="avatar.png" alt="Фото профілю">\n  <h2>Олена</h2>\n  <p>Починаю вивчати HTML.</p>\n  <a href="profile.html">Профіль</a>\n</article>'
      },
      {
        title: { uk: "Форма контакту", en: "Contact Form", ru: "Контактная форма" },
        body: {
          uk: "Створи форму з label, input для імені, textarea для повідомлення і button для відправки.",
          en: "Create a form with a label, name input, message textarea, and submit button.",
          ru: "Создай форму с label, input для имени, textarea для сообщения и button для отправки."
        },
        hints: {
          uk: ["Почни з тегу form.", "label має бути біля поля.", "Для довгого тексту використовуй textarea."],
          en: ["Start with the form tag.", "Place label near the field.", "Use textarea for long text."],
          ru: ["Начни с тега form.", "label должен быть рядом с полем.", "Для длинного текста используй textarea."]
        },
        checks: ["<form", "<label", "<input", "name=", "<textarea", "<button"],
        solution: '<form>\n  <label for="name">Ім’я</label>\n  <input id="name" name="name" type="text">\n  <label for="message">Повідомлення</label>\n  <textarea id="message" name="message"></textarea>\n  <button type="submit">Надіслати</button>\n</form>'
      }
    ],
    css: [
      {
        title: { uk: "Адаптивна сітка", en: "Responsive Grid", ru: "Адаптивная сетка" },
        body: {
          uk: "Напиши CSS для .cards: сітка з адаптивними колонками, gap і стилем для .card.",
          en: "Write CSS for .cards: a grid with responsive columns, gap, and styling for .card.",
          ru: "Напиши CSS для .cards: сетка с адаптивными колонками, gap и стилем для .card."
        },
        hints: {
          uk: ["Використай display: grid.", "repeat(auto-fit, minmax(...)) допоможе з адаптивністю.", "Додай border або padding для картки."],
          en: ["Use display: grid.", "repeat(auto-fit, minmax(...)) helps with responsiveness.", "Add border or padding to the card."],
          ru: ["Используй display: grid.", "repeat(auto-fit, minmax(...)) помогает с адаптивностью.", "Добавь border или padding для карточки."]
        },
        checks: [".cards", "display", "grid", "gap", "repeat", "minmax", ".card"],
        solution: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n}\n.card {\n  padding: 16px;\n  border: 1px solid #ddd;\n}'
      },
      {
        title: { uk: "Кнопка", en: "Button", ru: "Кнопка" },
        body: {
          uk: "Створи стиль для .button: темний фон, білий текст, padding, border-radius і hover-стан.",
          en: "Create .button styling: dark background, white text, padding, border-radius, and hover state.",
          ru: "Создай стиль для .button: темный фон, белый текст, padding, border-radius и hover-состояние."
        },
        hints: {
          uk: ["Селектор має бути .button.", "hover пишеться як .button:hover.", "Колір тексту задає color."],
          en: ["The selector should be .button.", "Hover is written as .button:hover.", "Text color is set with color."],
          ru: ["Селектор должен быть .button.", "hover пишется как .button:hover.", "Цвет текста задает color."]
        },
        checks: [".button", "background", "color", "padding", "border-radius", ":hover"],
        solution: '.button {\n  background: #222;\n  color: white;\n  padding: 10px 14px;\n  border-radius: 8px;\n}\n.button:hover {\n  background: #444;\n}'
      }
    ],
    javascript: [
      {
        title: { uk: "Лічильник кліків", en: "Click Counter", ru: "Счетчик кликов" },
        body: {
          uk: "Напиши JS: знайди кнопку і текст, зберігай число в змінній, при click збільшуй його і показуй через textContent.",
          en: "Write JS: find a button and text, store a number in a variable, increase it on click, and show it with textContent.",
          ru: "Напиши JS: найди кнопку и текст, храни число в переменной, при click увеличивай его и показывай через textContent."
        },
        hints: {
          uk: ["Потрібен querySelector.", "Подія додається через addEventListener.", "Для зміни тексту використовуй textContent."],
          en: ["You need querySelector.", "Add the event with addEventListener.", "Use textContent to change text."],
          ru: ["Нужен querySelector.", "Событие добавляется через addEventListener.", "Для изменения текста используй textContent."]
        },
        checks: ["let", "queryselector", "addeventlistener", "click", "textcontent", "++"],
        solution: 'let count = 0;\nconst button = document.querySelector("#plus");\nconst output = document.querySelector("#count");\nbutton.addEventListener("click", () => {\n  count++;\n  output.textContent = count;\n});'
      },
      {
        title: { uk: "Фільтр масиву", en: "Array Filter", ru: "Фильтр массива" },
        body: {
          uk: "Створи масив чисел і отримай тільки числа більші за 10 через filter, потім виведи результат у console.log.",
          en: "Create an array of numbers, get only numbers greater than 10 with filter, then print the result with console.log.",
          ru: "Создай массив чисел и получи только числа больше 10 через filter, затем выведи результат в console.log."
        },
        hints: {
          uk: ["Масив записується через [].", "filter повертає новий масив.", "Умова має містити > 10."],
          en: ["An array is written with [].", "filter returns a new array.", "The condition should contain > 10."],
          ru: ["Массив записывается через [].", "filter возвращает новый массив.", "Условие должно содержать > 10."]
        },
        checks: ["[", "]", ".filter", "=>", "> 10", "console.log"],
        solution: 'const numbers = [4, 12, 7, 20];\nconst big = numbers.filter((number) => number > 10);\nconsole.log(big);'
      }
    ],
    csharp: [
      {
        title: { uk: "Перевірка віку", en: "Age Check", ru: "Проверка возраста" },
        body: {
          uk: "Напиши C# програму: створи int age, через if/else виведи Adult або Young.",
          en: "Write a C# program: create int age, use if/else, print Adult or Young.",
          ru: "Напиши C# программу: создай int age, через if/else выведи Adult или Young."
        },
        hints: {
          uk: ["Використай Console.WriteLine.", "Умова може бути age >= 18.", "Потрібні if і else."],
          en: ["Use Console.WriteLine.", "The condition can be age >= 18.", "You need if and else."],
          ru: ["Используй Console.WriteLine.", "Условие может быть age >= 18.", "Нужны if и else."]
        },
        checks: ["int age", "if", "else", "console.writeline"],
        solution: 'int age = 20;\nif (age >= 18)\n{\n    Console.WriteLine("Adult");\n}\nelse\n{\n    Console.WriteLine("Young");\n}'
      },
      {
        title: { uk: "Список і цикл", en: "List and Loop", ru: "Список и цикл" },
        body: {
          uk: "Створи List<string>, додай два імені через Add і виведи їх через foreach.",
          en: "Create a List<string>, add two names with Add, and print them with foreach.",
          ru: "Создай List<string>, добавь два имени через Add и выведи их через foreach."
        },
        hints: {
          uk: ["Потрібен List<string>.", "Метод Add додає елемент.", "foreach перебирає список."],
          en: ["You need List<string>.", "Add inserts an item.", "foreach iterates the list."],
          ru: ["Нужен List<string>.", "Метод Add добавляет элемент.", "foreach перебирает список."]
        },
        checks: ["list<string>", ".add", "foreach", "console.writeline"],
        solution: 'List<string> names = new List<string>();\nnames.Add("Ivan");\nnames.Add("Olia");\nforeach (string name in names)\n{\n    Console.WriteLine(name);\n}'
      }
    ],
    python: [
      {
        title: { uk: "Функція суми", en: "Sum Function", ru: "Функция суммы" },
        body: {
          uk: "Напиши функцію add(a, b), яка повертає суму, і виведи результат через print.",
          en: "Write an add(a, b) function that returns the sum and print the result.",
          ru: "Напиши функцию add(a, b), которая возвращает сумму, и выведи результат через print."
        },
        hints: {
          uk: ["Функція починається з def.", "Потрібен return.", "Виклич функцію всередині print."],
          en: ["A function starts with def.", "You need return.", "Call the function inside print."],
          ru: ["Функция начинается с def.", "Нужен return.", "Вызови функцию внутри print."]
        },
        checks: ["def add", "return", "+", "print"],
        solution: 'def add(a, b):\n    return a + b\n\nprint(add(2, 3))'
      },
      {
        title: { uk: "Робота зі списком", en: "List Practice", ru: "Работа со списком" },
        body: {
          uk: "Створи список names, додай ім’я через append і перебери список циклом for.",
          en: "Create a names list, add a name with append, and iterate it with a for loop.",
          ru: "Создай список names, добавь имя через append и перебери список циклом for."
        },
        hints: {
          uk: ["Список пишеться через [].", "append додає елемент.", "for name in names перебирає значення."],
          en: ["A list uses [].", "append adds an item.", "for name in names iterates values."],
          ru: ["Список пишется через [].", "append добавляет элемент.", "for name in names перебирает значения."]
        },
        checks: ["names", "[", "]", ".append", "for", "in", "print"],
        solution: 'names = ["Anna"]\nnames.append("Ivan")\nfor name in names:\n    print(name)'
      }
    ],
    cpp: [
      {
        title: { uk: "Вектор чисел", en: "Number Vector", ru: "Вектор чисел" },
        body: {
          uk: "Напиши C++ код: підключи vector, створи vector<int>, додай число через push_back і виведи через for.",
          en: "Write C++ code: include vector, create vector<int>, add a number with push_back, and output with for.",
          ru: "Напиши C++ код: подключи vector, создай vector<int>, добавь число через push_back и выведи через for."
        },
        hints: {
          uk: ["Потрібен #include <vector>.", "Метод push_back додає елемент.", "Для виводу використовуй cout."],
          en: ["You need #include <vector>.", "push_back adds an item.", "Use cout for output."],
          ru: ["Нужен #include <vector>.", "push_back добавляет элемент.", "Для вывода используй cout."]
        },
        checks: ["#include", "vector", "vector<int>", "push_back", "for", "cout"],
        solution: '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> numbers;\n    numbers.push_back(10);\n    for (int n : numbers) {\n        cout << n << endl;\n    }\n    return 0;\n}'
      },
      {
        title: { uk: "Проста функція", en: "Simple Function", ru: "Простая функция" },
        body: {
          uk: "Напиши функцію multiply, яка приймає два int і повертає їх добуток.",
          en: "Write a multiply function that takes two int values and returns their product.",
          ru: "Напиши функцию multiply, которая принимает два int и возвращает их произведение."
        },
        hints: {
          uk: ["Тип повернення може бути int.", "Потрібні два параметри int.", "Добуток робиться оператором *."],
          en: ["The return type can be int.", "You need two int parameters.", "Product uses the * operator."],
          ru: ["Тип возврата может быть int.", "Нужны два параметра int.", "Произведение делается оператором *."]
        },
        checks: ["int multiply", "int", "return", "*"],
        solution: 'int multiply(int a, int b) {\n    return a * b;\n}'
      }
    ],
    java: [
      {
        title: { uk: "Метод суми", en: "Sum Method", ru: "Метод суммы" },
        body: {
          uk: "Напиши Java-клас Main з методом add, який повертає суму двох int, і виклич його в main.",
          en: "Write a Java Main class with an add method that returns the sum of two int values, and call it in main.",
          ru: "Напиши Java-класс Main с методом add, который возвращает сумму двух int, и вызови его в main."
        },
        hints: {
          uk: ["Потрібен public class Main.", "main має бути static.", "Метод add повертає int."],
          en: ["You need public class Main.", "main should be static.", "The add method returns int."],
          ru: ["Нужен public class Main.", "main должен быть static.", "Метод add возвращает int."]
        },
        checks: ["class main", "public static void main", "static int add", "return", "system.out.println"],
        solution: 'public class Main {\n    static int add(int a, int b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(add(2, 3));\n    }\n}'
      },
      {
        title: { uk: "ArrayList", en: "ArrayList", ru: "ArrayList" },
        body: {
          uk: "Створи ArrayList<String>, додай два імені через add і виведи size.",
          en: "Create an ArrayList<String>, add two names with add, and print size.",
          ru: "Создай ArrayList<String>, добавь два имени через add и выведи size."
        },
        hints: {
          uk: ["Імпортуй java.util.ArrayList.", "add додає елемент.", "size() повертає кількість."],
          en: ["Import java.util.ArrayList.", "add inserts an item.", "size() returns the count."],
          ru: ["Импортируй java.util.ArrayList.", "add добавляет элемент.", "size() возвращает количество."]
        },
        checks: ["arraylist<string>", ".add", ".size", "system.out.println"],
        solution: 'ArrayList<String> names = new ArrayList<>();\nnames.add("Anna");\nnames.add("Ivan");\nSystem.out.println(names.size());'
      }
    ],
    rust: [
      {
        title: { uk: "Vec і цикл", en: "Vec and Loop", ru: "Vec и цикл" },
        body: {
          uk: "Створи mutable Vec, додай число через push і виведи всі значення циклом for.",
          en: "Create a mutable Vec, add a number with push, and print all values using for.",
          ru: "Создай mutable Vec, добавь число через push и выведи все значения циклом for."
        },
        hints: {
          uk: ["Змінна має бути mut.", "Vec можна створити через Vec::new().", "println! виводить значення."],
          en: ["The variable should be mut.", "Vec can be created with Vec::new().", "println! prints a value."],
          ru: ["Переменная должна быть mut.", "Vec можно создать через Vec::new().", "println! выводит значение."]
        },
        checks: ["let mut", "vec", ".push", "for", "println!"],
        solution: 'fn main() {\n    let mut numbers = Vec::new();\n    numbers.push(10);\n    for number in numbers {\n        println!("{}", number);\n    }\n}'
      },
      {
        title: { uk: "Option через match", en: "Option with match", ru: "Option через match" },
        body: {
          uk: "Створи Option<i32> і оброби Some та None через match.",
          en: "Create Option<i32> and handle Some and None with match.",
          ru: "Создай Option<i32> и обработай Some и None через match."
        },
        hints: {
          uk: ["Потрібен Option<i32>.", "match перевіряє варіанти.", "Оброби Some і None."],
          en: ["You need Option<i32>.", "match checks variants.", "Handle Some and None."],
          ru: ["Нужен Option<i32>.", "match проверяет варианты.", "Обработай Some и None."]
        },
        checks: ["option<i32>", "some", "none", "match", "println!"],
        solution: 'let value: Option<i32> = Some(5);\nmatch value {\n    Some(number) => println!("{}", number),\n    None => println!("No value"),\n}'
      }
    ],
    go: [
      {
        title: { uk: "Slice і append", en: "Slice and append", ru: "Slice и append", id: "Slice dan append", ja: "slice と append" },
        body: {
          uk: "Напиши Go-код: створи slice чисел, додай ще одне число через append і виведи всі значення циклом for range.",
          en: "Write Go code: create a slice of numbers, add one more number with append, and print all values using for range.",
          ru: "Напиши Go-код: создай slice чисел, добавь еще одно число через append и выведи все значения циклом for range.",
          id: "Tulis kode Go: buat slice angka, tambahkan satu angka dengan append, lalu cetak semua nilai memakai for range.",
          ja: "Go のコードを書いてください: 数値の slice を作り、append で数値を追加し、for range ですべての値を出力します。"
        },
        hints: {
          uk: ["Slice можна створити як []int{1, 2, 3}.", "append повертає оновлений slice.", "for _, value := range numbers перебирає значення."],
          en: ["A slice can be created as []int{1, 2, 3}.", "append returns the updated slice.", "for _, value := range numbers iterates values."],
          ru: ["Slice можно создать как []int{1, 2, 3}.", "append возвращает обновленный slice.", "for _, value := range numbers перебирает значения."],
          id: ["Slice bisa dibuat sebagai []int{1, 2, 3}.", "append mengembalikan slice yang sudah diperbarui.", "for _, value := range numbers melakukan iterasi nilai."],
          ja: ["slice は []int{1, 2, 3} のように作れます。", "append は更新された slice を返します。", "for _, value := range numbers で値を順番に処理できます。"]
        },
        checks: ["package main", "import", "fmt", "func main", "[]int", "append", "for", "range", "fmt.println"],
        solution: 'package main\n\nimport "fmt"\n\nfunc main() {\n    numbers := []int{1, 2, 3}\n    numbers = append(numbers, 4)\n\n    for _, number := range numbers {\n        fmt.Println(number)\n    }\n}'
      },
      {
        title: { uk: "Struct і метод", en: "Struct and Method", ru: "Struct и метод", id: "Struct dan method", ja: "struct とメソッド" },
        body: {
          uk: "Створи struct Player з полями Name і Score, додай метод Print() з receiver і виведи дані через fmt.Println.",
          en: "Create a Player struct with Name and Score fields, add a Print() method with a receiver, and output data with fmt.Println.",
          ru: "Создай struct Player с полями Name и Score, добавь метод Print() с receiver и выведи данные через fmt.Println.",
          id: "Buat struct Player dengan field Name dan Score, tambahkan method Print() dengan receiver, lalu tampilkan data dengan fmt.Println.",
          ja: "Name と Score フィールドを持つ Player struct を作り、receiver 付きの Print() メソッドを追加し、fmt.Println で表示します。"
        },
        hints: {
          uk: ["Struct оголошується через type Player struct.", "Receiver пишеться перед назвою методу: func (p Player) Print().", "Створи об’єкт Player у main()."],
          en: ["A struct is declared with type Player struct.", "A receiver is written before the method name: func (p Player) Print().", "Create a Player object inside main()."],
          ru: ["Struct объявляется через type Player struct.", "Receiver пишется перед названием метода: func (p Player) Print().", "Создай объект Player внутри main()."],
          id: ["Struct dideklarasikan dengan type Player struct.", "Receiver ditulis sebelum nama method: func (p Player) Print().", "Buat objek Player di dalam main()."],
          ja: ["struct は type Player struct で宣言します。", "receiver はメソッド名の前に書きます: func (p Player) Print().", "main() の中で Player オブジェクトを作ります。"]
        },
        checks: ["type player struct", "name string", "score int", "func (", "print()", "fmt.println", "func main"],
        solution: 'package main\n\nimport "fmt"\n\ntype Player struct {\n    Name  string\n    Score int\n}\n\nfunc (p Player) Print() {\n    fmt.Println(p.Name, p.Score)\n}\n\nfunc main() {\n    player := Player{Name: "Ivan", Score: 100}\n    player.Print()\n}'
      },
      {
        title: { uk: "Goroutine і channel", en: "Goroutine and channel", ru: "Goroutine и channel", id: "Goroutine dan channel", ja: "goroutine と channel" },
        body: {
          uk: "Напиши Go-код: створи channel, запусти goroutine через go func(), передай рядок у канал і прочитай його в main.",
          en: "Write Go code: create a channel, start a goroutine with go func(), send a string into the channel, and read it in main.",
          ru: "Напиши Go-код: создай channel, запусти goroutine через go func(), отправь строку в канал и прочитай ее в main.",
          id: "Tulis kode Go: buat channel, jalankan goroutine dengan go func(), kirim string ke channel, lalu baca di main.",
          ja: "Go のコードを書いてください: channel を作り、go func() で goroutine を起動し、文字列を channel に送り、main で読み取ります。"
        },
        hints: {
          uk: ["Канал створюється через make(chan string).", "Goroutine запускається ключовим словом go.", "Оператор <- передає або читає значення."],
          en: ["A channel is created with make(chan string).", "A goroutine starts with the go keyword.", "The <- operator sends or receives a value."],
          ru: ["Канал создается через make(chan string).", "Goroutine запускается ключевым словом go.", "Оператор <- отправляет или читает значение."],
          id: ["Channel dibuat dengan make(chan string).", "Goroutine dimulai dengan kata kunci go.", "Operator <- mengirim atau menerima nilai."],
          ja: ["channel は make(chan string) で作ります。", "goroutine は go キーワードで起動します。", "<- 演算子は値の送信または受信に使います。"]
        },
        checks: ["package main", "make(chan string)", "go func", "<-", "fmt.println"],
        solution: 'package main\n\nimport "fmt"\n\nfunc main() {\n    messages := make(chan string)\n\n    go func() {\n        messages <- "Hello from goroutine"\n    }()\n\n    fmt.Println(<-messages)\n}'
      }
    ],
    assembler: [
      {
        title: { uk: "Linux write syscall", en: "Linux write syscall", ru: "Linux write syscall" },
        body: {
          uk: "Напиши фрагмент NASM x86-64 для syscall write: rax=1, rdi=1, rsi=message, rdx=length, syscall.",
          en: "Write a NASM x86-64 fragment for write syscall: rax=1, rdi=1, rsi=message, rdx=length, syscall.",
          ru: "Напиши фрагмент NASM x86-64 для syscall write: rax=1, rdi=1, rsi=message, rdx=length, syscall."
        },
        hints: {
          uk: ["write має номер 1 у rax.", "stdout це 1 у rdi.", "Адреса тексту йде в rsi."],
          en: ["write has number 1 in rax.", "stdout is 1 in rdi.", "The text address goes into rsi."],
          ru: ["write имеет номер 1 в rax.", "stdout это 1 в rdi.", "Адрес текста идет в rsi."]
        },
        checks: ["mov rax, 1", "mov rdi, 1", "mov rsi", "mov rdx", "syscall"],
        solution: 'mov rax, 1\nmov rdi, 1\nmov rsi, message\nmov rdx, length\nsyscall'
      },
      {
        title: { uk: "Стек", en: "Stack", ru: "Стек" },
        body: {
          uk: "Покажи приклад, де значення кладеться в стек через push, а потім дістається через pop.",
          en: "Show an example where a value is put on the stack with push and taken back with pop.",
          ru: "Покажи пример, где значение кладется в стек через push, а потом достается через pop."
        },
        hints: {
          uk: ["push кладе значення у стек.", "pop дістає значення.", "Можна використати регістр rax або rbx."],
          en: ["push puts a value onto the stack.", "pop takes a value back.", "You can use rax or rbx."],
          ru: ["push кладет значение в стек.", "pop достает значение.", "Можно использовать rax или rbx."]
        },
        checks: ["push", "pop"],
        solution: 'mov rax, 10\npush rax\npop rbx'
      }
    ],
    c: [
      {
        title: { uk: "Функція і printf", en: "Function and printf", ru: "Функция и printf" },
        body: {
          uk: "Напиши C-код з функцією add, яка повертає суму двох int, і виведи результат через printf.",
          en: "Write C code with an add function that returns the sum of two int values and print the result with printf.",
          ru: "Напиши C-код с функцией add, которая возвращает сумму двух int, и выведи результат через printf."
        },
        hints: {
          uk: ["Потрібен #include <stdio.h>.", "Функція повертає int.", "printf виводить результат."],
          en: ["You need #include <stdio.h>.", "The function returns int.", "printf prints the result."],
          ru: ["Нужен #include <stdio.h>.", "Функция возвращает int.", "printf выводит результат."]
        },
        checks: ["#include", "stdio.h", "int add", "return", "printf"],
        solution: '#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    printf("%d", add(2, 3));\n    return 0;\n}'
      },
      {
        title: { uk: "malloc і free", en: "malloc and free", ru: "malloc и free" },
        body: {
          uk: "Виділи пам’ять для int через malloc, перевір NULL, запиши значення і звільни через free.",
          en: "Allocate memory for int with malloc, check NULL, write a value, and free it with free.",
          ru: "Выдели память для int через malloc, проверь NULL, запиши значение и освободи через free."
        },
        hints: {
          uk: ["malloc повертає вказівник.", "Перевір результат на NULL.", "Після роботи виклич free."],
          en: ["malloc returns a pointer.", "Check the result against NULL.", "Call free after work."],
          ru: ["malloc возвращает указатель.", "Проверь результат на NULL.", "После работы вызови free."]
        },
        checks: ["malloc", "sizeof", "null", "*", "free"],
        solution: 'int *number = malloc(sizeof(int));\nif (number == NULL) {\n    return 1;\n}\n*number = 10;\nfree(number);'
      }
    ],
    sql: [
      {
        title: { uk: "Фільтрація і сортування", en: "Filter and Sort", ru: "Фильтрация и сортировка" },
        body: {
          uk: "Напиши SQL-запит: вибрати name і age з users, де age більше 18, відсортувати за age за спаданням.",
          en: "Write an SQL query: select name and age from users where age is greater than 18, sorted by age descending.",
          ru: "Напиши SQL-запрос: выбрать name и age из users, где age больше 18, отсортировать по age по убыванию."
        },
        hints: {
          uk: ["Почни з SELECT.", "Умова пишеться після WHERE.", "DESC означає спадання."],
          en: ["Start with SELECT.", "The condition goes after WHERE.", "DESC means descending."],
          ru: ["Начни с SELECT.", "Условие пишется после WHERE.", "DESC означает убывание."]
        },
        checks: ["select", "name", "age", "from users", "where", "> 18", "order by", "desc"],
        solution: 'SELECT name, age\nFROM users\nWHERE age > 18\nORDER BY age DESC;'
      },
      {
        title: { uk: "JOIN", en: "JOIN", ru: "JOIN" },
        body: {
          uk: "Напиши запит з INNER JOIN між users і orders по users.id = orders.user_id.",
          en: "Write a query with INNER JOIN between users and orders by users.id = orders.user_id.",
          ru: "Напиши запрос с INNER JOIN между users и orders по users.id = orders.user_id."
        },
        hints: {
          uk: ["Потрібен INNER JOIN.", "Зв’язок пишеться після ON.", "Вибери хоча б users.name."],
          en: ["You need INNER JOIN.", "The relation goes after ON.", "Select at least users.name."],
          ru: ["Нужен INNER JOIN.", "Связь пишется после ON.", "Выбери хотя бы users.name."]
        },
        checks: ["select", "users", "orders", "inner join", "on", "users.id", "orders.user_id"],
        solution: 'SELECT users.name, orders.total\nFROM users\nINNER JOIN orders ON users.id = orders.user_id;'
      }
    ],
    json: [
      {
        title: { uk: "Об’єкт користувача", en: "User Object", ru: "Объект пользователя" },
        body: {
          uk: "Напиши валідний JSON об’єкт користувача з name, age, isStudent і skills як масивом.",
          en: "Write a valid JSON user object with name, age, isStudent, and skills as an array.",
          ru: "Напиши валидный JSON объект пользователя с name, age, isStudent и skills как массивом."
        },
        hints: {
          uk: ["Ключі JSON мають бути в подвійних лапках.", "Масив пишеться через [].", "boolean пишеться true або false без лапок."],
          en: ["JSON keys need double quotes.", "An array uses [].", "boolean is true or false without quotes."],
          ru: ["Ключи JSON должны быть в двойных кавычках.", "Массив пишется через [].", "boolean пишется true или false без кавычек."]
        },
        checks: ['"name"', '"age"', '"isstudent"', '"skills"', "[", "]", "{"],
        solution: '{\n  "name": "Ivan",\n  "age": 25,\n  "isStudent": false,\n  "skills": ["HTML", "CSS", "JavaScript"]\n}'
      },
      {
        title: { uk: "Список товарів", en: "Product List", ru: "Список товаров" },
        body: {
          uk: "Створи JSON з ключем products, де значення це масив об’єктів з title і price.",
          en: "Create JSON with a products key whose value is an array of objects with title and price.",
          ru: "Создай JSON с ключом products, где значение это массив объектов с title и price."
        },
        hints: {
          uk: ["products має бути масивом.", "Кожен товар це об’єкт.", "price має бути числом."],
          en: ["products should be an array.", "Each product is an object.", "price should be a number."],
          ru: ["products должен быть массивом.", "Каждый товар это объект.", "price должен быть числом."]
        },
        checks: ['"products"', "[", "]", '"title"', '"price"', "{"],
        solution: '{\n  "products": [\n    { "title": "Keyboard", "price": 40 },\n    { "title": "Mouse", "price": 20 }\n  ]\n}'
      }
    ],
    typescript: [
      {
        title: { uk: "Інтерфейс користувача", en: "User Interface", ru: "Интерфейс пользователя" },
        body: {
          uk: "Створи interface User з id:number і name:string, потім створи об’єкт user цього типу.",
          en: "Create an interface User with id:number and name:string, then create a user object of this type.",
          ru: "Создай interface User с id:number и name:string, затем создай объект user этого типа."
        },
        hints: {
          uk: ["Потрібне ключове слово interface.", "Типи пишуться після двокрапки.", "Об’єкт можна типізувати як const user: User."],
          en: ["You need the interface keyword.", "Types are written after a colon.", "An object can be typed as const user: User."],
          ru: ["Нужно ключевое слово interface.", "Типы пишутся после двоеточия.", "Объект можно типизировать как const user: User."]
        },
        checks: ["interface user", "id:", "number", "name:", "string", "const user"],
        solution: 'interface User {\n  id: number;\n  name: string;\n}\n\nconst user: User = {\n  id: 1,\n  name: "Ivan"\n};'
      },
      {
        title: { uk: "Generic функція", en: "Generic Function", ru: "Generic функция" },
        body: {
          uk: "Напиши generic функцію first<T>, яка приймає масив T[] і повертає перший елемент.",
          en: "Write a generic first<T> function that takes a T[] array and returns the first item.",
          ru: "Напиши generic функцию first<T>, которая принимает массив T[] и возвращает первый элемент."
        },
        hints: {
          uk: ["Generic записується як <T>.", "Параметр може бути items: T[].", "Поверни items[0]."],
          en: ["A generic is written as <T>.", "The parameter can be items: T[].", "Return items[0]."],
          ru: ["Generic пишется как <T>.", "Параметр может быть items: T[].", "Верни items[0]."]
        },
        checks: ["function first<t>", "items: t[]", "return", "items[0]"],
        solution: 'function first<T>(items: T[]): T {\n  return items[0];\n}'
      }
    ],
    php: [
      {
        title: { uk: "Форма POST", en: "POST Form", ru: "POST форма" },
        body: {
          uk: "Напиши PHP-код, який читає name з $_POST і безпечно виводить через htmlspecialchars.",
          en: "Write PHP code that reads name from $_POST and safely outputs it with htmlspecialchars.",
          ru: "Напиши PHP-код, который читает name из $_POST и безопасно выводит через htmlspecialchars."
        },
        hints: {
          uk: ["Змінні в PHP починаються з $.", "Дані POST читаються з $_POST.", "htmlspecialchars захищає HTML-вивід."],
          en: ["PHP variables start with $.", "POST data is read from $_POST.", "htmlspecialchars protects HTML output."],
          ru: ["Переменные в PHP начинаются с $.", "POST данные читаются из $_POST.", "htmlspecialchars защищает HTML-вывод."]
        },
        checks: ["<?php", "$_post", "name", "htmlspecialchars", "echo"],
        solution: '<?php\n$name = $_POST["name"] ?? "";\necho htmlspecialchars($name);\n?>'
      },
      {
        title: { uk: "Функція", en: "Function", ru: "Функция" },
        body: {
          uk: "Створи PHP-функцію add($a, $b), яка повертає суму, і виведи результат через echo.",
          en: "Create a PHP function add($a, $b) that returns the sum and output the result with echo.",
          ru: "Создай PHP-функцию add($a, $b), которая возвращает сумму, и выведи результат через echo."
        },
        hints: {
          uk: ["Функція починається з function.", "Потрібен return.", "echo виводить результат."],
          en: ["A function starts with function.", "You need return.", "echo outputs the result."],
          ru: ["Функция начинается с function.", "Нужен return.", "echo выводит результат."]
        },
        checks: ["function add", "$a", "$b", "return", "echo"],
        solution: '<?php\nfunction add($a, $b) {\n    return $a + $b;\n}\n\necho add(2, 3);\n?>'
      }
    ],
    powershell: [
      {
        title: { uk: "Файли", en: "Files", ru: "Файлы" },
        body: {
          uk: "Напиши PowerShell: створи файл через Set-Content, додай рядок через Add-Content і прочитай через Get-Content.",
          en: "Write PowerShell: create a file with Set-Content, append a line with Add-Content, and read it with Get-Content.",
          ru: "Напиши PowerShell: создай файл через Set-Content, добавь строку через Add-Content и прочитай через Get-Content."
        },
        hints: {
          uk: ["Set-Content записує новий вміст.", "Add-Content додає в кінець.", "Get-Content читає файл."],
          en: ["Set-Content writes new content.", "Add-Content appends to the end.", "Get-Content reads a file."],
          ru: ["Set-Content записывает новый контент.", "Add-Content добавляет в конец.", "Get-Content читает файл."]
        },
        checks: ["set-content", "add-content", "get-content", "-path"],
        solution: 'Set-Content -Path "log.txt" -Value "Start"\nAdd-Content -Path "log.txt" -Value "Done"\nGet-Content -Path "log.txt"'
      },
      {
        title: { uk: "Pipeline процесів", en: "Process Pipeline", ru: "Pipeline процессов" },
        body: {
          uk: "Отримай процеси, відсортуй їх за CPU за спаданням і вибери перші 5.",
          en: "Get processes, sort them by CPU descending, and select the first 5.",
          ru: "Получи процессы, отсортируй их по CPU по убыванию и выбери первые 5."
        },
        hints: {
          uk: ["Get-Process отримує процеси.", "Символ | передає дані далі.", "Select-Object -First 5 обмежує результат."],
          en: ["Get-Process gets processes.", "The | symbol passes data forward.", "Select-Object -First 5 limits the result."],
          ru: ["Get-Process получает процессы.", "Символ | передает данные дальше.", "Select-Object -First 5 ограничивает результат."]
        },
        checks: ["get-process", "|", "sort-object", "cpu", "select-object", "-first 5"],
        solution: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First 5'
      }
    ]
  };

  function t(value) {
    return value[lang] || (lang === "id" || lang === "ja" ? value.en : "") || value.uk || "";
  }

  function normalize(value) {
    return String(value).toLowerCase().replace(/[;\r]/g, "").replace(/\s+/g, " ").trim();
  }

  function compact(value) {
    return normalize(value).replace(/\s+/g, "");
  }

  function checkPart(code, part) {
    if (Array.isArray(part)) return part.some((item) => checkPart(code, item));
    return code.includes(normalize(part)) || compact(code).includes(compact(part));
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .practice-lab {
        width: min(100%, var(--max-width, 1180px));
        margin: 0 auto;
        padding: 24px 18px 48px;
      }
      .practice-box {
        border: 1px solid var(--border, #d9dde3);
        border-radius: var(--radius, 8px);
        background: var(--surface, #fff);
        box-shadow: var(--shadow, 0 1px 2px rgba(0,0,0,.06));
        padding: clamp(16px, 3vw, 26px);
      }
      .practice-box h2 { margin: 0 0 8px; font-size: 26px; line-height: 1.2; }
      .practice-muted { margin: 0; color: var(--muted, #5f6670); }
      .practice-task {
        margin: 16px 0;
        border: 1px solid var(--border, #d9dde3);
        border-radius: var(--radius, 8px);
        background: var(--surface-soft, #f0f1f3);
        padding: 14px;
      }
      .practice-task h3 { margin: 0 0 6px; font-size: 20px; }
      .practice-textarea {
        width: 100%;
        min-height: 230px;
        resize: vertical;
        border: 1px solid var(--border-strong, #b8bec7);
        border-radius: var(--radius, 8px);
        background: var(--code-bg, #f4f4f5);
        color: var(--text, #1f2328);
        padding: 14px;
        font: 14px/1.55 Consolas, "Courier New", monospace;
        overflow-wrap: normal;
        white-space: pre;
        overflow: auto;
      }
      .practice-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 14px 0;
      }
      .practice-button {
        min-height: 40px;
        border: 1px solid var(--accent, #222);
        border-radius: var(--radius, 8px);
        background: var(--accent, #222);
        color: #fff;
        padding: 9px 14px;
        font: inherit;
        cursor: pointer;
      }
      .practice-button.secondary {
        background: var(--surface, #fff);
        color: var(--text, #1f2328);
        border-color: var(--border-strong, #b8bec7);
      }
      .practice-result {
        min-height: 28px;
        margin: 0;
        font-weight: 700;
      }
      .practice-result.ok { color: #1a7f37; }
      .practice-result.warn { color: #d92d20; }
      .practice-hints {
        margin: 10px 0 0;
        color: var(--muted, #5f6670);
      }
      .practice-hints li { margin: 4px 0; }
      .practice-solution {
        margin-top: 12px;
      }
      .practice-solution pre {
        display: none;
        margin: 8px 0 0;
        border: 1px solid var(--border, #d9dde3);
        border-radius: var(--radius, 8px);
        background: var(--code-bg, #f4f4f5);
        padding: 14px;
        overflow: auto;
      }
      .practice-solution.is-open pre { display: block; }
      @media (max-width: 720px) {
        .practice-lab { padding-left: 12px; padding-right: 12px; }
        .practice-actions { display: grid; }
        .practice-button { width: 100%; }
        .practice-textarea { min-height: 260px; }
      }
    `;
    document.head.appendChild(style);
  }

  const pageTasks = tasks[page];
  if (!pageTasks || !pageTasks.length) return;

  injectStyles();

  let taskIndex = Math.floor(Math.random() * pageTasks.length);
  let hintCount = 0;
  const labels = ui[lang] || ui.en;

  const section = document.createElement("section");
  section.className = "practice-lab";
  section.innerHTML = `
    <div class="practice-box">
      <h2>${labels.title}: ${supportedPages[page]}</h2>
      <p class="practice-muted">${labels.intro}</p>
      <div class="practice-task">
        <h3 id="practice-title"></h3>
        <p id="practice-body"></p>
        <div class="practice-hints">
          <strong>${labels.hints}</strong>
          <ul id="practice-hints"></ul>
        </div>
      </div>
      <textarea class="practice-textarea" id="practice-code" spellcheck="false" placeholder="${labels.placeholder}"></textarea>
      <div class="practice-actions">
        <button class="practice-button" type="button" id="practice-check">${labels.check}</button>
        <button class="practice-button secondary" type="button" id="practice-hint">${labels.showHint}</button>
        <button class="practice-button secondary" type="button" id="practice-next">${labels.next}</button>
        <button class="practice-button secondary" type="button" id="practice-reset">${labels.reset}</button>
      </div>
      <p class="practice-result" id="practice-result" aria-live="polite"></p>
      <div class="practice-solution" id="practice-solution">
        <button class="practice-button secondary" type="button" id="practice-toggle-solution">${labels.showSolution}</button>
        <pre><code id="practice-solution-code"></code></pre>
      </div>
    </div>
  `;

  const main = document.querySelector("main");
  const layout = main ? main.closest(".layout") : document.querySelector(".layout");
  const anchor = layout || main;

  if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(section, anchor.nextSibling);
  } else {
    document.body.insertBefore(section, document.body.lastElementChild);
  }

  const title = section.querySelector("#practice-title");
  const body = section.querySelector("#practice-body");
  const hints = section.querySelector("#practice-hints");
  const textarea = section.querySelector("#practice-code");
  const result = section.querySelector("#practice-result");
  const solution = section.querySelector("#practice-solution");
  const solutionCode = section.querySelector("#practice-solution-code");
  const solutionToggle = section.querySelector("#practice-toggle-solution");

  function renderTask() {
    const task = pageTasks[taskIndex];
    hintCount = 0;
    title.textContent = `${labels.task}: ${t(task.title)}`;
    body.textContent = t(task.body);
    hints.innerHTML = "";
    textarea.value = "";
    result.textContent = "";
    result.className = "practice-result";
    solution.classList.remove("is-open");
    solutionToggle.textContent = labels.showSolution;
    solutionCode.textContent = task.solution;
  }

  function showHint() {
    const taskHints = pageTasks[taskIndex].hints[lang] || (lang === "id" || lang === "ja" ? pageTasks[taskIndex].hints.en : null) || pageTasks[taskIndex].hints.uk;
    if (hintCount >= taskHints.length) return;
    const item = document.createElement("li");
    item.textContent = taskHints[hintCount];
    hints.appendChild(item);
    hintCount += 1;
  }

  function checkCode() {
    const raw = textarea.value;
    if (!raw.trim()) {
      result.textContent = labels.empty;
      result.className = "practice-result warn";
      return;
    }

    const code = normalize(raw);
    const task = pageTasks[taskIndex];
    const missing = task.checks.filter((part) => !checkPart(code, part));
    const done = task.checks.length - missing.length;
    const percent = Math.round((done / task.checks.length) * 100);

    if (!missing.length) {
      result.textContent = `${labels.score}: ${percent}%. ${labels.ok}`;
      result.className = "practice-result ok";
    } else {
      const missingText = missing.map((part) => Array.isArray(part) ? part.join(" / ") : part).join(", ");
      result.textContent = `${labels.score}: ${percent}%. ${labels.partial} ${labels.missing} ${missingText}`;
      result.className = "practice-result warn";
    }
  }

  section.querySelector("#practice-check").addEventListener("click", checkCode);
  section.querySelector("#practice-hint").addEventListener("click", showHint);
  section.querySelector("#practice-reset").addEventListener("click", () => {
    textarea.value = "";
    result.textContent = "";
    result.className = "practice-result";
  });
  section.querySelector("#practice-next").addEventListener("click", () => {
    taskIndex = (taskIndex + 1 + Math.floor(Math.random() * (pageTasks.length - 1 || 1))) % pageTasks.length;
    renderTask();
  });
  solutionToggle.addEventListener("click", () => {
    const isOpen = solution.classList.toggle("is-open");
    solutionToggle.textContent = isOpen ? labels.hideSolution : labels.showSolution;
  });

  renderTask();
})();
