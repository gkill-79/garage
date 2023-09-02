import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { horaireService } from 'services';

export default Index;

function Index() {
    const [horaires, setHoraires] = useState(null);
// recupere tout les horaires
    useEffect(() => {
        horaireService.getAll().then(x => setHoraires(x));
    }, []);

    function deleteHoraire(id) {
        setHoraires(horaires.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
       horaireService.delete(id).then(() => {
            setHoraires(horaires => horaires.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Horaires</h1>
            <Link href="/horaires/add" className="btn btn-sm btn-success mb-2">Ajouter un horaire</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '13%' }}>Jour</th>
                        <th style={{ width: '13%' }}>debut AM</th>
                        <th style={{ width: '13%' }}>fin AM</th>
                        <th style={{ width: '13%' }}>debut PM</th>
                        <th style={{ width: '13%' }}>fin PM</th>
                        <th style={{ width: '13%' }}>fermeture AM</th>
                        <th style={{ width: '13%' }}>fermeture PM</th>
                        <th style={{ width: '9%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {horaires && horaires.map(horaire =>
                        <tr key={horaire.id}>
                            <td>{horaire.jour}</td>
                          <td>{horaire.debut_am}</td>
                          <td>{horaire.fin_am}</td>
                          <td>{horaire.debut_pm}</td>
                          <td>{horaire.fin_pm}</td>
                          <td>{horaire.fermeture_am}</td>
                          <td>{horaire.fermeture_pm}</td>

                         
                           
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/horaires/edit/${horaire.id}`} className="btn btn-sm btn-primary me-1">Modifier</Link>
                                <button onClick={() => deleteHoraire(horaire.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={horaire.isDeleting}>
                                    {horaire.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Effacer</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!horaires &&
                       ( <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>)
                    }
                    {horaires && !horaires.length &&
                        (<tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Pas d&apos;horaires à afficher</div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </Layout>
    );
}