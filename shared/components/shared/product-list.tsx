    "use client";

    import {ProductGroupList} from "@/shared/components";
    import {useEffect, useState} from "react";
    import {Api} from "@/shared/services/api-client";
    import {CategoriesWithAllRelations} from "@/@types/prisma";
    import {ProductGroupListSkeleton} from "./product-group-list";

    export function ProductList() {
        const [categories, setCategories] = useState<CategoriesWithAllRelations[]>([]);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            (async () => {
                try {
                    setIsLoading(true);
                    const response = await Api.categories.withProducts();
                    setCategories(response);
                } catch (e) {
                    console.error("Error: ", e);
                } finally {
                    setIsLoading(false);
                }
            })();
        }, []);

        return (
            <div className="catalog-block__list">
                {isLoading ? <ProductGroupListSkeleton/> : categories.map((category) =>
                        category.products.length > 0 && (
                            <ProductGroupList
                                key={category.id}
                                title={category.name}
                                categoryLink={category.link}
                                categoryId={category.id}
                                products={category.products}
                            />
                        ),
                )}
            </div>
        )
    }