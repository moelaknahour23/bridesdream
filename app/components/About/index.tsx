'use client';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';

const About = () => {
	return (
		<div className='relative' id='about-section'>
			<div className='mx-auto max-w-7xl sm:pb-16 px-6'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 pt-16'>
					<div className='flex justify-center'>
						{/* <Fade direction='right' triggerOnce={true}> */}
						<Image src='/images/Cook/about-6.png' alt='about-us-image' width={400} height={100} />
						{/* </Fade> */}
					</div>

					<div className='flex flex-col justify-center'>
						{/* <Fade direction='right' triggerOnce={true}> */}
						<h2 className='text-3xl lg:text-4xl font-semibold text-black lg:text-start text-center mb-8'>About Us</h2>
						{/* </Fade> */}
						{/* <Fade direction='right' triggerOnce={true}> */}
						<p className='text-grey md:text-lg font-normal mb-5 text-start'>
							At Bride's Dream, we’re dedicated to making your wedding day as flawless as you’ve imagined. Our on-site steaming service ensures that every{' '}
							<strong>garment</strong>, from <strong>wedding gowns</strong> to <strong>tuxedos</strong>, is ready for your big day. Our team arrives at your location
							with professional equipment, carefully steaming each piece to create a crisp, polished look.
						</p>
						<p className='text-grey md:text-lg font-normal mb-10 text-start'>
							We understand that <strong>every detail matters</strong> on your special day. That’s why we prioritize punctuality and precision, handling every garment
							with exceptional care so you can feel confident and radiant. Trust Bride's Dream to deliver not only impeccable results but also the peace of mind you
							deserve, allowing you to relax and savor each unforgettable moment.
						</p>
						{/* </Fade> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
