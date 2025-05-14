import {ProductGroupList} from "@/shared/components";
import {ProductGroupListSkeleton} from "./product-group-list";
import {CategoriesWithAllRelations} from "@/@types/prisma";
import {PackageX} from "lucide-react";

export function ProductList({categories, isLoading}: {
    categories: CategoriesWithAllRelations[];
    isLoading: boolean
}) {
    if (isLoading) {
        return (
            <div className="catalog-block__list">
                <ProductGroupListSkeleton/>
                <ProductGroupListSkeleton/>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="catalog-block__list__not-found">
                <PackageX size={150}/>
                <h1 className="">Товары не найдены</h1>
                <p className="">Попробуйте изменить параметры фильтрации</p>
            </div>
        );
    }

    return (
        <div className="catalog-block__list">
            {categories.map((category: CategoriesWithAllRelations) =>
                category.products.length > 0 && (
                    <ProductGroupList
                        key={category.id}
                        title={category.name}
                        categoryLink={category.link}
                        categoryId={category.id}
                        products={category.products}
                    />
                ))}
        </div>
    )
}