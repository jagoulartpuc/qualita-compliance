import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LabeledInput, Button, PasswordInput } from "@Components";
import { maskUtils } from "@Utils";
import { useSession } from "@Context";

import "./style.scss";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [maskedIdentifier, setMaskedIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { user, isLoggedIn, signIn } = useSession();
  async function onSubmit(event) {
    event.preventDefault();
    const response = await signIn({
      identifier,
      password,
    });

    if (!response.success) {
      window.alert(response.message);
    }
  }

  function onChangeIdentifier(value) {
    value.length > 11
      ? setMaskedIdentifier(maskUtils.cnpjMask(value))
      : setMaskedIdentifier(maskUtils.cpfMask(value));

    setIdentifier(value.replace(/\D/g, ""));
  }

  return (
    <div id="login-page">
      <section className="presentation">
        <div className="presentation-text-wrapper">
          <p className="presentation-text">
            A Qualità Compliance é uma plataforma para implantação e
            gerenciamento de Canal de Denúncias, totalmente virtual e disponível
            24h por dia. Agrega, ainda, treinamentos, capacitações, seminários e
            mecanismos para implementação e operação de sistema de Compliance ou
            anticorrupção. O atendimento é feito por advogados especializados, o
            que garante o sigilo e o auto grau técnico no tratamento das
            denúncias. Tem como missão precípua prevenir ilícitos, mitigar
            riscos, gerando indicadores para uma boa governança corporativa, o
            que propicia economia de até 5% do faturamento e a preservação da
            boa reputação dos gestores.
          </p>
        </div>
      </section>
      <main className="modules-and-login">
        <section className="section">
          <div className="module-wrapper">
            <h3 className="module-title">Treinamentos</h3>
            <p className="module-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ultricies neque sed diam efficitur, sit amet semper eros pulvinar.
              Suspendisse non lacus sed ante sagittis congue pulvinar a neque.
              Suspendisse tristique lectus ac arcu euismod tempor. Maecenas
              varius mi non orci lobortis dapibus. Curabitur varius turpis ac
              tempus cursus. Ut efficitur ultricies blandit. Maecenas rhoncus
              urna luctus, hendrerit tortor sit amet, pellentesque metus. Sed
              sit amet tristique diam. Etiam vestibulum odio non tellus laoreet,
              nec bibendum tortor dictum
            </p>
            {user && (
              <Link to={routes.TRAINING_MODULES_PAGE} className="module-button">
                Ver treinamentos
              </Link>
            )}
          </div>
          <div className="module-wrapper">
            <h3 className="module-title">Canal de denúncias</h3>
            <p className="module-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ultricies neque sed diam efficitur, sit amet semper eros pulvinar.
              Suspendisse non lacus sed ante sagittis congue pulvinar a neque.
              Suspendisse tristique lectus ac arcu euismod tempor. Maecenas
              varius mi non orci lobortis dapibus. Curabitur varius turpis ac
              tempus cursus.{" "}
            </p>

            {user?.role === "PERSON" && (
              <Link to={routes.REPORT_PAGE} className="report-link">
                Quero fazer uma denúncia
              </Link>
            )}
            {user?.role === "COMPANY" && (
              <Link to={routes.COMPANY_REPORTS_PAGE} className="report-link">
                Visualizar denúncias da empresa
              </Link>
            )}
          </div>
        </section>
        {!user && (
          <section className="section">
            <form onSubmit={onSubmit} className="login-form">
              <LabeledInput
                value={maskedIdentifier}
                onChange={({ target }) =>
                  onChangeIdentifier(target.value.replace(/\D/g, ""))
                }
                maxLength={18}
                type="text"
                className="form-item"
                label="CPF | CNPJ"
              />
              <PasswordInput
                onChange={({ target }) => setPassword(target.value)}
                className="form-item"
                label="SENHA"
              />
              <a className="form-item forgot-password" href="">
                Esqueci minha senha
              </a>
              <Button disabled={!identifier || !password} className="form-item">
                Entrar
              </Button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
