import {ukrainianLessons} from './curriculum-uk.mjs';
export const levels=['beginner','intermediate','professional'];
export const levelUi={
  uk:{level:'Рівень навчання',allLevels:'Усі рівні',beginner:'Початковий',intermediate:'Середній',professional:'Професійний',
    hero:'Програмування: від основ до складних рішень',about:'Programming Lessons — навчальні довідники й практика для новачків, розробників із досвідом і професіоналів. Обирай рівень, вивчай приклади та перевіряй рішення на реальних крайових випадках.',
    beginnerPlan:'Почни із синтаксису та базових конструкцій. Прочитай розділ, зміни приклад і виконай коротку задачу.',
    intermediatePlan:'Поєднуй конструкції у функції та компоненти. Опрацьовуй помилки, контракти даних і повторне використання коду.',
    professionalPlan:'Розбирай конкурентність, обмеження ресурсів і надійність. Перевіряй крайові випадки, обґрунтовуй компроміси й аналізуй відмови.',
    prerequisites:'Передумови',environment:'Середовище',pitfall:'На що звернути увагу',assignment:'Практичне завдання',criteria:'Критерії перевірки',workedExample:'Розібраний приклад',
    levelHelp:'Рівень змінює видимі матеріали, результати пошуку й практику. «Усі рівні» показує повний довідник.',
    review:'Відкрити критерії перевірки',reviewResult:'Виконай перевірки нижче у своєму середовищі. Цей сайт не запускає код і не підтверджує проходження цих тестів.',
    reviewIntro:'Реалізуй задачу, перевір результат за наведеними критеріями та порівняй підхід із прикладом.',
    openLevel:'Відкрити матеріали',levelResults:'Матеріалів на цьому рівні',levelPractice:'Рівень практики',chooseGuide:'Обери довідник нижче; рівень збережеться при переході.'},
  en:{level:'Learning level',allLevels:'All levels',beginner:'Beginner',intermediate:'Intermediate',professional:'Professional',
    hero:'Programming: from fundamentals to complex solutions',about:'Programming Lessons offers guides and practice for beginners, experienced developers and professionals. Choose your level, explore examples and test solutions against real edge cases.',
    beginnerPlan:'Start with syntax and fundamental constructs. Read a section, modify an example and complete a short exercise.',
    intermediatePlan:'Combine constructs into functions and components. Work with errors, data contracts and reusable code.',
    professionalPlan:'Explore concurrency, resource limits and reliability. Test edge cases, justify tradeoffs and analyze failures.',
    prerequisites:'Prerequisites',environment:'Environment',pitfall:'What to watch for',assignment:'Practice assignment',criteria:'Acceptance criteria',workedExample:'Worked example',
    levelHelp:'The level filters lesson content, search results and practice. All levels shows the complete guide.',
    review:'Show acceptance criteria',reviewResult:'Run the checks below in your own environment. This site does not execute your code or certify that these tests passed.',
    reviewIntro:'Implement the task, check the acceptance criteria and compare your approach with the worked example.',
    openLevel:'Open materials',levelResults:'Materials at this level',levelPractice:'Practice level',chooseGuide:'Choose a guide below; your level is preserved when navigating.'},
  ru:{level:'Уровень обучения',allLevels:'Все уровни',beginner:'Начальный',intermediate:'Средний',professional:'Профессиональный',
    hero:'Программирование: от основ к сложным решениям',about:'Programming Lessons — справочники и практика для новичков, опытных разработчиков и профессионалов. Выбирай уровень, изучай примеры и проверяй решения на реальных граничных случаях.',
    beginnerPlan:'Начни с синтаксиса и базовых конструкций. Прочитай раздел, измени пример и выполни короткую задачу.',
    intermediatePlan:'Объединяй конструкции в функции и компоненты. Работай с ошибками, контрактами данных и повторным использованием кода.',
    professionalPlan:'Изучай конкурентность, ограничения ресурсов и надёжность. Проверяй граничные случаи, обосновывай компромиссы и анализируй отказы.',
    prerequisites:'Предварительные знания',environment:'Среда',pitfall:'На что обратить внимание',assignment:'Практическое задание',criteria:'Критерии проверки',workedExample:'Разобранный пример',
    levelHelp:'Уровень меняет видимые материалы, результаты поиска и практику. «Все уровни» показывает полный справочник.',
    review:'Открыть критерии проверки',reviewResult:'Выполни проверки ниже в своей среде. Сайт не запускает код и не подтверждает прохождение этих тестов.',
    reviewIntro:'Реализуй задачу, проверь результат по критериям и сравни подход с примером.',
    openLevel:'Открыть материалы',levelResults:'Материалов на этом уровне',levelPractice:'Уровень практики',chooseGuide:'Выбери справочник ниже; уровень сохранится при переходе.'},
  id:{level:'Tingkat belajar',allLevels:'Semua tingkat',beginner:'Pemula',intermediate:'Menengah',professional:'Profesional',
    hero:'Pemrograman: dari dasar hingga solusi kompleks',about:'Programming Lessons menyediakan panduan dan latihan untuk pemula, pengembang berpengalaman dan profesional. Pilih tingkat, pelajari contoh dan uji solusi dengan kasus batas nyata.',
    beginnerPlan:'Mulai dengan sintaks dan konstruksi dasar. Baca bagian, ubah contoh dan selesaikan latihan singkat.',
    intermediatePlan:'Gabungkan konstruksi menjadi fungsi dan komponen. Pelajari penanganan kesalahan, kontrak data dan penggunaan ulang kode.',
    professionalPlan:'Pelajari konkurensi, batas sumber daya dan keandalan. Uji kasus batas, jelaskan kompromi dan analisis kegagalan.',
    prerequisites:'Prasyarat',environment:'Lingkungan',pitfall:'Hal yang perlu diperhatikan',assignment:'Tugas praktik',criteria:'Kriteria penerimaan',workedExample:'Contoh pembahasan',
    levelHelp:'Tingkat memfilter materi, hasil pencarian dan latihan. Semua tingkat menampilkan panduan lengkap.',
    review:'Tampilkan kriteria penerimaan',reviewResult:'Jalankan pemeriksaan berikut di lingkungan Anda. Situs ini tidak menjalankan kode atau memastikan bahwa pengujian lulus.',
    reviewIntro:'Kerjakan tugas, periksa kriteria penerimaan dan bandingkan pendekatan Anda dengan contoh.',
    openLevel:'Buka materi',levelResults:'Materi pada tingkat ini',levelPractice:'Tingkat latihan',chooseGuide:'Pilih panduan di bawah; tingkat dipertahankan saat berpindah halaman.'},
  ja:{level:'学習レベル',allLevels:'すべてのレベル',beginner:'初級',intermediate:'中級',professional:'プロ向け',
    hero:'プログラミング：基礎から複雑な問題の解決まで',about:'Programming Lessonsは、初心者、経験のある開発者、プロ向けのガイドと練習問題を提供します。レベルを選び、コード例を学び、実際の境界条件で解決策を検証できます。',
    beginnerPlan:'構文と基本的な構造から始めます。解説を読み、例を変更し、短い練習問題に取り組みましょう。',
    intermediatePlan:'構造を組み合わせて関数やコンポーネントを作ります。エラー処理、データ契約、コードの再利用を学びます。',
    professionalPlan:'並行処理、リソース制限、信頼性を学びます。境界条件をテストし、トレードオフを説明し、障害を分析します。',
    prerequisites:'前提知識',environment:'実行環境',pitfall:'注意点',assignment:'実践課題',criteria:'受け入れ基準',workedExample:'解説付きの例',
    levelHelp:'レベルに応じて教材、検索結果、練習問題を絞り込みます。「すべてのレベル」ではガイド全体を表示します。',
    review:'受け入れ基準を表示',reviewResult:'以下の確認を自分の環境で実行してください。このサイトはコードを実行せず、テストの合格を認定しません。',
    reviewIntro:'課題を実装し、受け入れ基準を確認して、例と自分の方法を比較してください。',
    openLevel:'教材を開く',levelResults:'このレベルの教材数',levelPractice:'練習レベル',chooseGuide:'下からガイドを選んでください。移動後もレベルが維持されます。'}
};

export function localizedLessons(page,lang,curriculum,translations) {
  return (curriculum[page] || []).map(lesson=>{
    const translate=value=>{
      if(Array.isArray(value))return value.map(translate);
      if(lang==='en')return value;
      const result=translations[lang]?.[value];
      if(!result)throw new Error(`Missing curriculum translation: ${lang}/${page}/${lesson.id}: ${value}`);
      return result;
    };
    const text=Object.fromEntries(Object.entries(lesson.text).map(([key,value])=>[key,translate(value)]));
    if(lang==='uk')Object.assign(text,ukrainianLessons[lesson.id]);
    return {...lesson,text};
  });
}
