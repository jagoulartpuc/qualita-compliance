import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getTrainning, repplyComment, addNewComment } from "@Services";
import "./style.scss";
import GenericPdfImage from '@Images/generic-pdf.png';
import GenericImage from '@Images/generic-image.png';
import { Component } from "react";


function TrainningItem({ value }) {
  return (
    <p>{value}</p>
  );
}

function NewComment({ type, sendCommentFunction, cancelCommentFunction }) {
  const getCommentContent = (e) => {
    const id = type === 'subcomment' ? `comment-${type}` : 'comment';
    const commentContent = document.getElementById(id).value;

    sendCommentFunction(commentContent, type);
  };

  return (
    <div className='new-comment'>
      <textarea id={`comment${type === 'subcomment' ? '-' + type : ''}`}></textarea>
      <a onClick={getCommentContent}>Enviar</a>
      {type === 'subcomment' ? <a onClick={cancelCommentFunction}>Cancelar</a> : null}
    </div>
  );
}

function YoutubeEmbed({ videoLink }) {
  return (<div className="video-responsive">
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
}

export default class TrainningModuleDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      trainning: null,
      loading: false,
      activeReply: ''
    }

  }

  componentDidMount() {
    this.fetchTrainning();
  }

  fetchTrainning = async () => {
    try {
      this.setState({ loading: true });
      const id = this.props.match.params.id;
      const { data: trainningResponse } = await getTrainning(id);
      this.setState({ loading: false });
      this.setState({ trainning: trainningResponse });
    } catch (error) {
      this.props.history.replace("/");
    }
  };

  parseYouTubeUrlToEmbedded = () => this.state.trainning?.videoLink?.replace('watch?v=', 'embed/');

  getComments = () => {
    return Object.keys(this.state.trainning?.comments).map((key, index) => {
      const commentBase = this.state.trainning?.comments[key].find(comment => comment.id === key);
      const subComments = this.state.trainning?.comments[key].map(comment => {
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
          <p><a onClick={(e) => {
            this.state.activeReply = key;
            this.setState(this.state);
          }}>Responder</a></p>
          {this.state.activeReply === key ? <NewComment type='subcomment' sendCommentFunction={this.sendComment} cancelCommentFunction={this.cancelComment} /> : null}
          {subComments}
        </div>
      );
    });

  };

  cancelComment = () => {
    this.setState({ activeReply: null });
  }

  sendComment = (content, type) => {
    const commentObject = {
      comment: content,
      name: 'Anônimo'
    };

    const promise = type === 'comment' ?
      addNewComment(this.props.match.params.id, commentObject) :
      repplyComment(this.props.match.params.id, this.state.activeReply, commentObject);

    promise.then(() => {
      getTrainning(this.props.match.params.id).then(({ data: trainningResponse }) => {
        this.setState({ trainning: trainningResponse });
        this.setState({ activeReply: null });
        document.getElementById('comment').value = '';
      }).catch((err) => console.log(err));
    });
  }

  getAttachments = () => {
    return this.state.trainning?.attachments.map(attach => {
      const contentForDownload = `data:${attach.mimeType};base64,${attach.base64Adress}`;

      return (<div className='attachment'>
        <span>{attach.name}</span>
        <br />
        <a download={attach.name} href={contentForDownload}>
          <img className='attachment-icon' src={attach.mimeType === 'application/pdf' ? GenericPdfImage : GenericImage} />
        </a>
      </div>);
    });
  }

  render() {
    return this.state.loading || !this.state.trainning ? (
      <h1>Carregando...</h1>
    ) : (
      <section className='trainning-details'>
        <main className=''>
          <div className='trainnning-content'>
            <section id='trainning-title'>
              <TrainningItem value={this.state.trainning?.title} />
            </section>
            <br />
            <section>
              <YoutubeEmbed videoLink={this.parseYouTubeUrlToEmbedded()} />
            </section>

            <br />
            <section id='trainning-description'>
              <TrainningItem value={this.state.trainning?.description} />
            </section>
            <br />
            <section id='trainning-comments'>
              <p><strong>Comentários</strong></p>
              {this.getComments()}
              <NewComment type='comment' sendCommentFunction={this.sendComment} />
            </section>
            <br />
          </div>

        </main>
        <aside id='trainning-material'>
          <h3><strong>Materiais do treinamento</strong></h3>
          {this.getAttachments()}
        </aside>
      </section>
    );
  }
}





// export default function TrainningModuleDetailPage({ match }) {
//   const history = useHistory();


//   const 



//   const 

//   return 
// }




// function TrainningItem({ value }) {
//   return (
//     <p>{value}</p>
//   );
// }

// function NewComment({ display }) {
//   return (
//     <div className='new-comment'>
//       <textarea ></textarea>
//       <a>Enviar</a>
//     </div>
//   );
// }

// export default function TrainningModuleDetailPage({ match }) {
//   const [trainning, setTrainning] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { id } = match.params;
//   const [activeReply, setActiveReply] = useState([]);

//   const history = useHistory();
//   useEffect(() => {
//     const fetchTrainning = async () => {
//       try {
//         setLoading(true);
//         const { data: trainningResponse } = await getTrainning(id);
//         setTrainning(trainningResponse);
//         setLoading(false);
//       } catch (error) {
//         history.replace("/");
//       }
//     };

//     fetchTrainning();
//   }, []);
//   const YoutubeEmbed = ({ videoLink }) => (
//     <div className="video-responsive">
//       <iframe
//         height="480"
//         src={videoLink}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         title="Embedded youtube"
//       />
//     </div>
//   );

//   const parseYouTubeUrlToEmbedded = () => trainning?.videoLink?.replace('watch?v=', 'embed/');

//   const getComments = () => {

//     return Object.keys(trainning?.comments).map((key, index) => {
//       const commentBase = trainning?.comments[key].find(comment => comment.id === key);
//       const subComments = trainning?.comments[key].map(comment => {
//         if (comment.id !== key) {
//           return (
//             <div key={index} className='comment-reply'>
//               <p><strong>{comment.name}:</strong> {comment.comment}</p>
//             </div>
//           );
//         }
//       });

//       return (
//         <div className='comment'>
//           <p><strong>{commentBase.name}:</strong> {commentBase.comment}</p>
//           <p><a onClick={(e) => {
//             e.preventDefault();
//             activeReply[index] = true;
//             setActiveReply(activeReply);
//           }}>Responder</a></p>
//           {activeReply[index] ? <NewComment /> : null}
//           {subComments}
//         </div>
//       );
//     });

//   };


//   const getAttachments = () => {
//     return trainning?.attachments.map(attach => {
//       const contentForDownload = `data:${attach.mimeType};base64,${attach.base64Adress}`;

//       return (<div className='attachment'>
//         <span>{attach.name}</span>
//         <br />
//         <a download={attach.name} href={contentForDownload}>
//           <img className='attachment-icon' src={attach.mimeType === 'application/pdf' ? GenericPdfImage : GenericImage} />
//         </a>
//       </div>);
//     });
//   }

//   return loading || !trainning ? (
//     <h1>Carregando...</h1>
//   ) : (
//     <section className='trainning-details'>
//       <main className=''>
//         <div className='trainnning-content'>
//           <section id='trainning-title'>
//             <TrainningItem value={trainning?.title} />
//           </section>
//           <br />
//           <section>
//             <YoutubeEmbed videoLink={parseYouTubeUrlToEmbedded()} />
//           </section>

//           <br />
//           <section id='trainning-description'>
//             <TrainningItem value={trainning?.description} />
//           </section>
//           <br />
//           <section id='trainning-comments'>
//             <p><strong>Comentários</strong></p>
//             {getComments()}
//             <NewComment diplay={true} />
//           </section>
//           <br />
//         </div>

//       </main>
//       <aside id='trainning-material'>
//         <h3><strong>Materiais do treinamento</strong></h3>
//         {getAttachments()}
//       </aside>
//     </section>
//   );
// }
