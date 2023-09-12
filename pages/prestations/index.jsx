import Link from "next/link";
import { useState, useEffect } from "react";

import { Spinner } from "components";
import { Layout } from "components/users";
import { prestationService } from "services";

export default Index;

function Index() {
  const [prestations, setPrestations] = useState(null);
  // recupere toutes les prestations
  useEffect(() => {
    prestationService.getAll().then((x) => setPrestations(x));
  }, []);

  function deletePrestation(id) {
    setPrestations(
      prestations.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    prestationService.delete(id).then(() => {
      setPrestations((prestations) => prestations.filter((x) => x.id !== id));
    });
  }

  return (
    <Layout>
      <h1>Prestations</h1>
      <Link href="/prestations/add" className="btn btn-sm btn-success mb-2">
        Ajouter une prestation
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "22.5%" }}>Titre</th>
            <th style={{ width: "22.5%" }}>Description</th>
            <th style={{ width: "22.5%" }}>Prix</th>
            <th style={{ width: "22.5%" }}>Image</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {prestations &&
            prestations.map((prestation) => (
              <tr key={prestation.id}>
                <td>{prestation.title}</td>

                <td>
                  <p> {prestation.description}</p>
                </td>
                
                <td>{prestation.price}</td>
                <td>{prestation.image}</td>
                
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/prestations/edit/${prestation.id}`}
                    className="btn btn-sm btn-primary me-1"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => deletePrestation(prestation.id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    style={{ width: "60px" }}
                    disabled={prestation.isDeleting}
                  >
                    {prestation.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Effacer</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!prestations && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}
          {prestations && !prestations.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">Pas de prestation à afficher</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
