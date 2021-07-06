import React from "react";
import {useSession} from "@Context";
import {Card} from "@Components";
import {faAward} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const modules = [
    {
        title: "Módulo 1",
        description: "Conceitos/objetivos",
        icon: faAward,
        href: "reports",
    },
    {
        title: "Módulo 2",
        description: "Pilares",
        icon: faAward,
        href: "reports",
    },
    {
        title: "Módulo 3",
        description: "Diagnóstico",
        icon: faAward,
        href: "reports",
    },
    {
        title: "Módulo 4",
        description: "Customizações",
        icon: faAward,
        href: "reports",
    },
    {
        title: "Módulo 5",
        description: "Matriz de risco/responsabilidade",
        icon: faAward,
        href: "reports",
    },
    {
        title: "Módulo 6",
        description: "Canal de denúncias",
        icon: faAward,
        href: "reports",
    },
    {
        title: "Módulo 7",
        description: "Prognóstico",
        icon: faAward,
        href: "reports",
    },
    {
        title: "Módulo 8",
        description: "Comunicação",
        icon: faAward,
        href: "reports",
    },
    {
        title: "Módulo 9",
        description: "Treinamentos",
        icon: faAward,
        href: "reports",
    },
    {
        title: "Módulo 10",
        description: "Teste/reteste",
        icon: faAward,
        href: "reports",
    }
];

export default function Home() {
    const {user} = useSession();
    return (
        <main id="profile-page">
            <h2 className="page-title">Selecione um dos módulos abaixo: </h2>
            <div className="card-list">
                <Card key={0} {...modules[0]} />
                <Card key={1} {...modules[1]} />
                <Card key={2} {...modules[2]} />
                <Card key={3} {...modules[3]} />
                <Card key={4} {...modules[4]} />
                <Card key={5} {...modules[5]} />
                <Card key={6} {...modules[6]} />
                <Card key={7} {...modules[7]} />
                <Card key={8} {...modules[8]} />
                <Card key={9} {...modules[9]} />
            </div>
        </main>
    );
}
