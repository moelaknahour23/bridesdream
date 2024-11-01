'use client';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Home = () => {
	const router = useRouter();
	return (
		<div>
			<div id='home-section' className='flex items-center bg-lightpink'>
				<div className='mx-auto max-w-7xl pt-10 px-6 '>
					<div className='grid grid-cols-1 lg:grid-cols-12 gap-1'>
						<div className='col-span-6 flex flex-col justify-center'>
							{/* <Fade direction='left' triggerOnce={true}> */}
							<h1 className='text-2xl lg:text-3xl font-semibold mb-5 text-lightgrey text-center lg:text-start'>
								Welcome to <br /> Bride&apos;s Dream
							</h1>
							{/* </Fade> */}
							{/* <Fade direction='left' triggerOnce={true}> */}
							<p className='text-md sm:text-base lg:text-lg text-grey font-normal mb-10 lg:text-start max-w-[620px]'>
								Elevate your wedding day with our on-location steaming service. Our professionals will come directly to you, providing expert steaming for wedding
								gowns, tuxedos, and other garments to ensure they look pristine and fresh, allowing you to feel your best and shine on your special day.
							</p>
							{/* </Fade> */}
							<div className='md:flex mb-6 align-middle justify-center lg:justify-start'>
								{/* <Fade direction='left' triggerOnce={true}> */}
								<button
									onClick={() => router.push('/booking')}
									className='text-lg w-full md:w-auto font-medium rounded-full border  text-white py-4 px-16 bg-pink  mr-4 hover:border hover:border-pink hover:bg-white hover:text-pink transition ease-in duration-300'
								>
									Booking
								</button>

								<button
									onClick={() => router.push('/contact')}
									className='lg:hidden flex border w-full md:w-auto  mt-4 md:mt-0  justify-center rounded-full text-lg font-medium items-center py-4 px-12 text-pink hover:text-white hover:bg-pink transition ease-in duration-300'
								>
									Contact Us
								</button>
								{/* </Fade> */}
							</div>
						</div>

						<div className='col-span-6 justify-center items-center relative hidden lg:block'>
							{/* <Fade direction='right' triggerOnce={true}> */}
							<Image src='/images/Banner/weddingExpert.png' alt='Wedding expert preparing dress' width={800} height={640} />
							{/* </Fade> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
