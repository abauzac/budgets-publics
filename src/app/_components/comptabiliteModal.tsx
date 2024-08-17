import React, { MouseEvent } from "react";
import { useModal } from "../_contexts/ComptabiliteModalContext";
import { toEuro } from "../_utils/utils";

export default function Modal(props: {}) {
  const { modalIsOpen, handleClose, compte } = useModal();

  const handleClickOverlay = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
        handleClose && handleClose(event);
    }
  };

  if (!compte)
    return (
      <dialog onClick={handleClickOverlay} open={modalIsOpen} {...props}>
        <article>
          <header>
            <button
              aria-label="Close"
              rel="prev"
              onClick={handleClose}
            ></button>
            <h3>Aucun compte sélectionné</h3>
          </header>
          <footer>
            <button className="secondary" onClick={handleClose}>
              Fermer
            </button>
          </footer>
        </article>
      </dialog>
    );

  return (
    <dialog onClick={handleClickOverlay} open={modalIsOpen} {...props}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={handleClose}></button>
          <h3>Détail du compte {compte.compte}</h3>
        </header>
        <table>
          <thead>
            <tr>
                <th></th>
                <th style={{ textAlign: "right" }}>Débit</th>
                <th style={{ textAlign: "right" }}>Crédit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <th scope="row">Balance d'entrée</th>
                <td style={{ textAlign: "right" }}>{toEuro(compte.bedeb)}</td>
                <td style={{ textAlign: "right" }}>{toEuro(compte.becre)}</td>
            </tr>
            <tr>
                <th scope="row">Opération budgétaire</th>
                <td style={{ textAlign: "right" }}>{toEuro(compte.oobdeb)}</td>
                <td style={{ textAlign: "right" }}>{toEuro(compte.oobcre)}</td>
            </tr>
            <tr>
                <th scope="row">&#x21B3; Opération budgétaire <br/> nette des annulations</th>
                <td style={{ textAlign: "right" }}>{toEuro(compte.obnetdeb)}</td>
                <td style={{ textAlign: "right" }}>{toEuro(compte.obnetcre)}</td>
            </tr>
            <tr>
                <th scope="row">Opération non budgétaire</th>
                <td style={{ textAlign: "right" }}>{toEuro(compte.onbdeb)}</td>
                <td style={{ textAlign: "right" }}>{toEuro(compte.onbcre)}</td>
            </tr>
            <tr>
                <th scope="row"><b>Solde</b></th>
                <td style={{ textAlign: "right" }}><b>{toEuro(compte.sd)}</b></td>
                <td style={{ textAlign: "right" }}><b>{toEuro(compte.sc)}</b></td>
            </tr>
          </tbody>
        </table>
        <footer>
          <button className="secondary" onClick={handleClose}>
            Fermer
          </button>
        </footer>
      </article>
    </dialog>
  );
}
