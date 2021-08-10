import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getReport } from "@Services";
import "./style.scss";
import GenericImage from '@Images/generic-image.jpeg';
import GenericPdfImage from '@Images/generic-pdf.jpeg';

function singletonList(list) {
  return list[0]
}


function ReportItem({ label, value }) {
  return (
    <p className="report-details-item">
      <strong>{label}: </strong>
      {value}
    </p>
  );
}

const getAttachments = (answerToInformer) => {
  return answerToInformer?.attachments.map(attach => {
    const contentForDownload = `data:${attach.mimeType};base64,${attach.base64Adress}`;
    return (
        <div className='attachment'>
          <span>{attach.name}</span>
          <br />
          <a download={attach.name} href={contentForDownload}>
            <img className='attachment-icon' src={attach.mimeType === 'application/pdf' ? GenericPdfImage : GenericImage} />
          </a>
        </div>
    );
  });
}

export default function ReportDetails({ match }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = match.params;
  const history = useHistory();
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const { data: reportResponse } = await getReport(id);
        setReport(reportResponse);
        setLoading(false);
      } catch (error) {
        history.replace("/");
      }
    };

    fetchReport();
  }, []);
  return loading || !report ? (
    <h1>Carregando...</h1>
  ) : (
    <main id="report-details-page">
      <h2>Detalhes da denúncia</h2>
      <section>
        <ReportItem label="Nº de protocolo" value={report?.trackingId} />
        <ReportItem label="Categoria" value={report?.category} />
        <ReportItem label="Descrição do ocorrido" value={report?.description} />
        <ReportItem label="Status" value={report?.status} />
      </section>

      {report.status === 'FINALIZADA' && (
          <section>
            <ReportItem label="Resposta" value={report?.answerToInformer.message} />
            <p className="report-details-item">
              <strong>Anexo: </strong>
              <div className="report-details-admin-material">
                {getAttachments(report?.answerToInformer)}
              </div>
            </p>

          </section>
      )}
    </main>
  );
}
