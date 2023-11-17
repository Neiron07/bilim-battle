import { useState } from "react";
import ProductCard from "../components/ProductCard"; // Создайте компонент ProductCard для отображения товаров
import { Trans } from 'react-i18next';
import { Carousel } from "react-responsive-carousel";
import Modal from "../components/Modal";

export default function Shop() {
    const [products, setProducts] = useState([
        {
            id: 0, // здесь меняешь id с возрастанием
            name: "Iphone 15 Pro Max",  // название товара
            price: 86000,  // цена 
            image: "https://fmobile.kz/_next/image?url=https%3A%2F%2Fapi.fmobile.kz%2Fimage%2F%2Fmedia%2Fsale%2Fimage%2F265306_1v%202022-09-26_11-29-42.062220%20c4b2bdde8e48a96c4a261614.jpg&w=828&q=100",
        },
        {
            id: 3,
            name: "Пауэрбэнк",
            price: 1890,
            image: "data:image/jpeg;base64,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",
        },
        {
            id: 6,
            name: "Подготовка к ЕНТ",
            price: 400,
            image: "data:image/jpeg;base64,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",
        },
        {
            id: 8, //
            name: "Мышка игровая проводная USB Logitech",  // название товара
            price: 1690,  // цена 
            image: `https://www.technodom.kz/_next/image?url=https%3A%2F%2Fapi.technodom.kz%2Ff3%2Fapi%2Fv1%2Fimages%2F800%2F800%2F219498_1.jpg&w=3840&q=85`
        },
        {
            id:9, //
            name: "Игровая клавиатура HyperX",  // название товара
            price:5290,  // цена 
            image: "https://itmag.kz/upload/iblock/24/03/product_image_73803_1194999.webp",
        },
        {
            id:10, //
            name: "Игровая гарнитура Bloody G521",  // название товара
            price:1790,  // цена 
            image: "https://object.pscloud.io/cms/cms/Photo/img_0_83_1814_1_1.jpg"
        },
        {
            id: 11, //
            name: "Наушники Apple AirPods",  // название товара
            price:7590,  // цена 
            image: "https://images.satu.kz/204942604_w640_h640_naushniki-air-pods.jpg",
        },
        {
            id: 12, //
            name: "Наушники Apple AirPods 3rd",  // название товара
            price: 13490,  // цена 
            image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTKq8jFi8ujjH6KcNf23LQRx4VcURMpvCgyRz8j07kI1Q1bSRA&usqp=CAc",
        },
        {
            id: 13, //
            name: "Ticket Cinema",  // название товара
            price:390,  // цена 
            image: "https://png.pngtree.com/png-clipart/20210929/ourlarge/pngtree-movie-ticket-retro-gold-effect-png-image_3955591.png",
        },
        {
            id: 14, //
            name: "Smart Watch Ultra Y16",  // название товара
            price:1390,  // цена 
            image: "https://maalgaari.shop/wp-content/uploads/2023/08/Beaitiful-Look-Ultra-Y16-Smart-Watch-With-4-Straps.webp",
        },
        // Добавьте другие товары сюда
    ]);
    const [cart, setCart] = useState([]); // Состояние корзины покупок

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((product) => product.id !== productId);
        setCart(updatedCart);
    };

    const handleCheckout = () => {
        const user = localStorage.getItem("id"); // Получите ID пользователя из localStorage (предполагается, что он уже сохранен там)
        if (!user) {
            // Если ID пользователя отсутствует в localStorage
            alert("Вы должны авторизоваться, чтобы оформить заказ.");
            return;
        }
    
        const selectedProducts = cart.map((product) => `${product.name} (${product.price}🌕)`).join(", "); // Формируем список выбранных товаров
    
        const message = `Мой id: ${user}\n\nХочу купить: ${selectedProducts}`;
    
        const whatsappURL = `https://api.whatsapp.com/send/?phone=77761788978&text=${encodeURIComponent(message)}`;
    
        window.location.href = whatsappURL;
    };    

    const totalCost = cart.reduce((total, product) => total + product.price, 0);

    return (
        <section style={{ paddingTop: 15, backgroundColor: '#eeeeee'}}>
            <div className="container">
            <Carousel showThumbs={false} autoPlay infiniteLoop dynamicHeight interval={6000} showArrows={false} showStatus={false} onClickItem={() => window.location.href = 'https://bilimjarys.kz/tournaments'}>
                        <div>
                            <img src='https://i.imgur.com/AKEwt9n.jpg' alt="banner-1" style={{ borderRadius: '20px' }} />
                        </div>
                    </Carousel>
                <div className="horizontal-line"></div>
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
                <h2>Корзина</h2>
                <div className="cart">
                    {cart.length === 0 ? (
                        <p>Ваша корзина пуста</p>
                    ) : (
                        <ul>
                            {cart.map((product) => (
                                <li key={product.id}>
                                    {product.name} - {product.price}🌕{" "}
                                    <button onClick={() => removeFromCart(product.id)}>
                                        Удалить
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p>Итоговая стоимость: {totalCost}🏵</p>
                    <div className="horizontal-line"></div>
                    <button onClick={handleCheckout}>Оформить заказ</button>
                </div>
            </div>
        </section>
    );
}
