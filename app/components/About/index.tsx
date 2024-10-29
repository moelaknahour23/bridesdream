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
						<p className='text-grey md:text-lg font-normal mb-10 text-start'>
							Ensure your wedding day is flawless with our on-site steaming service. We come to your location before the wedding to steam wedding gowns, tuxedos, or
							any other garments, ensuring a crisp and clean look. Our professional team is dedicated to providing high-quality service, paying attention to every
							detail, so you can feel confident and beautiful on your special day. We understand the importance of looking perfect, which is why we arrive on time and
							with all the necessary equipment to make sure your attire is immaculate. Trust us to help you look your best, and enjoy peace of mind knowing that your
							garments will be ready for your big moment!
						</p>
						{/* </Fade> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
