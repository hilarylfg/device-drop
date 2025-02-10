import {ProductWithAllRelations} from "@/@types/prisma";
import {cn} from "@/shared/lib/utils";
import {Button} from "@/shared/components";
import {PackagePlus} from "lucide-react";

interface ProductFormProps {
    product: ProductWithAllRelations
}

export function ProductForm({product}: ProductFormProps) {
    return (
        <div className="product-page">
            <p>
                <a className="product-page__link" href="/">Главная</a> /{" "}
                <a className="product-page__link"
                   href={`/?section=${product.category.link}`}>{product.category.name}</a>
            </p>
            <div className="product-page__info">
                <div className="product-page__image">
                    <img src={`/products/${product.variants[0].imageUrl}`} alt={product.name}/>
                </div>
                <div className="product-page__description">
                    <h1 className="product-page__description__title">{product.name}</h1>
                    <h3 className="product-page__description__color">Цвет: {product.variants[0].color}</h3>
                    <div className="product-page__description__colors">
                        {product.variants.map((variant) => (
                            <div key={variant.id}
                                 className={cn("color", variant.color.endsWith('White') ? 'color__white' : '')}
                                 style={{backgroundColor: variant.color}}>

                            </div>
                        ))}
                    </div>
                    <p className="product-page__description__text">{product.description}</p>
                </div>
                <div className="product-page__price">
                    <h2 className="product-page__price__title">{product.variants[0].price.toLocaleString("ru-RU") + " ₽"}</h2>
                    <p className={cn("product-page__price__stock", !product.variants[0].stock && "product-page__price__stock--red")}>{product.variants[0].stock ? "В наличии" : "Нет" +
                        " в наличии"}</p>
                    <Button className="product-page__price__button"><PackagePlus/>Добавить</Button>
                </div>
            </div>
        </div>
    )
}