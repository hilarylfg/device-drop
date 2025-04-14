import {Container} from "@/shared/components";
import Image from "next/image";
import React from "react";
import {ChartColumnIncreasing, Gamepad2, Lightbulb, Smile} from "lucide-react";

export default function Work() {
    return (
        <main className="work-page">
            <Image className="work-page__image" src="/efectio-team-building-games.jpg" alt="" width={900} height={473}/>
            <Container>
                <p className="work-page__link-span">
                    <a className="work-page__link" href="/public">
                        Главная
                    </a>
                    {" "}/{" "}
                    <span className="work-page__link__current">
                        Работа в DeviceDrop
                    </span>
                </p>
                <article className="work-page__article">
                    <h1>Работа в DeviceDrop</h1>
                    <h3>Стань частью нашей команды!</h3>
                    <p>DeviceDrop — это не просто интернет-магазин игровых девайсов. Это место, где страсть к геймингу
                        сочетается с инновациями и желанием дать игрокам по всему миру лучшее оборудование для их побед.
                        Мы
                        ищем
                        тех, кто разделяет нашу любовь к технологиям и готов вместе с нами менять правила игры.</p>
                </article>
                <section className="work-page__section">
                    <h1>Почему именно мы?</h1>
                    <div className="work-page__list">
                        <div className="work-page__list__item">
                            <h2 className="work-page__list__item__title"><Gamepad2 /> Мы живём геймингом.</h2>
                            <p>Наша команда — это комьюнити энтузиастов, которые знают, что такое идеальный хедшот и как
                                важен отклик мышки в решающий момент.</p>
                        </div>
                        <div className="work-page__list__item">
                            <h2 className="work-page__list__item__title"><ChartColumnIncreasing /> Рост и развитие.</h2>
                            <p>Мы поддерживаем обучение, участие в выставках и тестирование новинок — от девайсов до
                                софта.</p>
                        </div>
                        <div className="work-page__list__item">
                            <h2 className="work-page__list__item__title"><Lightbulb /> Свобода и креативность.</h2>
                            <p>У нас нет строгих рамок — мы ценим инициативу и свежие идеи.</p>
                        </div>
                        <div className="work-page__list__item">
                            <h2 className="work-page__list__item__title"><Smile /> Команда мечты.</h2>
                            <p>Дружелюбная атмосфера, совместные турниры и никакого микроменеджмента.</p>
                        </div>
                    </div>
                </section>
                {/*<section className="work-page__section">*/}
                {/*    <h1>Что мы предлагаем?</h1>*/}
                {/*</section>*/}
                {/*<MultiStepJobForm/>*/}
            </Container>
        </main>
    );
}