import { Helmet } from 'react-helmet';

function SEO() {
    return (
        <div>
            <Helmet>
                <title>Bilim Jarys</title>
                <meta property="og:title" content="Bilim Jarys" />
                <meta property="og:description" content="Онлайн платформа для призовых турниров по школьным предметам - Bilim Jarys." />
                <meta name="keywords" content="Bilim Jarys, турниры по школьным предметам, онлайн образование, призовые соревнования" />
                <meta property="og:image" itemprop="image" content="https://i.imgur.com/nDNowwr.png" />
                <meta property="og:type" content="website" />
                <meta property="og:image:width" content="300" />
                <meta property="og:image:height" content="300" />
                <meta property="og:url" content="https://bilimjarys.vercel.app/" />
            </Helmet>
        </div>
    );
}

export default SEO;
