    "use client";

    import {ProductGroupList} from "@/shared/components";
    import {useEffect, useState} from "react";
    import {Api} from "@/shared/services/api-client";
    import {CategoriesWithAllRelations} from "@/@types/prisma";
    import {ProductGroupListSkeleton} from "./product-group-list";

    export function ProductList() {
        const [products, setProducts] = useState<CategoriesWithAllRelations[]>([]);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            (async () => {
                try {
                    setIsLoading(true);
                    const response = await Api.categories.withProducts();
                    setProducts(response);
                } catch (e) {
                    console.error("Error: ", e);
                } finally {
                    setIsLoading(false);
                }
            })();
        }, []);

        return (
            <div className="catalog-block__list">
                {isLoading ? <ProductGroupListSkeleton/> : products.map((product) =>
                    product.products.length > 0 && (
                            <ProductGroupList
                                key={product.id}
                                title={product.name}
                                categoryLink={product.link}
                                categoryId={product.id}
                                products={product.products}
                            />
                        ),
                )}
            </div>
        )
    }