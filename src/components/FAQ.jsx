import React, { Component } from 'react';
import Faq from 'react-faq-component';

const data = {
    title: "FAQ",
    rows: [
        {
            title: "Как зарегистрироваться на онлайн-олимпиады?",
            content: "Ответ: Чтобы зарегистрироваться на онлайн-олимпиады, необходимо перейти на сайт, выбрать нужный предмет и нажать на кнопку 'Зарегистрироваться'. После этого нужно заполнить регистрационную форму и следовать инструкциям на сайте."
        },
        {
            title: "Что это 🟡?",
            content: "Ответ: Это внутренняя валюта платформы - Jarys Coin. Ею вы можете расплачиваться на сайте, обменивать на деньги или приобретать ценные товары. Но о ней мы еще скоро подробно расскажем =)"
        },
        {
            title: "Какие предметы доступны для онлайн-олимпиад?",
            content: "Ответ: На сайте проводятся олимпиады по различным школьным предметам, включая математику, русский язык, английский язык, физику, химию, биологию, географию, казахский язык, информатику и историю."
        },
        {
            title: "Какой уровень сложности олимпиад?",
            content: "Ответ: Олимпиады проводятся на разных уровнях сложности, в зависимости от возраста и класса учеников. На сайте вы можете выбрать олимпиады для разных возрастных групп и классов."
        },
        {
            title: "Как проходят онлайн-олимпиады?",
            content: "Ответ: Онлайн-олимпиады проводятся в режиме реального времени в виде теста на платформе под названием Google forms. Участники получают доступ к заданиям в течение определенного времени, после чего должны предоставить ответы на задания."
        },
        {
            title: "Каков формат заданий?",
            content: "Ответ: Формат заданий может быть различным в зависимости от предмета и уровня сложности. Задания могут быть тестовыми или задачными, могут содержать различные типы заданий, такие как выбор одного или нескольких ответов, соответствие, развернутые ответы и др."
        },
        {
            title: "Как проверяются результаты участников?",
            content: "Ответ: Результаты участников проверяются автоматически после окончания времени, отведенного на выполнение заданий. В случае, если задание необходимо проверить вручную, это будет указано в инструкции на сайте."
        },
        {
            title: "Какова стоимость участия в онлайн-олимпиадах?",
            content: "Ответ: Стоимость участия может быть различной в зависимости от конкретной олимпиады и уровня сложности."
        }
    ]
};

const styles = {
    //bgColor: 'white',
    titleTextColor: "#0148BF",
    rowTitleColor: "#0148BF",
    rowContentColor: 'grey',
    rowContentTextSize: '17px',
    rowContentPaddingBottom: '15px',
    //arrowColor: "red",
    rowContentPaddingTop: '15px',
};

const config = {
    animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};
export default class App extends Component {
    render() {
        return (
            <div>
                <Faq data={data} styles={styles} config={config} />
            </div>
        )
    }
}