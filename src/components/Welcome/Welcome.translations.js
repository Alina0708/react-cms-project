export const translations = {
  ru: {
    tag: 'Виртуальная лабораторная работа',
    title: 'Внутренняя энергия и работа электрического тока',
    subtitle:
      'Изучите тепловое действие электрического тока на практике — без реального оборудования. Разберите теорию, познакомьтесь с устройством лабораторной установки и проведите измерения в интерактивном симуляторе.',
    primaryButton: 'Запустить симулятор',
    secondaryButton: 'Перейти к теории',
    figureAlt: 'Лабораторная установка',
    figureNumber: 'Рис. 01',
    figureCaption: 'Установка',
    channelsLabel: 'Порядок работы',
    channels: [
      {
        code: 'CH.01',
        title: 'Теория',
        text: 'Формулы, закон Джоуля-Ленца и база знаний с ответами на вопросы по внутренней энергии и работе электрического тока.',
        to: '/theory',
        cta: 'Изучить теорию',
      },
      {
        code: 'CH.02',
        title: 'Структура',
        text: 'Подробное описание лабораторной установки: источник питания, мультиметр, секундомер и образцы проводников.',
        to: '/structure',
        cta: 'Посмотреть установку',
      },
      {
        code: 'CH.03',
        title: 'Симулятор',
        text: 'Пошаговая интерактивная симуляция запуска установки, задания напряжения и тока и записи результатов измерений.',
        to: '/simulator',
        cta: 'Запустить симулятор',
      },
    ],
  },
  en: {
    tag: 'Virtual lab work',
    title: 'Internal Energy and the Work of Electric Current',
    subtitle:
      'Explore the heating effect of electric current in practice — without real equipment. Work through the theory, get to know the lab setup, and take measurements in an interactive simulator.',
    primaryButton: 'Launch the simulator',
    secondaryButton: 'Go to the theory',
    figureAlt: 'Lab setup',
    figureNumber: 'Fig. 01',
    figureCaption: 'Setup',
    channelsLabel: 'Order of work',
    channels: [
      {
        code: 'CH.01',
        title: 'Theory',
        text: 'Formulas, the Joule-Lenz law, and a knowledge base answering questions about internal energy and the work of electric current.',
        to: '/theory',
        cta: 'Study the theory',
      },
      {
        code: 'CH.02',
        title: 'Structure',
        text: 'A detailed description of the lab setup: power supply, multimeter, stopwatch, and conductor samples.',
        to: '/structure',
        cta: 'View the setup',
      },
      {
        code: 'CH.03',
        title: 'Simulator',
        text: 'A step-by-step interactive simulation of starting the setup, setting voltage and current, and recording measurement results.',
        to: '/simulator',
        cta: 'Launch the simulator',
      },
    ],
  },
};
