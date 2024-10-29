import Link from 'next/link';
import Image from 'next/image';

interface ProductType {
	id: number;
	section: string;
	link: string[];
}

interface socialLinks {
	imgSrc: string;
	link: string;
	width: number;
}

const socialLinks: socialLinks[] = [
	{
		imgSrc: '/images/Footer/facebook.svg',
		link: 'https://facebook.com',
		width: 10,
	},
	{
		imgSrc: '/images/Footer/insta.svg',
		link: 'https://instagram.com',
		width: 14,
	},
	{
		imgSrc: '/images/Footer/twitter.svg',
		link: 'https://twitter.com',
		width: 14,
	},
];

const products: ProductType[] = [
	{
		id: 1,
		section: 'Company',
		link: ['About'],
	},
	{
		id: 2,
		section: 'Contact',
		link: ['Services'],
	},
	{
		id: 3,
		section: 'More',
		link: ['Pricing'],
	},
	{
		id: 3,
		section: 'More',
		link: ['Contact'],
	},
];

const footer = () => {
	return (
		<div className='bg-white w-full'>
			<div className='mx-auto max-w-2xl pt-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
				{/*	<div className='my-4 grid grid-cols-1 gap-y-10 sm:grid-cols-6 lg:grid-cols-12'> */}
				{/* COLUMN-1 */}
				{/* <div className='sm:col-span-6 lg:col-span-5'>
						<div className='flex flex-shrink-0 items-center border-right'>
							<div className='mr-16'>
								<Image src='/images/Logo/logo-2.png' alt='logo' width={130} height={130} />
							</div>
							<div className='flex gap-4'>
								{socialLinks.map((item, i) => (
									<Link href={item.link} key={i}>
										<div className='bg-white h-10 w-10 shadow-xl text-base rounded-full flex items-center justify-center footer-icons hover:bg-pink'>
											<Image src={item.imgSrc} alt={item.imgSrc} width={item.width} height={2} className='sepia' />
										</div>
									</Link>
								))}
							</div>
						</div>
					</div> */}

				{/* COLUMN-2 - Products List */}
				{/* <div className='flex flex-row  gap-12 mt-10'>
						{products.map((product) => (
							<div key={product.id} className='flex flex-col '>
								<ul className='flex gap-6'>
									{product.link.map((link: string, index: number) => (
										<li key={index}>
											<Link href='/' className='text-footerlinks text-base font-normal opacity-70 hover:text-black'>
												{link}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div> */}
				{/* </div> */}

				{/* All Rights Reserved */}
				<div className='py-5 md:flex items-center justify-between border-t border-t-bordertop'>
					<div className='sm:col-span-6 lg:col-span-5'>
						<div className='flex flex-shrink-0 items-center border-right'>
							<div className='mr-16'>
								<Image src='/images/Logo/logo-2.png' alt='logo' width={110} height={110} />
							</div>
							<div className='flex '>
								{socialLinks.map((item, i) => (
									<Link href={item.link} key={i}>
										<div className='bg-white h-10 w-10 shadow-xl text-base rounded-full flex items-center justify-center footer-icons hover:bg-pink'>
											<Image src={item.imgSrc} alt={item.imgSrc} width={item.width} height={2} className='sepia' />
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
					<h4 className='text-darkgrey text-sm text-center md:text-start font-normal'>
						@2024 - All Rights Reserved by bridesdream
						<Link href='https://adminmart.com/' target='_blank'>
							bridesdream.org
						</Link>
					</h4>
				</div>
			</div>
		</div>
	);
};

export default footer;
