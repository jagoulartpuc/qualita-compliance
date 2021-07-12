import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getTrainning } from "@Services";
import "./style.scss";

function TrainningItem({ label, value }) {
  return (
    <div>
      {label ? (<p><strong>{label}</strong></p>) : ''}

      <p>{value}</p>
    </div>
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
  const getComments = () => {
    return Object.keys(trainning?.comments).map(key => {
      const commentBase = trainning?.comments[key].find(comment => comment.id === key);

      const subComments = trainning?.comments[key].map(comment => {
        if (comment.id !== key) {
          return (
            <div className='comment-reply'>
              <p><strong>{comment.name}:</strong> {comment.comment}</p>
            </div>
          );
        }
      });

      return (
        <div className='comment'>
          <p><strong>{commentBase.name}:</strong> {commentBase.comment}</p>
          {subComments}
        </div>
      );
    });
  };

  return loading || !trainning ? (
    <h1>Carregando...</h1>
  ) : (
    <main>
      <div className='trainnning-content'>
        <section id='trainning-title'>
          <TrainningItem value={trainning?.title} />
        </section>
        <br />
        <section>
          <YoutubeEmbed videoLink={parseYouTubeUrlToEmbedded()} />
        </section>
        <br />
        <section id='trainning-description'>
          <TrainningItem label='Descrição:' value={trainning?.description} />
        </section>
        <br />
        <section>
          <TrainningItem label='Comentários:' value={getComments()} />
        </section>
        <br />
      </div>
    </main>
  );
}
