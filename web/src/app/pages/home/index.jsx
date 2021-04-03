import React from "react";
import { useSession } from "@Context";
import { Card } from "@Components";
import {
  faExclamationTriangle,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const moduleData = {
  REPORTS: {
    title: "Denúncias",
    description: "Clique aqui para ver as denúncias vinculadas a sua empresa",
    icon: faExclamationTriangle,
    href: "reports",
  },
  TRAINING_MODULES: {
    title: "Treinamentos",
    description: "Clique aqui para ver os treinamentos disponíveis",
    icon: faAward,
    href: "improvements",
  },
};

export default function Home() {
  const { user } = useSession();
  return (
    <main id="profile-page">
      <h2 className="page-title">Selecione um dos módulos abaixo</h2>
      {user?.features.length && (
        <div className="card-list">
          {user.features.map((feature, index) => (
            <>
              <Card key={index} {...moduleData[feature]} />
            </>
          ))}
        </div>
      )}
    </main>
  );
}
