'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Fade } from 'react-awesome-reveal';

interface cardDataType {
	imgSrc: string;
	heading: string;
	subheading: string;
	link: string;
	price: string;
}

const cardData1: cardDataType[] = [
	{
		imgSrc: '/images/Features/weddingGown.jpg',
		heading: 'Wedding Gown Steaming',
		subheading: 'Professional on-site steaming service to ensure wedding gowns are wrinkle-free and look perfect for the big day.',
		link: 'Learn more',
		price: '270',
	},
	{
		imgSrc: '/images/Features/tuxedoSteamingLogo.png',
		heading: 'Tuxedo Steaming',
		subheading: 'Expert steaming for tuxedos, providing a crisp and clean appearance for grooms and groomsmen.',
		link: 'Learn more',
		price: '150',
	},
];

const cardData2: cardDataType[] = [
	{
		imgSrc: '/images/Features/bridal.jpg',
		heading: 'Bridal Party Attire',
		subheading: 'Steaming services for bridesmaids dresses and other bridal party garments, ensuring a polished look for all members.',
		link: 'Learn more',
		price: '70',
	},

	{
		imgSrc: '/images/Features/otherFormalDressSteaming.jpg',
		heading: 'Other Formal Dress Steaming',
		subheading: 'On-site steaming for various formal dresses, ensuring all attire looks immaculate for special occasions.',
		link: 'Learn more',
		price: '65',
	},
];

const Services = () => {
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		// Set a timeout to change the visibility state after the component mounts
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 100); // Adjust the timeout duration as needed

		// Clean up the timer on component unmount
		return () => clearTimeout(timer);
	}, []);
	return (
		<div>
			{isVisible && (
				<div className='mx-auto max-w-8xl px-12 py-12 bg-lightpink' id='services-section'>
					<div className=' text-center mb-10 '>
						{/* <Fade direction='left' triggerOnce={true}> */}
						<p className='text-3xl lg:text-4xl font-semibold text-lightgrey'>Services & Pricing</p>
						{/* </Fade> */}
					</div>
					<div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 text-zinc800 justify-center'>
						{/* <div className='grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-10 '> */}
						{cardData1.map((items, i) => (
							// <div
							// 	className='flex flex-col  max-w-[250px] items-center bg-gradient-to-br from-orange100 p-4 rounded-3xl shadow-lg relative border-4 border-orange200'
							// 	key={i}
							// >
							// <Fade direction='left' triggerOnce={true} key={i}>
							<div className='card-b relative max-w-[310px] rounded-3xl flex flex-col items-center ' key={i}>
								<div className='work-img-bg rounded-full flex justify-center mb-0'>
									<Image src={items.imgSrc} alt={items.imgSrc} width={100} height={100} />
								</div>
								<h3 className='text-[20px] h-[50px] text-black font-semibold text-center mt-0 mb-0 pt-4 '>{items.heading}</h3>
								<div className='text-2xl font-bold mt-6'>${items.price}</div>
								<p className='text-md font-normal text-black text-center text-opacity-50 mt-4'>{items.subheading}</p>
							</div>
							// </Fade>
						))}
						{cardData2.map((items, i) => (
							// <div
							// 	className='flex flex-col  max-w-[250px] items-center bg-gradient-to-br from-orange100 p-4 rounded-3xl shadow-lg relative border-4 border-orange200'
							// 	key={i}
							// >
							// <Fade direction='right' triggerOnce={true} key={i + 2}>
							<div className='card-b relative max-w-[310px] rounded-3xl flex flex-col items-center ' key={i + 2}>
								<div className='work-img-bg rounded-full flex justify-center mb-0'>
									<Image src={items.imgSrc} alt={items.imgSrc} width={100} height={100} />
								</div>
								<h3 className='text-[20px] h-[50px] text-black font-semibold text-center mt-0 mb-0 pt-4 '>{items.heading}</h3>
								<div className='text-2xl font-bold mt-6'>${items.price}</div>
								<p className='text-md font-normal text-black text-center text-opacity-50 mt-4'>{items.subheading}</p>
							</div>
							// </Fade>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Services;
