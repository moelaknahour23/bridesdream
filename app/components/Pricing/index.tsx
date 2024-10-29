// components/Pricing.js
import React from 'react';
import { Fade } from 'react-awesome-reveal';

const Pricing = () => {
	return (
		<section className='bg-lightpink py-12 bg-gray-100 px-12' id='pricing-section'>
			<div className='container mx-auto text-center'>
				<h2 className='text-3xl lg:text-4xl font-semibold mb-8'>Pricing</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center'>
					{/* Package 1 */}
					{/* bg-gradient-to-br from-orange100 */}
					<Fade direction='left'>
						<div className='flex flex-col  max-w-[250px] items-center  p-4 rounded-3xl shadow-lg relative '>
							{/* <div className='bg-white max-w-[250px] mx-auto shadow-lg rounded-lg p-6 hover:scale-105 transform transition duration-300 ease-in-out'> */}
							<h3 className='text-2xl font-semibold mb-4'>Wedding Gown Steaming</h3>
							<p className='text-gray-500 mb-4'>On-site steaming service for wedding gowns.</p>
							<div className='text-3xl font-bold mb-4'>$270</div>
						</div>
					</Fade>
					{/* Package 2 */}
					{/* <div className='bg-white max-w-[250px] mx-auto  shadow-lg rounded-lg p-6 hover:scale-105 transform transition duration-300 ease-in-out  border-blue-600'> */}
					<Fade direction='left'>
						<div className='flex flex-col  max-w-[250px] items-center  p-4 rounded-3xl shadow-lg relative'>
							<h3 className='text-2xl font-semibold mb-12'>Tuxedo Steaming</h3>
							<p className='text-gray-500 mb-4'>On-site steaming service for Tuxedo.</p>
							<div className='text-3xl font-bold mb-4'>$150</div>
						</div>
					</Fade>
					{/* Package 3 */}
					{/* <div className='bg-white max-w-[250px] mx-auto  shadow-lg rounded-lg p-6 hover:scale-105 transform transition duration-300 ease-in-out'> */}
					<Fade direction='left'>
						<div className='flex flex-col  max-w-[250px] items-center p-4 rounded-3xl shadow-lg relative'>
							<h3 className='text-2xl font-semibold mb-12'>Bridal Party Attire</h3>
							<p className='text-gray-500 mb-4'>On-site steaming service for Bridesmaid or Maid of Honor.</p>
							<div className='text-3xl font-bold mb-4'>$70</div>
						</div>
					</Fade>
					{/* Package 4 */}
					<Fade direction='left'>
						<div className='bg-white max-w-[250px] mx-auto  shadow-lg rounded-lg p-6 hover:scale-105 transform transition duration-300 ease-in-out'>
							{/* <div className='flex flex-col  max-w-[250px] items-center  p-4 rounded-3xl shadow-lg relative '> */}
							<h3 className='text-2xl font-semibold mb-4'>Other Formal Dress Steaming</h3>
							<p className='text-gray-500 mb-4'>On-site steaming service for Other Formal Dresses</p>
							<div className='text-3xl font-bold mb-4'>$65</div>
						</div>
					</Fade>
				</div>
			</div>
		</section>
	);
};

export default Pricing;
