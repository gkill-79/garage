import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { occasionService } from 'services';

export default Index;

function Index() {
    const [occasions, setOccasions] = useState(null);
// recupere tout les horaires
    useEffect(() => {
        occasionService.getAll().then(x => setOccasions(x));
    }, []);

    function deleteHoraire(id) {
        setOccasions(occasions.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
       occasionService.delete(id).then(() => {
            setOccasions(occasions => occasions.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Occasions</h1>
            <Link href="/occasions/add" className="btn btn-sm btn-success mb-2">Ajouter une occasion</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '13%' }}>Marque</th>
                        <th style={{ width: '13%' }}>Modèle</th>
                        <th style={{ width: '13%' }}>Prix</th>
                        <th style={{ width: '13%' }}>Kilomètre</th>
                        <th style={{ width: '13%' }}>Place</th>
                        <th style={{ width: '13%' }}>Carburant</th>
                        <th style={{ width: '13%' }}>Année</th>
                        <th style={{ width: '9%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {occasions && occasions.map(occasion =>
                        <tr key={occasion.id}>
                            <td>{occasion.marque}</td>
                          <td>{occasion.model}</td>
                          <td>{occasion.prix}</td>
                          <td>{occasion.kilometre}</td>
                          <td>{occasion.place}</td>
                          <td>{occasion.carburant}</td>
                          <td>{occasion.annee}</td>

                         
                           
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/occasions/edit/${occasion.id}`} className="btn btn-sm btn-primary me-1">Modifier</Link>
                                <button onClick={() => deleteOccasion(occasion.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={occasion.isDeleting}>
                                    {occasion.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Effacer</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!occasions &&
                       ( <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>)
                    }
                    {occasions && !occasions.length &&
                        (<tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Pas d&apos;occasions à afficher</div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </Layout>
    );
}