import Banner from './components/Home/index';
import Services from './components/Services/index';
import About from './components/About/index';
import Pricing from './components/Pricing/index';
import Packages from './components/Packages';

export default function Home() {
	return (
		<main>
			<Banner />
			<About />
			<Services />
			{/* <Pricing /> */}
			<Packages />
		</main>
	);
}
