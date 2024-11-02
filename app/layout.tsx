import './globals.css';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/Footer';
import Script from 'next/script';

export const metadata = {
	title: "Bride's Dream - On-site Steaming Services",
	description:
		'Professional on-site steaming for wedding gowns, tuxedos, bridal party attire, and other formal dresses. We come to your location to ensure every garment looks perfect for your big day.',
	keywords: [
		'wedding gown steaming',
		'on-site garment steaming',
		'mobile tuxedo steaming',
		'bridal party attire steaming',
		'formal dress steaming',
		'wedding services',
		'event garment care',
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
