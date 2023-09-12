import SectionOne from 'components/SectionOne';
import { SectionOccasion } from 'components/occasions';
import { SectionPrestation } from 'components/prestations';
import Link from 'next/link';

import { userService } from 'services';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <SectionOne />
                <SectionPrestation />
                <SectionOccasion />
            </div>
        </div>
    );
}