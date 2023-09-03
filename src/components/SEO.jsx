import { Helmet } from 'react-helmet';

function SEO() {
    return (
        <div>
            <Helmet>
                <title>Bilim Jarys</title>
                <meta property="og:title" content="Bilim Jarys" />
                <meta property="og:description" content="Онлайн платформа для призовых турниров по школьным предметам - Bilim Jarys." />
                <meta name="keywords" content="Bilim Jarys, турниры по школьным предметам, онлайн образование, призовые соревнования" />
                <meta property="og:image" itemprop="image" content="https://imgur.com/cHmqJY1.png" />
            </Helmet>
        </div>
    );
}

export default SEO;
