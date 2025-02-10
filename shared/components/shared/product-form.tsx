import {ProductWithAllRelations} from "@/@types/prisma";

interface ProductFormProps {
    product: ProductWithAllRelations
}

export function ProductForm({product}: ProductFormProps) {
    return (
        <div className="product-page">
            <p>
                <a className="product-page__link" href="/">Главная</a> /{" "}
                <a className="product-page__link" href={`/?section=${product.category.link}`}>{product.category.name}</a>
            </p>
            <div>
                <h1 className="product-page__title">{product.name}</h1>
                <div className="product-page__image">
                    <img src={`/products/${product.variants[0].imageUrl}`} alt={product.name}/>
                </div>
            </div>
        </div>
    )
}