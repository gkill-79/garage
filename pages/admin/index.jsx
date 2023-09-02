import { useState, useEffect } from 'react'
import Link from 'next/link'
import { userService } from 'services'

export default Index
// composant pour la page admin
function Index() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const subscription = userService.user.subscribe((x) => setUser(x))
        return () => subscription.unsubscribe()
    }, [])

    return (
        <div className="p-4">
            <div className="container">
                <p>Tableau de Bord</p>
                {user && user.roles === 'ADMIN' ? (
                    <>
                        <p>
                            <Link href={'/users'} className="nav-link ">
                                Gérer les utilisateurs
                            </Link>
                        </p>
                        <p>
                            <Link href="/horaires">Gérer les horaires</Link>
                        </p>
                        <p>
                            <Link href="/services">Gérer les Services</Link>
                        </p>
                        <p>
                            <Link href="/occasions">Gérer les occasions</Link>
                        </p>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}


