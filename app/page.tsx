import {Container, Filters, ProductList, TopBar} from "@/shared/components";
import React from "react";
import {prisma} from "@/prisma/prisma-client";

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    variants: true,
                },
            },
        },
    });

    return (
        <>
            <Container>
                <h1>Все девайсы: <b
                    className="accent__text">{categories.reduce((total, category) => total + category.products.length, 0)}</b> товара
                </h1>
            </Container>

            <TopBar items={categories}/>

            <Container>
                <div className="catalog-block">
                    <Filters/>
                    <div className="catalog-block__list">
                        {categories.map(
                            (category) =>
                                category.products.length > 0 && (
                                    <ProductList
                                        key={category.id}
                                        title={category.name}
                                        categoryId={category.id}
                                        products={category.products}
                                    />
                                ),
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
}
