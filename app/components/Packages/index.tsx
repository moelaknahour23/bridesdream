'use client';
import Image from 'next/image';
import { Fade } from 'react-awesome-reveal';

const Packages = () => {
	return (
		<div className='mx-auto max-w-8xl px-4 py-12' id='packages-section'>
			<div className='text-center mb-8'>
				{/* <Fade direction='right' triggerOnce={true}> */}
				<p className='text-3xl lg:text-4xl font-semibold text-lightgrey'>Packages</p>
				{/* </Fade> */}
			</div>
			<div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 px-8 gap-8 text-zinc800 justify-center'>
				{/* <Fade direction='left' triggerOnce={true}> */}
				<div className='flex flex-col  max-w-[300px] h-[400px]  items-center bg-gradient-to-br from-orange100 via-orange100  p-4 rounded-2xl shadow-lg relative border-4 border-orange200'>
					<div>
						<h2 className='font-extrabold text-2xl text-center mb-1'>Starter</h2>
						<p className='opacity-60 text-center'>Wedding Gown & Tuxedo Package</p>
						<div className='flex flex-col items-center my-6'>
							<div className='flex items-center space-x-2'>
								<p className='text-md line-through text-gray-500'>$420</p>
								<p className='text-2xl font-bold text-black'>$390</p>
							</div>
							{/* <p className='text-sm opacity-60'>/month</p> */}
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<p className='flex  text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Gown Steaming</b>
						</p>
						<p className='flex text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Tuxedo Steaming</b>
						</p>
					</div>
				</div>
				{/* </Fade>
				<Fade direction='left' triggerOnce={true}> */}
				<div className='flex flex-col  max-w-[300px] h-[400px] items-center bg-gradient-to-br from-orange100 via-orange100 p-4 rounded-2xl shadow-xl relative border-4 border-orange200 '>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-16 h-16 absolute -top-11 -left-11 fill-red400'>
						<path
							fill-rule='evenodd'
							d='M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z'
							clip-rule='evenodd'
						></path>
					</svg>
					<p className='mono text-sm absolute -top-4 bg-red400 text-zinc100 py-0.5 px-2 font-bold tracking-wider rounded'>POPULAR</p>
					<div>
						<div className='flex gap-4 justify-center'>
							<p className='font-extrabold text-2xl mb-2'>Silver</p>
						</div>
						<p className='opacity-60 text-center'>Complete Wedding Package</p>
						<p className='opacity-60 text-center'></p>
						<div className='flex gap-4 justify-center'>
							<div className='flex flex-col items-center my-8'>
								<div className='flex items-center space-x-2'>
									<p className='text-md line-through text-gray-500'>$490</p>
									<p className='text-2xl font-bold text-black'>$450</p>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<p className='flex  text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Gown Steaming</b>
						</p>
						<p className='flex  text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Tuxedo Steaming</b>
						</p>
						<p className='flex  text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Bridal/Maid of Honor Attire</b>
						</p>
					</div>
				</div>
				{/* </Fade>
				<Fade direction='right' triggerOnce={true}> */}
				<div className='flex flex-col  max-w-[300px] h-[400px] items-center bg-gradient-to-br from-orange100 via-orange100  p-4 rounded-2xl shadow-xl relative border-4 border-orange200'>
					<div>
						<h2 className='font-extrabold text-2xl text-center mb-2'>Gold</h2>
						<p className='opacity-60 text-center'>Bride & Bridal Package</p>
						<div className='flex flex-col items-center my-8'>
							<div className='flex items-center space-x-2'>
								<p className='text-md line-through text-gray-500'>$550</p>
								<p className='text-2xl font-bold text-black'>$500</p>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<p className='flex  text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Gown Steaming</b>
						</p>
						<p className='flex  text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Bridal Attire steaming for 4 </b>
						</p>
					</div>
				</div>
				{/* </Fade>
				<Fade direction='right' triggerOnce={true}> */}
				<div className='flex flex-col  max-w-[300px] h-[400px] items-center bg-gradient-to-br from-orange100 via-orange100  p-4 rounded-2xl shadow-xl relative border-4 border-orange200'>
					<div>
						<h2 className='font-extrabold text-2xl text-center mb-2 '>Platinum</h2>
						<p className='opacity-60 text-center'>Premium Package</p>
						<div className='flex flex-col items-center my-8'>
							<div className='flex items-center space-x-2'>
								<p className='text-md line-through text-gray-500'>$690</p>
								<p className='text-2xl font-bold text-black'>$630</p>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<p className='flex text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Gown Steaming</b>
						</p>
						<p className='flex  text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Tuxedo Steaming</b>
						</p>
						<p className='flex text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2 text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Bridal Attire steaming for 2 </b>
						</p>
						<p className='flex  text-sm'>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' className='w-4 h-4 mr-2  text-greenCheck'>
								<path
									fill-rule='evenodd'
									d='M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z'
									clip-rule='evenodd'
								></path>
							</svg>
							<b>Formal Dress Steaming for 2 </b>
						</p>
					</div>
				</div>
				{/* </Fade> */}
			</div>
		</div>
	);
};

export default Packages;
