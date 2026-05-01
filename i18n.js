/*
  Offline language helper for all lesson pages.
  It reads ?lang=uk|en|ru, saves the choice, translates common UI text,
  and keeps local links on the selected language.
*/
(function () {
  const supported = ["uk", "en", "ru"];
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  const saved = localStorage.getItem("siteLanguage");
  const savedVersion = localStorage.getItem("siteLanguageChoiceVersion");
  const lang = supported.includes(requested)
    ? requested
    : savedVersion === "2" && supported.includes(saved)
      ? saved
      : "en";

  localStorage.setItem("siteLanguage", lang);
  if (supported.includes(requested)) localStorage.setItem("siteLanguageChoiceVersion", "2");
  document.documentElement.lang = lang;

  const labels = {
    uk: "UKR",
    en: "ENG",
    ru: "RU"
  };

  const dict = {
    en: {
      "Вибери мову для навчання": "Choose a language to learn",
      "Офлайн-довідники українською мовою з короткими поясненнями, прикладами коду, пошуком і зручною навігацією.": "Offline guides with short explanations, code examples, search, and convenient navigation.",
      "Доступні довідники": "Available guides",
      "Вибір мови": "Language chooser",
      "Відкрити": "Open",
      "Підтримка": "Support",
      "Donation Goal": "Donation Goal",
      "Розвиток сайту": "Site development",
      "Підтримай мене, щоб я активніше розвивав сайт і додавав новий контент.": "Support me so I can develop the site more actively and add new content.",
      "Підтримати сайт": "Support the site",
      "Кожен донат допомагає рухати проєкт вперед ⚡": "Every donation helps move the project forward ⚡",
      "Почати": "Start",
      "Почати навчання": "Start learning",
      "Теми": "Topics",
      "Приклади": "Examples",
      "Довідник": "Reference",
      "Пошук": "Search",
      "Розділи": "Sections",
      "Меню": "Menu",
      "Копіювати": "Copy",
      "Скопійовано": "Copied",
      "Очистити": "Clear",
      "Назва:": "Name:",
      "Опис": "Description",
      "Синтаксис": "Syntax",
      "Приклад": "Example",
      "Примітка": "Note",
      "Категорія": "Category",
      "Коли використовувати": "When to use",
      "Для чого використовується": "What it is used for",
      "Показано всі теми довідника.": "All guide topics are shown.",
      "Показано всі теги та атрибути.": "All tags and attributes are shown.",
      "Показано всі селектори та властивості.": "All selectors and properties are shown.",
      "HTML довідник": "HTML guide",
      "CSS довідник": "CSS guide",
      "JavaScript довідник": "JavaScript guide",
      "C# довідник": "C# guide",
      "Python довідник": "Python guide",
      "C++ довідник": "C++ guide",
      "Java довідник": "Java guide",
      "JSON довідник": "JSON guide",
      "Перейти до CSS": "Go to CSS",
      "Перейти до JavaScript": "Go to JavaScript",
      "Повернутись до HTML": "Back to HTML",
      "HTML": "HTML",
      "CSS": "CSS",
      "JavaScript": "JavaScript",
      "C#": "C#",
      "Python": "Python",
      "C++": "C++",
      "Java": "Java",
      "Структура веб-сторінки: теги, атрибути, форми, таблиці, медіа та семантика.": "Web page structure: tags, attributes, forms, tables, media, and semantics.",
      "Оформлення сторінок: селектори, кольори, шрифти, відступи, flexbox, grid і адаптивність.": "Page styling: selectors, colors, fonts, spacing, flexbox, grid, and responsiveness.",
      "Інтерактивність у браузері: змінні, функції, масиви, DOM, події, fetch і localStorage.": "Browser interactivity: variables, functions, arrays, DOM, events, fetch, and localStorage.",
      ".NET, Unity, бекенд і ООП: типи, класи, методи, списки, файли, LINQ та обробка помилок.": ".NET, Unity, backend, and OOP: types, classes, methods, lists, files, LINQ, and error handling.",
      "Проста мова для скриптів, автоматизації, вебу, файлів, ООП, списків, словників і модулів.": "A simple language for scripts, automation, web, files, OOP, lists, dictionaries, and modules.",
      "Потужна мова для ігор, системного програмування, STL, pointers, references і high-performance коду.": "A powerful language for games, systems programming, STL, pointers, references, and high-performance code.",
      "Мова для Android, бекенду, JVM, великих систем, ООП, колекцій, файлів та інтерфейсів.": "A language for Android, backend, JVM, large systems, OOP, collections, files, and interfaces.",
      "Формат обміну даними: об’єкти, масиви, типи значень, API, JSON.parse(), JSON.stringify() та конфігурації.": "Data exchange format: objects, arrays, value types, API, JSON.parse(), JSON.stringify(), and configurations.",
      "теги": "tags",
      "атрибути": "attributes",
      "приклади": "examples",
      "стилі": "styles",
      "адаптивність": "responsive",
      "події": "events",
      "демо": "demos",
      "скрипти": "scripts",
      "автоматизація": "automation",
      "ООП": "OOP",
      "Введіть тему, тип або ключове слово": "Enter a topic, type, or keyword",
      "Введіть тему, тип, метод або слово з опису": "Enter a topic, type, method, or word from a description",
      "Введіть тег, атрибут або слово з опису": "Enter a tag, attribute, or word from a description",
      "Введіть селектор, властивість або слово з опису": "Enter a selector, property, or word from a description",
      "Головне меню": "Main menu",
      "Швидка навігація": "Quick navigation",
      "Programming Lessons. Усі довідники працюють офлайн і відкриваються як звичайні HTML-файли.": "Programming Lessons. All guides work offline and open as regular HTML files."
    },
    ru: {
      "Вибери мову для навчання": "Выбери язык для обучения",
      "Офлайн-довідники українською мовою з короткими поясненнями, прикладами коду, пошуком і зручною навігацією.": "Офлайн-справочники с короткими объяснениями, примерами кода, поиском и удобной навигацией.",
      "Доступні довідники": "Доступные справочники",
      "Вибір мови": "Выбор языка",
      "Відкрити": "Открыть",
      "Підтримка": "Поддержка",
      "Donation Goal": "Цель донатов",
      "Розвиток сайту": "Развитие сайта",
      "Підтримай мене, щоб я активніше розвивав сайт і додавав новий контент.": "Поддержи меня, чтобы я активнее развивал сайт и добавлял новый контент.",
      "Підтримати сайт": "Поддержать сайт",
      "Кожен донат допомагає рухати проєкт вперед ⚡": "Каждый донат помогает двигать проект вперед ⚡",
      "Почати": "Начать",
      "Почати навчання": "Начать обучение",
      "Теми": "Темы",
      "Приклади": "Примеры",
      "Довідник": "Справочник",
      "Пошук": "Поиск",
      "Розділи": "Разделы",
      "Меню": "Меню",
      "Копіювати": "Копировать",
      "Скопійовано": "Скопировано",
      "Очистити": "Очистить",
      "Назва:": "Название:",
      "Опис": "Описание",
      "Синтаксис": "Синтаксис",
      "Приклад": "Пример",
      "Примітка": "Примечание",
      "Категорія": "Категория",
      "Коли використовувати": "Когда использовать",
      "Для чого використовується": "Для чего используется",
      "Показано всі теми довідника.": "Показаны все темы справочника.",
      "Показано всі теги та атрибути.": "Показаны все теги и атрибуты.",
      "Показано всі селектори та властивості.": "Показаны все селекторы и свойства.",
      "HTML довідник": "HTML справочник",
      "CSS довідник": "CSS справочник",
      "JavaScript довідник": "JavaScript справочник",
      "C# довідник": "C# справочник",
      "Python довідник": "Python справочник",
      "C++ довідник": "C++ справочник",
      "Java довідник": "Java справочник",
      "JSON довідник": "JSON справочник",
      "Перейти до CSS": "Перейти к CSS",
      "Перейти до JavaScript": "Перейти к JavaScript",
      "Повернутись до HTML": "Вернуться к HTML",
      "HTML": "HTML",
      "CSS": "CSS",
      "JavaScript": "JavaScript",
      "C#": "C#",
      "Python": "Python",
      "C++": "C++",
      "Java": "Java",
      "Структура веб-сторінки: теги, атрибути, форми, таблиці, медіа та семантика.": "Структура веб-страницы: теги, атрибуты, формы, таблицы, медиа и семантика.",
      "Оформлення сторінок: селектори, кольори, шрифти, відступи, flexbox, grid і адаптивність.": "Оформление страниц: селекторы, цвета, шрифты, отступы, flexbox, grid и адаптивность.",
      "Інтерактивність у браузері: змінні, функції, масиви, DOM, події, fetch і localStorage.": "Интерактивность в браузере: переменные, функции, массивы, DOM, события, fetch и localStorage.",
      ".NET, Unity, бекенд і ООП: типи, класи, методи, списки, файли, LINQ та обробка помилок.": ".NET, Unity, backend и ООП: типы, классы, методы, списки, файлы, LINQ и обработка ошибок.",
      "Проста мова для скриптів, автоматизації, вебу, файлів, ООП, списків, словників і модулів.": "Простой язык для скриптов, автоматизации, веба, файлов, ООП, списков, словарей и модулей.",
      "Потужна мова для ігор, системного програмування, STL, pointers, references і high-performance коду.": "Мощный язык для игр, системного программирования, STL, pointers, references и high-performance кода.",
      "Мова для Android, бекенду, JVM, великих систем, ООП, колекцій, файлів та інтерфейсів.": "Язык для Android, backend, JVM, больших систем, ООП, коллекций, файлов и интерфейсов.",
      "Формат обміну даними: об’єкти, масиви, типи значень, API, JSON.parse(), JSON.stringify() та конфігурації.": "Формат обмена данными: объекты, массивы, типы значений, API, JSON.parse(), JSON.stringify() и конфигурации.",
      "теги": "теги",
      "атрибути": "атрибуты",
      "приклади": "примеры",
      "стилі": "стили",
      "адаптивність": "адаптивность",
      "події": "события",
      "демо": "демо",
      "скрипти": "скрипты",
      "автоматизація": "автоматизация",
      "ООП": "ООП",
      "Введіть тему, тип або ключове слово": "Введите тему, тип или ключевое слово",
      "Введіть тему, тип, метод або слово з опису": "Введите тему, тип, метод или слово из описания",
      "Введіть тег, атрибут або слово з опису": "Введите тег, атрибут или слово из описания",
      "Введіть селектор, властивість або слово з опису": "Введите селектор, свойство или слово из описания",
      "Головне меню": "Главное меню",
      "Швидка навігація": "Быстрая навигация",
      "Programming Lessons. Усі довідники працюють офлайн і відкриваються як звичайні HTML-файли.": "Programming Lessons. Все справочники работают офлайн и открываются как обычные HTML-файлы."
    }
  };

  if (window.I18N_AUTO_TRANSLATIONS) {
    supported.forEach((code) => {
      if (code !== "uk") {
        dict[code] = Object.assign({}, window.I18N_AUTO_TRANSLATIONS[code] || {}, dict[code] || {});
      }
    });
  }

  const titleMap = {
    en: {
      "Programming Lessons / Вибір мови": "Programming Lessons / Language chooser",
      "HTML Lessons / HTML Довідник": "HTML Lessons / HTML Guide",
      "CSS Lessons / CSS Довідник": "CSS Lessons / CSS Guide",
      "JavaScript Lessons / JavaScript Довідник": "JavaScript Lessons / JavaScript Guide",
      "C# Lessons / C# Довідник": "C# Lessons / C# Guide",
      "Python Lessons / Python Довідник": "Python Lessons / Python Guide",
      "C++ Lessons / C++ Довідник": "C++ Lessons / C++ Guide",
      "Java Lessons / Java Довідник": "Java Lessons / Java Guide",
      "JSON Lessons / JSON Довідник": "JSON Lessons / JSON Guide",
      "Rust Lessons / Rust Довідник": "Rust Lessons / Rust Guide",
      "Assembler Lessons / Assembly Довідник": "Assembler Lessons / Assembly Guide",
      "C Lessons / C Довідник": "C Lessons / C Guide",
      "SQL Lessons / SQL Довідник": "SQL Lessons / SQL Guide",
      "TypeScript Lessons / TypeScript Довідник": "TypeScript Lessons / TypeScript Guide",
      "PHP Lessons / PHP Довідник": "PHP Lessons / PHP Guide",
      "PowerShell Lessons / PowerShell Довідник": "PowerShell Lessons / PowerShell Guide",
      "English Lessons / Довідник англійської мови": "English Lessons / English Guide"
    },
    ru: {
      "Programming Lessons / Вибір мови": "Programming Lessons / Выбор языка",
      "HTML Lessons / HTML Довідник": "HTML Lessons / HTML Справочник",
      "CSS Lessons / CSS Довідник": "CSS Lessons / CSS Справочник",
      "JavaScript Lessons / JavaScript Довідник": "JavaScript Lessons / JavaScript Справочник",
      "C# Lessons / C# Довідник": "C# Lessons / C# Справочник",
      "Python Lessons / Python Довідник": "Python Lessons / Python Справочник",
      "C++ Lessons / C++ Довідник": "C++ Lessons / C++ Справочник",
      "Java Lessons / Java Довідник": "Java Lessons / Java Справочник",
      "JSON Lessons / JSON Довідник": "JSON Lessons / JSON Справочник",
      "Rust Lessons / Rust Довідник": "Rust Lessons / Rust Справочник",
      "Assembler Lessons / Assembly Довідник": "Assembler Lessons / Assembly Справочник",
      "C Lessons / C Довідник": "C Lessons / C Справочник",
      "SQL Lessons / SQL Довідник": "SQL Lessons / SQL Справочник",
      "TypeScript Lessons / TypeScript Довідник": "TypeScript Lessons / TypeScript Справочник",
      "PHP Lessons / PHP Довідник": "PHP Lessons / PHP Справочник",
      "PowerShell Lessons / PowerShell Довідник": "PowerShell Lessons / PowerShell Справочник",
      "English Lessons / Довідник англійської мови": "English Lessons / Справочник английского языка"
    }
  };

  const fragmentMap = {
    en: {
      "Привіт, світ!": "Hello, world!",
      "Привіт з JavaScript": "Hello from JavaScript",
      "Привіт з Python": "Hello from Python",
      "Привіт з Java": "Hello from Java",
      "Привіт з C++": "Hello from C++",
      "Привіт з C#": "Hello from C#",
      "Привіт з PHP": "Hello from PHP",
      "Привіт з C": "Hello from C",
      "Привіт": "Hello",
      "Світ": "World",
      "Олена": "Helen",
      "Іван": "Ivan",
      "Оля": "Olia",
      "Анна": "Anna",
      "Київ": "Kyiv",
      "Львів": "Lviv",
      "Україна": "Ukraine",
      "Українська": "Ukrainian",
      "Понеділок": "Monday",
      "Вівторок": "Tuesday",
      "Пн": "Mon",
      "Відмінно": "Excellent",
      "Зараховано": "Passed",
      "Спробуй ще": "Try again",
      "Парне": "Even",
      "Непарне": "Odd",
      "Раз": "Once",
      "Один": "One",
      "Два": "Two",
      "Інше": "Other",
      "Інший": "Other",
      "Помилка підключення": "Connection error",
      "Помилка": "Error",
      "Невірний формат": "Invalid format",
      "Невірне число": "Invalid number",
      "Невірні дані": "Invalid data",
      "Не число": "Not a number",
      "Ділення на нуль": "Division by zero",
      "Доступ дозволено": "Access allowed",
      "Доступ заборонено": "Access denied",
      "Можна увійти": "You can enter",
      "Потрібен дозвіл": "Permission is required",
      "Вхід заборонено": "Entry denied",
      "Вхід виконано": "Login completed",
      "Повний доступ": "Full access",
      "Звичайний доступ": "Regular access",
      "Гість": "Guest",
      "Онлайн": "Online",
      "Офлайн": "Offline",
      "Кнопку натиснули": "Button clicked",
      "Кнопку натиснули!": "Button clicked!",
      "Клік!": "Click!",
      "Текст змінено через JavaScript": "Text changed with JavaScript",
      "Новий заголовок": "New heading",
      "Готово": "Done",
      "Повтор": "Repeat",
      "Минуло 2 секунди": "2 seconds passed",
      "Сталася помилка": "An error occurred",
      "Подія click спрацювала.": "The click event fired.",
      "Поле порожнє.": "The field is empty.",
      "Завантаження...": "Loading...",
      "Локальний API": "Local API",
      "Сайт": "Site",
      "Сторінка": "Page",
      "Моя сторінка": "My page",
      "Тема": "Topic",
      "Текст": "Text",
      "Теги тексту": "Text tags",
      "Абзаци": "Paragraphs",
      "Деталі": "Details",
      "Увага!": "Attention!",
      "Увага": "Attention",
      "Жирний текст": "Bold text",
      "дуже": "very",
      "знайдене слово": "found word",
      "Стара ціна": "Old price",
      "Новий текст": "New text",
      "HTML описує структуру веб-сторінки.": "HTML describes the structure of a web page.",
      "Простота важлива": "Simplicity matters",
      "Автор": "Author",
      "Документація": "Documentation",
      "Використайте": "Use",
      "рядок": "line",
      "Рядок": "Line",
      "Натисніть": "Press",
      "Відкрити сайт": "Open site",
      "Головна": "Home",
      "Опис фото": "Photo description",
      "Підпис": "Caption",
      "Пояснення до зображення": "Image explanation",
      "Вбудована сторінка": "Embedded page",
      "Крок": "Step",
      "Пункт списку": "List item",
      "Мова розмітки": "Markup language",
      "Мова стилів": "Style language",
      "Дані": "Data",
      "Розклад занять": "Class schedule",
      "Розклад": "Schedule",
      "Разом": "Total",
      "Комірка": "Cell",
      "Ім’я": "Name",
      "Надіслати": "Send",
      "Контакти": "Contacts",
      "Особисті дані": "Personal data",
      "Про нас": "About us",
      "Новина": "News",
      "Корисні посилання": "Useful links",
      "Більше": "More",
      "Показати пояснення": "Show explanation",
      "Повідомлення": "Message",
      "Картка": "Card",
      "Прихований текст": "Hidden text",
      "Вибрати": "Select",
      "Фото": "Photo",
      "Логотип компанії": "Company logo",
      "Тільки читання": "Read only",
      "Зареєструватися": "Register",
      "День": "Day",
      "Механічна клавіатура": "Mechanical keyboard",
      "Клавіатура KeyPro": "KeyPro Keyboard",
      "Компактна клавіатура для навчання і роботи.": "Compact keyboard for learning and work.",
      "Ціна": "Price",
      "Купити": "Buy",
      "Переваги": "Benefits",
      "Навчайтесь HTML українською": "Learn HTML in Ukrainian",
      "Короткі пояснення, прості приклади та зрозуміла структура.": "Short explanations, simple examples, and clear structure.",
      "Дізнатися більше": "Learn more",
      "Працює офлайн": "Works offline",
      "Підходить для новачків": "Good for beginners",
      "Містить приклади коду": "Contains code examples",
      "Однорядковий коментар": "Single-line comment",
      "Багаторядковий коментар": "Multi-line comment",
      "Багаторядковий": "Multi-line",
      "Ще один коментар": "Another comment",
      "Це коментар": "This is a comment",
      "Довгий коментар": "Long comment",
      "Довгий": "Long",
      "Коментар": "Comment",
      "коментар": "comment",
      "Майже": "Almost",
      "селектор": "selector",
      "властивість": "property",
      "значення": "value",
      "інша-властивість": "another-property",
      "інше-значення": "another-value",
      "Фрагмент коду": "Code fragment",
      "Показує короткий код усередині тексту.": "Shows short code inside text.",
      "Попередньо форматований текст": "Preformatted text",
      "Зберігає пробіли та перенесення рядків.": "Keeps spaces and line breaks.",
      "адреса": "address",
      "значення за адресою": "value at address",
      "число більше 5": "number greater than 5",
      "rax більше 5": "rax greater than 5",
      "Assembly працює": "Assembly works",
      "Вгору": "Up",
      "Інший напрям": "Other direction",
      "Немає значення": "No value",
      "Вік": "Age",
      "Ваше ім’я": "Your name",
      "Вивчити": "Learn",
      "Написати код": "Write code",
      "Кількість": "Count",
      "Навчаюсь": "I am learning",
      "Перша нотатка": "First note",
      "Друга нотатка": "Second note",
      "Файл не знайдено": "File not found",
      "Копіювати": "Copy",
      "Назва тегу": "Tag name",
      "Назва": "Name",
      "Категорія": "Category",
      "Опис": "Description",
      "Для чого використовується": "What it is used for",
      "Приклад": "Example",
      "Важливі атрибути": "Important attributes",
      "Де використовується": "Where it is used",
      "Синтаксис": "Syntax",
      "Примітка": "Note",
      "Типові значення": "Typical values",
      "Коли використовувати": "When to use",
      "однорядковий": "single-line",
      "Для простого нового рядка часто вистачає": "For a simple new line, often enough is",
      "Ваш email": "Your email",
      "Вид на місто": "City view",
      "важливо": "important",
      "Це": "This",
      "моя перша HTML-сторінка": "is my first HTML page",
      "грн": "UAH",
      "Кіт": "Cat",
      "Недоступно": "Disabled",
      "Про HTML": "About HTML",
      "Теги": "Tags",
      "допомагають браузеру зрозуміти зміст": "help the browser understand the content",
      "Добра структура робить сторінку зрозумілою": "Good structure makes the page understandable",
      "Фото міста на заході сонця": "Photo of the city at sunset",
      "Пароль": "Password",
      "Java є строго типізованою мовою": "Java is a strongly typed language",
      "Код організовується у класи": "Code is organized into classes",
      "програма зазвичай починається з методу": "the program usually starts with the method",
      "Java є строго типізованою": "Java is strongly typed",
      "тип змінної потрібно вказати": "the variable type must be specified",
      "через сучасний": "with modern",
      "у локальному контексті": "in the local context",
      " а ": " and ",
      " а": " and",
      " і ": " and ",
      " і": " and",
      "і ": "and ",
      " або ": " or ",
      "або": "or",
      "але": "but",
      "andле": "but"
      ,"створює байти рядка, а": "creates string bytes, and"
      ,"робить мітку": "makes the label"
      ,"точкою входу": "the entry point"
      ,"вибирає системний виклик": "selects the system call"
      ,"передають аргументи: куди, що і скільки байтів писати.": "pass arguments: where, what, and how many bytes to write."
      ,"створює коментар до кінця рядка, а": "creates a comment to the end of the line, and"
      ,"створює однорядковий коментар, а": "creates a single-line comment, and"
      ,"створює однорядковий comment": "creates a single-line comment"
      ,"— багаторядковий.": "— multi-line."
      ,"— багаторядковий коментар.": "— multi-line comment."
      ,"Більшість інструкцій у C завершується символом": "Most C statements end with the symbol"
      ,"Більшість інструкцій завершується символом": "Most statements end with the symbol"
      ,"підключає заголовковий файл": "includes a header file"
      ,"є точкою входу": "is the entry point"
      ,"повертає результат": "returns the result"
      ,"дозволяють вибирати різний код": "allow choosing different code"
      ,"зупиняє цикл": "stops the loop"
      ,"переходить до наступної ітерації": "moves to the next iteration"
      ,"Рядок у C — це масив": "A string in C is an array"
      ,"який завершується символом": "that ends with the character"
      ,"Pointer зберігає адресу іншої змінної. Оператор": "A pointer stores the address of another variable. The operator"
      ,"зберігає адресу іншої змінної": "stores the address of another variable"
      ,"бере адресу": "takes the address"
      ,"дістає значення за адресою": "gets the value at the address"
      ,"Завжди звільняй пам’ять через": "Always free memory with"
      ,"Не використовуй пам’ять після": "Do not use memory after"
      ,"C працює з файлами через тип": "C works with files through the type"
      ,"Потрібен": "Requires"
      ,"Для змінної зазвичай передають адресу через": "For a variable, usually pass the address with"
      ,"Повертає довжину рядка без символу": "Returns the string length without the character"
      ,"Перевіряйте результат на": "Check the result for"
      ,"Після використання потрібен": "After use, you need"
      ,"Не використовуйте вказівник після": "Do not use the pointer after"
      ,"Може повернути": "Can return"
      ,"Результат має тип": "The result has type"
      ,"Підключає бібліотеку для введення і виведення, зокрема": "Includes the library for input and output, including"
      ,"Дозволяє писати": "Allows writing"
      ,"замість": "instead of"
      ,"У великих проєктах часто краще писати": "In large projects it is often better to write"
      ,"явно": "explicitly"
      ,"C++ чутливий до регістру": "C++ is case-sensitive"
      ,"C# чутливий до регістру": "C# is case-sensitive"
      ,"Java чутлива до регістру": "Java is case-sensitive"
      ,"Python чутливий до регістру": "Python is case-sensitive"
      ,"різні імена": "different names"
      ,"C++ є строго типізованою мовою: тип змінної треба вказати явно або вивести через": "C++ is a strongly typed language: the variable type must be specified explicitly or inferred with"
      ,"Підключає простір імен": "Imports the namespace"
      ,"підключає простір імен": "imports the namespace"
      ,"де знаходиться клас": "where the class is located"
      ,"групує ваші класи": "groups your classes"
      ,"гнучка колекція, яка може змінювати розмір під час роботи програми": "a flexible collection that can change size while the program runs"
      ,"зберігає елементи одного типу": "stores elements of one type"
      ,"Виконається хоча б раз": "Runs at least once"
      ,"Перевірку завершено": "Check completed"
      ,"CSS можна писати у файлі, в тегу": "CSS can be written in a file, in the tag"
      ,"або в атрибуті": "or in the attribute"
      ,"Готові фрагменти CSS, які можна копіювати в окремий файл або тег": "Ready CSS snippets that can be copied into a separate file or tag"
      ,"Селектор:": "Selector:"
      ,"Властивість:": "Property:"
      ,"Кореневий елемент сторінки. У ньому знаходяться": "The root element of the page. It contains"
      ,"На сторінці має бути один елемент": "A page should have one element"
      ,"Вміст": "Content"
      ,"зазвичай не показується на сторінці": "is usually not shown on the page"
      ,"Усе, що бачить користувач, зазвичай знаходиться в": "Everything the user sees is usually inside"
      ,"Розміщується всередині": "Placed inside"
      ,"Зазвичай один": "Usually one"
      ,"на сторінку": "per page"
      ,"Позначає підрозділ всередині": "Marks a subsection inside"
      ,"Це абзац українського тексту.": "This is a paragraph of English text."
      ,"Не вкладайте в": "Do not put inside"
      ,"великі блочні елементи": "large block elements"
      ,"Увімкніть JavaScript.": "Enable JavaScript."
      ,"Багаторядковий": "Multi-line"
      ,"Довгий": "Long"
      ,"Коментар": "Comment"
      ,"коментар": "comment"
      ,"Майже": "Almost"
      ,"Результат": "Result"
      ,"Підключає бібліотеку": "Includes the library"
      ,"підключає": "includes"
      ,"створює": "creates"
      ,"змінну": "a variable"
      ,"За замовчуванням вона незмінна": "By default it is immutable"
      ,"дозволяє змінювати": "allows changing"
      ,"value": "value"
      ,"Виto teach": "Learn"
      ,"Greetings, світ!": "Hello, world!"
      ,"Greetings з": "Hello from"
      ,"Увімкніть": "Enable"
      ,"Наступний розділ": "Next section"
      ,"Вступ": "Intro"
      ," а ": " and "
      ," а": " and"
      ," або ": " or "
      ,"Без": "Without"
      ,"без": "without"
      ,"для": "for"
      ,"до кінця рядка": "to the end of the line"
      ,"пишеться через": "is written with"
      ,"Символ": "The symbol"
      ,"передає результат однієї команди в іншу": "passes the result of one command to another"
      ,"Команду можна запускати у PowerShell-консолі або в": "The command can be run in the PowerShell console or in a"
      ,"скрипті": "script"
      ,"Назви команд часто мають формат дієслово-іменник": "Command names often use the verb-noun format"
      ,"Змінні починаються зі знака": "Variables start with the sign"
      ,"може визначати тип автоматично": "can detect the type automatically"
      ,"тип можна вказати явно": "the type can be specified explicitly"
      ,"виконують різний код залежно від умови": "run different code depending on the condition"
      ,"повторюють команди": "repeat commands"
      ,"створює власну команду": "creates a custom command"
      ,"Параметри можна описувати через": "Parameters can be described with"
      ,"створює масив": "creates an array"
      ,"створює простий об’єкт з властивостями": "creates a simple object with properties"
      ,"читає файл": "reads a file"
      ,"записує новий вміст": "writes new content"
      ,"додає текст у кінець": "adds text to the end"
      ,"PowerShell-скрипти зберігаються у файлах": "PowerShell scripts are stored in files"
      ,"Запускати локальний скрипт можна через": "A local script can be run with"
      ,"містить ризиковану дію": "contains a risky action"
      ,"реагує на помилку": "reacts to an error"
      ,"Додавайте": "Add"
      ,"для прикладів": "for examples"
      ,"Код можна писати в тегу": "Code can be written in the tag"
      ,"підключати окремий файл через": "connect a separate file with"
      ,"JavaScript чутливий до регістру": "JavaScript is case-sensitive"
      ,"змінна": "variable"
      ,"значення без повторного присвоєння": "value without reassignment"
      ,"старий спосіб оголошення": "old declaration method"
      ,"яблуко": "apple"
      ,"груша": "pear"
      ,"невірний JSON": "invalid JSON"
      ,"Добре": "Good"
      ,"PHP-код пишеться всередині": "PHP code is written inside"
      ,"Якщо файл містить тільки PHP, закривальний тег часто не пишуть": "If the file contains only PHP, the closing tag is often omitted"
      ,"PHP підтримує": "PHP supports"
      ,"виводять текст": "output text"
      ,"частіше використовується для простого виводу": "is more often used for simple output"
      ,"Змінні у PHP починаються зі знака": "Variables in PHP start with the sign"
      ,"Тип часто визначається автоматично за значенням": "The type is often detected automatically from the value"
      ,"дозволяють виконувати різний код": "allow running different code"
      ,"Цикли повторюють код": "Loops repeat code"
      ,"особливо зручний для масивів": "is especially convenient for arrays"
      ,"читає дані з URL": "reads data from the URL"
      ,"дані, відправлені формою методом POST": "data sent by a form using POST"
      ,"читає дані": "reads data"
      ,"додає новий запис": "adds a new record"
      ,"Для даних користувача краще використовувати prepared statements": "For user data, it is better to use prepared statements"
      ,"містить ризикований код": "contains risky code"
      ,"обробляє помилку": "handles the error"
      ,"Функція": "The function"
      ,"виводить текст або значення в консоль": "outputs text or a value to the console"
      ,"Рядок пишеться в лапках": "A string is written in quotes"
      ,"Після": "After"
      ,"ставиться двокрапка": "a colon is placed"
      ,"Вираз без": "An expression without"
      ,"може повертати значення": "can return a value"
      ,"більше не можна використовувати": "can no longer be used"
      ,"бо ownership перемістився": "because ownership moved"
      ,"Таблиця схожа на електронну таблицю": "A table is similar to a spreadsheet"
      ,"має колонки, рядки і значення": "has columns, rows, and values"
      ,"Наприклад, таблиця": "For example, the table"
      ,"може мати": "can have"
      ,"вибирає колонку": "selects the column"
      ,"змінює існуючі рядки": "updates existing rows"
      ,"Майже завжди потрібен": "Almost always needs"
      ,"щоб не змінити всю таблицю": "to avoid changing the whole table"
      ,"видаляє рядки": "deletes rows"
      ,"може видалити всі дані з таблиці": "can delete all data from the table"
      ,"поєднують умови": "combine conditions"
      ,"сортує результат": "sorts the result"
      ,"означає за зростанням": "means ascending"
      ,"за спаданням": "descending"
      ,"Коментарі такі самі, як у JavaScript": "Comments are the same as in JavaScript"
      ,"для одного рядка": "for one line"
      ,"для кількох рядків": "for several lines"
      ,"використовують для змінних, які можуть змінюватися": "is used for variables that can change"
      ,"для значень, які не переприсвоюються": "for values that are not reassigned"
      ,"Масиви типізують через": "Arrays are typed with"
      ,"Об’єкти можна описувати прямо в типі": "Objects can be described directly in the type"
      ,"забороняє зміну поля після створення": "prevents changing a field after creation"
      ,"TypeScript додає модифікатори доступу": "TypeScript adds access modifiers"
      ,"відкриває значення з файлу": "exports a value from a file"
      ,"підключає його в іншому файлі": "imports it in another file"
      ,"власну": "custom"
      ,"простий об’єкт": "simple object"
      ,"властивостями": "properties"
      ,"масив": "array"
      ,"Масиви": "Arrays"
      ,"дані": "data"
      ,"рядки": "rows"
      ,"таблицю": "table"
      ,"файл": "file"
      ,"файлах": "files"
      ,"помилку": "error"
    },
    ru: {
      "Привіт, світ!": "Привет, мир!",
      "Привіт з JavaScript": "Привет из JavaScript",
      "Привіт з Python": "Привет из Python",
      "Привіт з Java": "Привет из Java",
      "Привіт з C++": "Привет из C++",
      "Привіт з C#": "Привет из C#",
      "Привіт з PHP": "Привет из PHP",
      "Привіт з C": "Привет из C",
      "Привіт": "Привет",
      "Світ": "Мир",
      "Олена": "Елена",
      "Іван": "Иван",
      "Оля": "Оля",
      "Анна": "Анна",
      "Київ": "Киев",
      "Львів": "Львов",
      "Україна": "Украина",
      "Українська": "Украинский",
      "Понеділок": "Понедельник",
      "Вівторок": "Вторник",
      "Пн": "Пн",
      "Відмінно": "Отлично",
      "Зараховано": "Зачтено",
      "Спробуй ще": "Попробуй еще",
      "Парне": "Четное",
      "Непарне": "Нечетное",
      "Раз": "Раз",
      "Один": "Один",
      "Два": "Два",
      "Інше": "Другое",
      "Помилка підключення": "Ошибка подключения",
      "Помилка": "Ошибка",
      "Невірний формат": "Неверный формат",
      "Невірне число": "Неверное число",
      "Невірні дані": "Неверные данные",
      "Не число": "Не число",
      "Ділення на нуль": "Деление на ноль",
      "Доступ дозволено": "Доступ разрешен",
      "Доступ заборонено": "Доступ запрещен",
      "Можна увійти": "Можно войти",
      "Потрібен дозвіл": "Нужно разрешение",
      "Вхід заборонено": "Вход запрещен",
      "Вхід виконано": "Вход выполнен",
      "Повний доступ": "Полный доступ",
      "Звичайний доступ": "Обычный доступ",
      "Гість": "Гость",
      "Онлайн": "Онлайн",
      "Офлайн": "Офлайн",
      "Кнопку натиснули": "Кнопку нажали",
      "Кнопку натиснули!": "Кнопку нажали!",
      "Клік!": "Клик!",
      "Текст змінено через JavaScript": "Текст изменен через JavaScript",
      "Новий заголовок": "Новый заголовок",
      "Готово": "Готово",
      "Повтор": "Повтор",
      "Минуло 2 секунди": "Прошло 2 секунды",
      "Сталася помилка": "Произошла ошибка",
      "Подія click спрацювала.": "Событие click сработало.",
      "Поле порожнє.": "Поле пустое.",
      "Завантаження...": "Загрузка...",
      "Локальний API": "Локальный API",
      "Сайт": "Сайт",
      "Сторінка": "Страница",
      "Моя сторінка": "Моя страница",
      "Тема": "Тема",
      "Текст": "Текст",
      "Теги тексту": "Теги текста",
      "Абзаци": "Абзацы",
      "Деталі": "Детали",
      "Увага!": "Внимание!",
      "Увага": "Внимание",
      "Жирний текст": "Жирный текст",
      "дуже": "очень",
      "знайдене слово": "найденное слово",
      "Стара ціна": "Старая цена",
      "Новий текст": "Новый текст",
      "HTML описує структуру веб-сторінки.": "HTML описывает структуру веб-страницы.",
      "Простота важлива": "Простота важна",
      "Автор": "Автор",
      "Документація": "Документация",
      "Використайте": "Используйте",
      "рядок": "строка",
      "Рядок": "Строка",
      "Натисніть": "Нажмите",
      "Відкрити сайт": "Открыть сайт",
      "Головна": "Главная",
      "Опис фото": "Описание фото",
      "Підпис": "Подпись",
      "Пояснення до зображення": "Пояснение к изображению",
      "Вбудована сторінка": "Встроенная страница",
      "Крок": "Шаг",
      "Пункт списку": "Пункт списка",
      "Мова розмітки": "Язык разметки",
      "Мова стилів": "Язык стилей",
      "Дані": "Данные",
      "Розклад занять": "Расписание занятий",
      "Розклад": "Расписание",
      "Разом": "Итого",
      "Комірка": "Ячейка",
      "Ім’я": "Имя",
      "Надіслати": "Отправить",
      "Контакти": "Контакты",
      "Особисті дані": "Личные данные",
      "Про нас": "О нас",
      "Новина": "Новость",
      "Корисні посилання": "Полезные ссылки",
      "Більше": "Больше",
      "Показати пояснення": "Показать объяснение",
      "Повідомлення": "Сообщение",
      "Картка": "Карточка",
      "Прихований текст": "Скрытый текст",
      "Вибрати": "Выбрать",
      "Фото": "Фото",
      "Логотип компанії": "Логотип компании",
      "Тільки читання": "Только чтение",
      "Зареєструватися": "Зарегистрироваться",
      "День": "День",
      "Механічна клавіатура": "Механическая клавиатура",
      "Клавіатура KeyPro": "Клавиатура KeyPro",
      "Компактна клавіатура для навчання і роботи.": "Компактная клавиатура для учебы и работы.",
      "Ціна": "Цена",
      "Купити": "Купить",
      "Переваги": "Преимущества",
      "Навчайтесь HTML українською": "Учите HTML на украинском",
      "Короткі пояснення, прості приклади та зрозуміла структура.": "Короткие объяснения, простые примеры и понятная структура.",
      "Дізнатися більше": "Узнать больше",
      "Працює офлайн": "Работает офлайн",
      "Підходить для новачків": "Подходит для новичков",
      "Містить приклади коду": "Содержит примеры кода",
      "Однорядковий коментар": "Однострочный комментарий",
      "Багаторядковий коментар": "Многострочный комментарий",
      "Багаторядковий": "Многострочный",
      "Ще один коментар": "Еще один комментарий",
      "Це коментар": "Это комментарий",
      "Довгий коментар": "Длинный комментарий",
      "Довгий": "Длинный",
      "Коментар": "Комментарий",
      "коментар": "комментарий",
      "Майже": "Почти",
      "селектор": "селектор",
      "властивість": "свойство",
      "значення": "значение",
      "інша-властивість": "другое-свойство",
      "інше-значення": "другое-значение",
      "Фрагмент коду": "Фрагмент кода",
      "Показує короткий код усередині тексту.": "Показывает короткий код внутри текста.",
      "Попередньо форматований текст": "Предварительно форматированный текст",
      "Зберігає пробіли та перенесення рядків.": "Сохраняет пробелы и переносы строк.",
      "адреса": "адрес",
      "значення за адресою": "значение по адресу",
      "число більше 5": "число больше 5",
      "rax більше 5": "rax больше 5",
      "Assembly працює": "Assembly работает",
      "Вгору": "Вверх",
      "Інший напрям": "Другое направление",
      "Немає значення": "Нет значения",
      "Вік": "Возраст",
      "Ваше ім’я": "Ваше имя",
      "Вивчити": "Изучить",
      "Написати код": "Написать код",
      "Кількість": "Количество",
      "Навчаюсь": "Учусь",
      "Перша нотатка": "Первая заметка",
      "Друга нотатка": "Вторая заметка",
      "Файл не знайдено": "Файл не найден",
      "Копіювати": "Копировать",
      "Назва тегу": "Название тега",
      "Назва": "Название",
      "Категорія": "Категория",
      "Опис": "Описание",
      "Для чого використовується": "Для чего используется",
      "Приклад": "Пример",
      "Важливі атрибути": "Важные атрибуты",
      "Де використовується": "Где используется",
      "Синтаксис": "Синтаксис",
      "Примітка": "Примечание",
      "Типові значення": "Типичные значения",
      "Коли використовувати": "Когда использовать"
      ,"створює байти рядка, а": "создает байты строки, а"
      ,"робить мітку": "делает метку"
      ,"точкою входу": "точкой входа"
      ,"вибирає системний виклик": "выбирает системный вызов"
      ,"передають аргументи: куди, що і скільки байтів писати.": "передают аргументы: куда, что и сколько байтов писать."
      ,"створює коментар до кінця рядка, а": "создает комментарий до конца строки, а"
      ,"створює однорядковий коментар, а": "создает однострочный комментарий, а"
      ,"— багаторядковий.": "— многострочный."
      ,"— багаторядковий коментар.": "— многострочный комментарий."
      ,"Більшість інструкцій у C завершується символом": "Большинство инструкций в C завершается символом"
      ,"Більшість інструкцій завершується символом": "Большинство инструкций завершается символом"
      ,"підключає заголовковий файл": "подключает заголовочный файл"
      ,"є точкою входу": "является точкой входа"
      ,"повертає результат": "возвращает результат"
      ,"дозволяють вибирати різний код": "позволяют выбирать разный код"
      ,"зупиняє цикл": "останавливает цикл"
      ,"переходить до наступної ітерації": "переходит к следующей итерации"
      ,"Рядок у C — це масив": "Строка в C — это массив"
      ,"який завершується символом": "который завершается символом"
      ,"Pointer зберігає адресу іншої змінної. Оператор": "Указатель хранит адрес другой переменной. Оператор"
      ,"зберігає адресу іншої змінної": "хранит адрес другой переменной"
      ,"бере адресу": "берет адрес"
      ,"дістає значення за адресою": "получает значение по адресу"
      ,"Завжди звільняй пам’ять через": "Всегда освобождай память через"
      ,"Не використовуй пам’ять після": "Не используй память после"
      ,"C працює з файлами через тип": "C работает с файлами через тип"
      ,"Потрібен": "Нужен"
      ,"Для змінної зазвичай передають адресу через": "Для переменной обычно передают адрес через"
      ,"Повертає довжину рядка без символу": "Возвращает длину строки без символа"
      ,"Перевіряйте результат на": "Проверяйте результат на"
      ,"Після використання потрібен": "После использования нужен"
      ,"Не використовуйте вказівник після": "Не используйте указатель после"
      ,"Може повернути": "Может вернуть"
      ,"Результат має тип": "Результат имеет тип"
      ,"Підключає бібліотеку для введення і виведення, зокрема": "Подключает библиотеку для ввода и вывода, включая"
      ,"Дозволяє писати": "Позволяет писать"
      ,"замість": "вместо"
      ,"У великих проєктах часто краще писати": "В больших проектах часто лучше писать"
      ,"явно": "явно"
      ,"C++ чутливий до регістру": "C++ чувствителен к регистру"
      ,"C# чутливий до регістру": "C# чувствителен к регистру"
      ,"Java чутлива до регістру": "Java чувствительна к регистру"
      ,"Python чутливий до регістру": "Python чувствителен к регистру"
      ,"різні імена": "разные имена"
      ,"C++ є строго типізованою мовою: тип змінної треба вказати явно або вивести через": "C++ — строго типизированный язык: тип переменной нужно указать явно или вывести через"
      ,"Підключає простір імен": "Подключает пространство имен"
      ,"підключає простір імен": "подключает пространство имен"
      ,"де знаходиться клас": "где находится класс"
      ,"групує ваші класи": "группирует ваши классы"
      ,"гнучка колекція, яка може змінювати розмір під час роботи програми": "гибкая коллекция, которая может менять размер во время работы программы"
      ,"зберігає елементи одного типу": "хранит элементы одного типа"
      ,"Виконається хоча б раз": "Выполнится хотя бы один раз"
      ,"Перевірку завершено": "Проверка завершена"
      ,"CSS можна писати у файлі, в тегу": "CSS можно писать в файле, в теге"
      ,"або в атрибуті": "или в атрибуте"
      ,"Готові фрагменти CSS, які можна копіювати в окремий файл або тег": "Готовые фрагменты CSS, которые можно копировать в отдельный файл или тег"
      ,"Селектор:": "Селектор:"
      ,"Властивість:": "Свойство:"
      ,"Кореневий елемент сторінки. У ньому знаходяться": "Корневой элемент страницы. В нем находятся"
      ,"На сторінці має бути один елемент": "На странице должен быть один элемент"
      ,"Вміст": "Содержимое"
      ,"зазвичай не показується на сторінці": "обычно не показывается на странице"
      ,"Усе, що бачить користувач, зазвичай знаходиться в": "Все, что видит пользователь, обычно находится в"
      ,"Розміщується всередині": "Размещается внутри"
      ,"Зазвичай один": "Обычно один"
      ,"на сторінку": "на страницу"
      ,"Позначає підрозділ всередині": "Обозначает подраздел внутри"
      ,"Це абзац українського тексту.": "Это абзац русского текста."
      ,"Не вкладайте в": "Не вкладывайте в"
      ,"великі блочні елементи": "большие блочные элементы"
      ,"Увімкніть JavaScript.": "Включите JavaScript."
      ,"Результат": "Результат"
      ,"Підключає бібліотеку": "Подключает библиотеку"
      ," а ": " и "
      ," або ": " или "
      ,"Без": "Без"
      ,"для": "для"
      ,"до кінця рядка": "до конца строки"
      ,"пишеться через": "пишется через"
      ,"Символ": "Символ"
      ,"передає результат однієї команди в іншу": "передает результат одной команды в другую"
      ,"Команду можна запускати у PowerShell-консолі або в": "Команду можно запускать в PowerShell-консоли или в"
      ,"скрипті": "скрипте"
      ,"Назви команд часто мають формат дієслово-іменник": "Названия команд часто имеют формат глагол-существительное"
      ,"Змінні починаються зі знака": "Переменные начинаются со знака"
      ,"може визначати тип автоматично": "может определять тип автоматически"
      ,"тип можна вказати явно": "тип можно указать явно"
      ,"виконують різний код залежно від умови": "выполняют разный код в зависимости от условия"
      ,"повторюють команди": "повторяют команды"
      ,"створює власну команду": "создает собственную команду"
      ,"Параметри можна описувати через": "Параметры можно описывать через"
      ,"створює масив": "создает массив"
      ,"створює простий об’єкт з властивостями": "создает простой объект со свойствами"
      ,"читає файл": "читает файл"
      ,"записує новий вміст": "записывает новое содержимое"
      ,"додає текст у кінець": "добавляет текст в конец"
      ,"PowerShell-скрипти зберігаються у файлах": "PowerShell-скрипты хранятся в файлах"
      ,"Запускати локальний скрипт можна через": "Локальный скрипт можно запускать через"
      ,"містить ризиковану дію": "содержит рискованное действие"
      ,"реагує на помилку": "реагирует на ошибку"
      ,"Додавайте": "Добавляйте"
      ,"для прикладів": "для примеров"
      ,"Код можна писати в тегу": "Код можно писать в теге"
      ,"підключати окремий файл через": "подключать отдельный файл через"
      ,"JavaScript чутливий до регістру": "JavaScript чувствителен к регистру"
      ,"змінна": "переменная"
      ,"значення без повторного присвоєння": "значение без повторного присваивания"
      ,"старий спосіб оголошення": "старый способ объявления"
      ,"яблуко": "яблоко"
      ,"груша": "груша"
      ,"невірний JSON": "неверный JSON"
      ,"Добре": "Хорошо"
      ,"PHP-код пишеться всередині": "PHP-код пишется внутри"
      ,"Якщо файл містить тільки PHP, закривальний тег часто не пишуть": "Если файл содержит только PHP, закрывающий тег часто не пишут"
      ,"PHP підтримує": "PHP поддерживает"
      ,"виводять текст": "выводят текст"
      ,"частіше використовується для простого виводу": "чаще используется для простого вывода"
      ,"Змінні у PHP починаються зі знака": "Переменные в PHP начинаются со знака"
      ,"Тип часто визначається автоматично за значенням": "Тип часто определяется автоматически по значению"
      ,"дозволяють виконувати різний код": "позволяют выполнять разный код"
      ,"Цикли повторюють код": "Циклы повторяют код"
      ,"особливо зручний для масивів": "особенно удобен для массивов"
      ,"читає дані з URL": "читает данные из URL"
      ,"дані, відправлені формою методом POST": "данные, отправленные формой методом POST"
      ,"читає дані": "читает данные"
      ,"додає новий запис": "добавляет новую запись"
      ,"Для даних користувача краще використовувати prepared statements": "Для пользовательских данных лучше использовать prepared statements"
      ,"містить ризикований код": "содержит рискованный код"
      ,"обробляє помилку": "обрабатывает ошибку"
      ,"Функція": "Функция"
      ,"виводить текст або значення в консоль": "выводит текст или значение в консоль"
      ,"Рядок пишеться в лапках": "Строка пишется в кавычках"
      ,"Після": "После"
      ,"ставиться двокрапка": "ставится двоеточие"
      ,"Вираз без": "Выражение без"
      ,"може повертати значення": "может возвращать значение"
      ,"більше не можна використовувати": "больше нельзя использовать"
      ,"бо ownership перемістився": "потому что ownership переместился"
      ,"Таблиця схожа на електронну таблицю": "Таблица похожа на электронную таблицу"
      ,"має колонки, рядки і значення": "имеет колонки, строки и значения"
      ,"Наприклад, таблиця": "Например, таблица"
      ,"може мати": "может иметь"
      ,"вибирає колонку": "выбирает колонку"
      ,"змінює існуючі рядки": "изменяет существующие строки"
      ,"Майже завжди потрібен": "Почти всегда нужен"
      ,"щоб не змінити всю таблицю": "чтобы не изменить всю таблицу"
      ,"видаляє рядки": "удаляет строки"
      ,"може видалити всі дані з таблиці": "может удалить все данные из таблицы"
      ,"поєднують умови": "объединяют условия"
      ,"сортує результат": "сортирует результат"
      ,"означає за зростанням": "означает по возрастанию"
      ,"за спаданням": "по убыванию"
      ,"Коментарі такі самі, як у JavaScript": "Комментарии такие же, как в JavaScript"
      ,"для одного рядка": "для одной строки"
      ,"для кількох рядків": "для нескольких строк"
      ,"використовують для змінних, які можуть змінюватися": "используют для переменных, которые могут изменяться"
      ,"для значень, які не переприсвоюються": "для значений, которые не переприсваиваются"
      ,"Масиви типізують через": "Массивы типизируют через"
      ,"Об’єкти можна описувати прямо в типі": "Объекты можно описывать прямо в типе"
      ,"забороняє зміну поля після створення": "запрещает изменение поля после создания"
      ,"TypeScript додає модифікатори доступу": "TypeScript добавляет модификаторы доступа"
      ,"відкриває значення з файлу": "экспортирует значение из файла"
      ,"підключає його в іншому файлі": "импортирует его в другом файле"
    }
  };

  function translateFragments(value) {
    const fragments = fragmentMap[lang] || {};
    return Object.keys(fragments)
      .sort((a, b) => b.length - a.length)
      .reduce((text, source) => text.replaceAll(source, fragments[source]), value);
  }

  const substringCache = {};
  function translateKnownSubstrings(value) {
    const map = dict[lang] || {};
    if (!substringCache[lang]) {
      substringCache[lang] = Object.keys(map)
        .filter((key) => /[\u0400-\u04FF]/.test(key) && key.length > 3)
        .sort((a, b) => b.length - a.length);
    }

    return substringCache[lang].reduce((text, source) => {
      const translated = map[source];
      return translated ? text.replaceAll(source, translated) : text;
    }, value);
  }

  function translateValue(value) {
    if (lang === "uk" || !value) return value;
    const map = dict[lang] || {};
    const trimmed = value.trim();
    if (!trimmed) return value;

    if (/^Знайдено:/.test(trimmed)) {
      const replacements = {
        en: {
          "Знайдено:": "Found:",
          "регістрів": "registers",
          "інструкцій": "instructions",
          "команд": "commands",
          "тем": "topics",
          "прикладів": "examples",
          "записів довідника": "reference entries",
          "тегів": "tags",
          "атрибутів": "attributes",
          "селекторів": "selectors",
          "властивостей": "properties",
          "блоків": "blocks",
          "слів": "words"
        },
        ru: {
          "Знайдено:": "Найдено:",
          "регістрів": "регистров",
          "інструкцій": "инструкций",
          "команд": "команд",
          "тем": "тем",
          "прикладів": "примеров",
          "записів довідника": "записей справочника",
          "тегів": "тегов",
          "атрибутів": "атрибутов",
          "селекторів": "селекторов",
          "властивостей": "свойств",
          "блоків": "блоков",
          "слів": "слов"
        }
      };

      return Object.entries(replacements[lang] || {}).reduce(
        (text, [from, to]) => text.replaceAll(from, to),
        trimmed
      );
    }

    const translated = map[trimmed];
    if (!translated) return translateKnownSubstrings(translateFragments(value));
    return value.replace(trimmed, translated);
  }

  function shouldSkip(node) {
    const parent = node.parentElement;
    return !parent || parent.closest("script, style, textarea");
  }

  function translatePage() {
    if (lang === "uk") return;

    const titles = titleMap[lang] || {};
    if (titles[document.title]) document.title = titles[document.title];

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (!shouldSkip(node)) node.nodeValue = translateValue(node.nodeValue);
    });

    document.querySelectorAll("[placeholder], [aria-label], [title]").forEach((element) => {
      ["placeholder", "aria-label", "title"].forEach((attr) => {
        if (element.hasAttribute(attr)) {
          element.setAttribute(attr, translateValue(element.getAttribute(attr)));
        }
      });
    });
  }

  function updateLocalLinks() {
    document.querySelectorAll("a[href]").forEach((link) => {
      const raw = link.getAttribute("href");
      if (!raw || raw.startsWith("#") || raw.startsWith("http") || raw.startsWith("mailto:")) return;
      if (!raw.includes(".html")) return;

      const [pathAndQuery, hash = ""] = raw.split("#");
      const [path, query = ""] = pathAndQuery.split("?");
      const linkParams = new URLSearchParams(query);
      linkParams.set("lang", lang);
      link.setAttribute("href", `${path}?${linkParams.toString()}${hash ? "#" + hash : ""}`);
    });
  }

  function addLanguagePicker() {
    const header = document.querySelector(".header-inner");
    if (!header || document.querySelector(".language-picker")) return;

    const picker = document.createElement("div");
    picker.className = "language-picker";
    picker.setAttribute("aria-label", lang === "en" ? "Site language" : lang === "ru" ? "Язык сайта" : "Мова сайту");

    supported.forEach((code) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = labels[code];
      button.dataset.lang = code;
      button.className = code === lang ? "is-active" : "";
      button.addEventListener("click", () => {
        localStorage.setItem("siteLanguage", code);
        localStorage.setItem("siteLanguageChoiceVersion", "2");
        const nextParams = new URLSearchParams(window.location.search);
        nextParams.set("lang", code);
        window.location.search = nextParams.toString();
      });
      picker.appendChild(button);
    });

    header.appendChild(picker);
  }

  function addStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .language-picker {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
      }
      .language-picker button {
        min-height: 32px;
        padding: 5px 8px;
        border: 1px solid var(--border, #d9dde3);
        border-radius: 8px;
        background: var(--surface, #fff);
        color: var(--muted, #5f6670);
        font: inherit;
        font-size: 13px;
        cursor: pointer;
      }
      .language-picker button.is-active {
        background: var(--accent, #222);
        border-color: var(--accent, #222);
        color: #fff;
      }
      @media (max-width: 720px) {
        .language-picker {
          width: 100%;
        }
        .language-picker button {
          flex: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  addStyles();
  addLanguagePicker();
  updateLocalLinks();
  translatePage();

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateLocalLinks();
      translatePage();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
})();
