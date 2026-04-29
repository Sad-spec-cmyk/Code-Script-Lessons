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
  const lang = supported.includes(requested) ? requested : supported.includes(saved) ? saved : "uk";

  localStorage.setItem("siteLanguage", lang);
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
      "Rust Lessons / Rust Довідник": "Rust Lessons / Rust Guide",
      "Assembler Lessons / Assembly Довідник": "Assembler Lessons / Assembly Guide",
      "C Lessons / C Довідник": "C Lessons / C Guide",
      "SQL Lessons / SQL Довідник": "SQL Lessons / SQL Guide",
      "TypeScript Lessons / TypeScript Довідник": "TypeScript Lessons / TypeScript Guide",
      "PHP Lessons / PHP Довідник": "PHP Lessons / PHP Guide",
      "PowerShell Lessons / PowerShell Довідник": "PowerShell Lessons / PowerShell Guide"
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
      "Rust Lessons / Rust Довідник": "Rust Lessons / Rust Справочник",
      "Assembler Lessons / Assembly Довідник": "Assembler Lessons / Assembly Справочник",
      "C Lessons / C Довідник": "C Lessons / C Справочник",
      "SQL Lessons / SQL Довідник": "SQL Lessons / SQL Справочник",
      "TypeScript Lessons / TypeScript Довідник": "TypeScript Lessons / TypeScript Справочник",
      "PHP Lessons / PHP Довідник": "PHP Lessons / PHP Справочник",
      "PowerShell Lessons / PowerShell Довідник": "PowerShell Lessons / PowerShell Справочник"
    }
  };

  function translateValue(value) {
    if (lang === "uk" || !value) return value;
    const map = dict[lang] || {};
    const trimmed = value.trim();
    if (!trimmed) return value;

    if (/^Знайдено:/.test(trimmed)) {
      return lang === "en"
        ? trimmed.replace("Знайдено:", "Found:")
            .replace("тем", "topics")
            .replace("записів довідника", "reference entries")
            .replace("тегів", "tags")
            .replace("атрибутів", "attributes")
            .replace("селекторів", "selectors")
            .replace("властивостей", "properties")
            .replace("блоків", "blocks")
        : trimmed.replace("Знайдено:", "Найдено:")
            .replace("тем", "тем")
            .replace("записів довідника", "записей справочника")
            .replace("тегів", "тегов")
            .replace("атрибутів", "атрибутов")
            .replace("селекторів", "селекторов")
            .replace("властивостей", "свойств")
            .replace("блоків", "блоков");
    }

    const translated = map[trimmed];
    if (!translated) return value;
    return value.replace(trimmed, translated);
  }

  function shouldSkip(node) {
    const parent = node.parentElement;
    return !parent || parent.closest("pre, code, script, style, textarea");
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
