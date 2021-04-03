import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Footer,
  Header,
  LabeledInput,
  Button,
  PasswordInput,
} from "@Components";
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
      identifier: identifier.replace(/\D/g, ""),
      password,
    });

    if (!response.success) {
      window.alert(response.message);
    }
  }

  function onChangeIdentifier(value) {
    if (value.length > identifier.length) {
      identifier.length > 13
        ? setMaskedIdentifier(maskUtils.cnpjMask(value))
        : setMaskedIdentifier(maskUtils.cpfMask(value));
    } else {
      setMaskedIdentifier(value);
    }

    setIdentifier(value);
  }

  return (
    <div id="login-page">
      <section className="presentation">
        <div className="presentation-text-wrapper">
          <p className="presentation-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            ultricies neque sed diam efficitur, sit amet semper eros pulvinar.{" "}
            <br />
            <br />
            Suspendisse non lacus sed ante sagittis congue pulvinar a neque.
            Suspendisse tristique lectus ac arcu euismod tempor. Maecenas varius
            mi non orci lobortis dapibus. Curabitur varius turpis ac tempus
            cursus. Ut efficitur ultricies blandit. Maecenas rhoncus urna
            luctus, hendrerit tortor sit amet, pellentesque metus. Sed sit amet
            tristique diam. Etiam vestibulum odio non tellus laoreet, nec
            bibendum tortor dictum.
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
              <Link to={routes.USER_PAGE} className="report-link">
                Quero ver os treinamentos
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

            <Link to={routes.REPORT_PAGE} className="report-link">
              Quero fazer uma denúncia
            </Link>
          </div>
        </section>
        {!user && (
          <section className="section">
            <form onSubmit={onSubmit} className="login-form">
              <LabeledInput
                value={maskedIdentifier}
                onChange={({ target }) => onChangeIdentifier(target.value)}
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
              <p className="talk-to-us-text form-item">
                Entre em contato conosco{" "}
                <a className="talk-to-us-link" href="">
                  aqui
                </a>
              </p>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
