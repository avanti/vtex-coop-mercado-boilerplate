/* eslint-disable prettier/prettier */
import React, { useContext, useState } from "react";
// import ReactInputMask from "react-input-mask";
import { Spinner } from "vtex.styleguide";

import { LocalizationContextProvider } from "../../context";
// import logoImage from "../../../../../assets/images/logo-regionalizacao.png";
import styles from "./styles.module.css";
import CloseButton from "../CloseButton/index";

const Step1 = () => {
  const {
    loading,
    setLoading,
    setPickupCep,
    unavailableAddress,
    setUnavailableAddress,
    setStep,
    updateSessionDataByCep,
  } = useContext(LocalizationContextProvider);

  const [localCep, setLocalCep] = useState<string>();
  const [unavailableCep, setUnavailableCep] = useState<boolean>();

  const onChangeInputHandler = (valor: string) => {
    let filtro = valor.replace(/\D/g, "");
    filtro = filtro.replace(/^(\d{5})(\d)/g, "$1-$2");
    setLocalCep(filtro)
    // setLocalCep(ev.currentTarget.value.replace(/[^0-9\\.]+/g, ""));
  };

  const onSubmitHandler = async (ev: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    ev.preventDefault();
    try {
      if (!localCep || localCep?.length < 8) {
        throw new Error("Favor verificar o cep informado");
      }
      setPickupCep(localCep);
      updateSessionDataByCep(localCep);
    } catch (err) {
      setLoading(false);
      setUnavailableCep(true);
    }
  };

  const changeCepClickHandler = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setUnavailableAddress(false);
    setStep(1);
    setLoading(false);
  };

  return (
    <>
      <div className={styles.internalContainer}>
        <div className={styles.bannerContainer}></div>

        <div className={styles.body}>
          <CloseButton />

          {unavailableAddress
            ? (
              <div className={styles.unavailableAddressContainer}>
                <p className={styles.description}>
                  Ops, parece que não entregamos no seu CEP
                </p>
                <button
                  className={styles.cepBottom}
                  onClick={changeCepClickHandler}
                >
                  Alterar CEP
                </button>
              </div>
            )
            : (
              <>
                <img
                  src={'logoImage'}
                  alt="Logo Coop"
                  className={styles.logoCoop}
                />
                <>
                  <p className={styles.description}>
                    Digite o CEP para ver nossas opções de entrega.
                  </p>
                  {loading
                    ? (
                      <div className="tc">
                        <Spinner color="currentColor" size={20} />
                      </div>
                    )
                    : (
                      <>
                        <form
                          className={styles.form}
                          onSubmit={onSubmitHandler}
                        >
                          <input
                            type="text"
                            placeholder="Digite seu CEP"
                            name="localCep"
                            className={styles.input}
                            value={localCep || ""}
                            onChange={(e:any) => onChangeInputHandler(e.currentTarget.value)}
                            maxLength={9}
                            // mask="99999-999"
                          />

                          <button className={styles.button} type="submit">
                            Verificar
                          </button>
                        </form>
                        {unavailableCep
                          ? (
                            <>
                              <div className={styles.erroCEP}>
                                Formato de CEP inválido.
                              </div>
                            </>
                          )
                          : <></>}
                        <a
                          className={styles.cepBottom}
                          target="_blank"
                          href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
                          rel="noreferrer"
                        >
                          Não sei meu cep
                        </a>
                      </>
                    )}
                </>
              </>
            )}
        </div>
      </div>
    </>
  );
};

export default Step1;
