import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getTrainning } from "@Services";
import "./style.scss";

function TrainningItem({ label, value }) {
  return (
    <p className="trainning-details-item">
      <strong>{label}: </strong>
      {value}
    </p>
  );
}

export default function TrainingDetails({ match }) {
  const [trainning, setTrainning] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = match.params;
  const history = useHistory();
  useEffect(() => {
    const fetchTrainning = async () => {
      try {
        setLoading(true);
        const { data: trainningResponse } = await getTrainning(id);
        console.log(trainningResponse);
        setTrainning(trainningResponse);
        setLoading(false);
      } catch (error) {
        history.replace("/");
      }
    };

    fetchTrainning();
  }, []);

  return loading || !trainning ? (
    <h1>Carregando...</h1>
  ) : (
    <main id="trainning-details-page">
      <h2>Detalhes do treinamento</h2>
      <section>
        <TrainningItem label="Denunciante" value={trainning?.author} />
        <TrainningItem label="Denunciado" value={trainning?.companyName} />
        <TrainningItem label="Local" value={trainning?.local} />
        <TrainningItem label="Categoria" value={trainning?.category} />
        <TrainningItem label="Descrição do ocorrido" value={trainning?.description} />
      </section>
    </main>
  );
}