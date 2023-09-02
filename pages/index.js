import Link from 'next/link';

import { userService } from 'services';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>Bonjour {userService.userValue?.firstName}!</h1>
                <p>Vous êtes connecté comme administrateur.</p>
                <p><Link href="/users">Gestion Personnel</Link></p>
                <p><Link href="/horaires">Gestion Horaires</Link></p>
            </div>
        </div>
    );
}