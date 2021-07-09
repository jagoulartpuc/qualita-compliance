import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getTrainning } from "@Services";
import "./style.scss";

function TrainningItem({ label, value }) {
  return (
    <p><strong>{label}</strong> {value}</p>
  );
}

export default function TrainningModuleDetailPage({ match }) {
  const [trainning, setTrainning] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = match.params;

  const history = useHistory();
  useEffect(() => {
    const fetchTrainning = async () => {
      try {
        setLoading(true);
        const { data: trainningResponse } = await getTrainning(id);
        setTrainning(trainningResponse);
        setLoading(false);
      } catch (error) {
        history.replace("/");
      }
    };

    fetchTrainning();
  }, []);
  const YoutubeEmbed = ({ videoLink }) => (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={videoLink}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );

  const parseYouTubeUrlToEmbedded = () => trainning?.videoLink?.replace('watch?v=', 'embed/');

  return loading || !trainning ? (
    <h1>Carregando...</h1>
  ) : (
    <main>
      <div className='trainnning-content'>
        <h2>Detalhes do treinamento</h2>
        <section>
          <TrainningItem value={trainning?.title} />
        </section>
        <br />
        <section>
          <YoutubeEmbed videoLink={parseYouTubeUrlToEmbedded()} />
        </section>
        <br />
        <section>
          <TrainningItem label='Descrição:' value={trainning?.description} />
        </section>
        <br />
        <section>
          <TrainningItem label='Comentários:' value={`${trainning?.comments}`} />
        </section>
        <br />
      </div>
    </main>
  );
}
