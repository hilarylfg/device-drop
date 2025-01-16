import {Container, Filters, ProductList, TopBar} from "@/shared/components";
import React from "react";
import {prisma} from "@/prisma/prisma-client";


export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: true
        }
    });

    return (
      <>
          <Container>
              <h1>Все девайсы: <b className="accent__text">172</b> товара</h1>
          </Container>

          <TopBar items={categories} />

          <Container>
              <div className="catalog-block">
                  <Filters/>
                  <ProductList/>
              </div>
          </Container>
      </>
  );
}
