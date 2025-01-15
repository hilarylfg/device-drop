import {Container, Filters, ProductList, TopBar} from "@/shared/components";
import React from "react";


export default function Home() {
  return (
      <>
          <Container>
              <h1>Все девайсы: <b className="accent__text">172</b> товара</h1>
          </Container>

          <TopBar/>

          <Container>
              <div className="catalog-block">
                  <Filters/>
                  <ProductList/>
              </div>
          </Container>
      </>
  );
}
