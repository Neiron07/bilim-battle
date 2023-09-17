import React, { Component } from 'react';
import Faq from 'react-faq-component';
import { Trans } from 'react-i18next';

const data = {
    title: "FAQ",
    rows: [
        {
            title: <Trans i18nKey="Question1" />,
            content: <Trans i18nKey="Answer1" />
        },
        {
            title: <Trans i18nKey="Question2" />,
            content: <Trans i18nKey="Answer2" />
        },
        {
            title: <Trans i18nKey="Question3" />,
            content: <Trans i18nKey="Answer3" />
        },
        {
            title: <Trans i18nKey="Question4" />,
            content: <Trans i18nKey="Answer4" />
        },
        {
            title: <Trans i18nKey="Question5" />,
            content: <Trans i18nKey="Answer5" />
        },
        {
            title: <Trans i18nKey="Question6" />,
            content: <Trans i18nKey="Answer6" />
        },
        {
            title: <Trans i18nKey="Question7" />,
            content: <Trans i18nKey="Answer7" />
        },
        {
            title: <Trans i18nKey="Question8" />,
            content: <Trans i18nKey="Answer8" />
        },
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