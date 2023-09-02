import Link from 'next/link'
import { useState, useEffect } from 'react'

import { Spinner } from 'components'
import { Layout } from 'components/users'
import { serviceService } from 'services'

export default Index

function Index() {
    const [services, setServices] = useState(null)
    // recupere tout les utilisateurs
    useEffect(() => {
        serviceService.getAll().then((x) => setServices(x))
    }, [])

    function deleteService(id) {
        setServices(
            services.map((x) => {
                if (x.id === id) {
                    x.isDeleting = true
                }
                return x
            })
        )
        serviceService.delete(id).then(() => {
            setServices((services) => services.filter((x) => x.id !== id))
        })
    }

    return (
        <Layout>
            <h1>Services</h1>
            <Link href="/services/add" className="btn btn-sm btn-success mb-2">
                Ajouter un service
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '22.5%' }}>Titre</th>
                        <th style={{ width: '22.5%' }}>Description</th>
                        <th style={{ width: '22.5%' }}>Prix</th>
                        <th style={{ width: '22.5%' }}>Image</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {services &&
                        services.map((service) => (
                            <tr key={service.id}>
                                <td>{service.title}</td>

                                <td>
                                    <p> {service.description}</p>
                                </td>

                                <td>{service.image}</td>
                                <td>{service.price}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link
                                        href={`/services/edit/${service.id}`}
                                        className="btn btn-sm btn-primary me-1"
                                    >
                                        Modifier
                                    </Link>
                                    <button
                                        onClick={() =>
                                            deleteService(service.id)
                                        }
                                        className="btn btn-sm btn-danger btn-delete-user"
                                        style={{ width: '60px' }}
                                        disabled={service.isDeleting}
                                    >
                                        {service.isDeleting ? (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        ) : (
                                            <span>Effacer</span>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    {!services && (
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    )}
                    {services && !services.length && (
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">
                                    Pas de service à afficher
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Layout>
    )
}