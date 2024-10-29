'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Signin = () => {
	const router = useRouter();

	return (
		<>
			<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
				<div className='flex'>
					<button
						type='button'
						onClick={() => router.push('/contact')}
						className='flex justify-end text-md font-medium border  border-pink text-pink py-4 px-4 mr-4 lg:px-8 navbutton rounded-full hover:text-white hover:bg-pink transition ease-in duration-200'
					>
						Contact us
					</button>
					<button
						type='button'
						className='flex justify-end text-md font-medium  bg-pink  text-white py-4 px-4 border border-pink lg:px-8 navbutton rounded-full hover:border hover:border-pink hover:bg-white hover:text-pink transition ease-in duration-200'
						onClick={() => router.push('/booking')}
					>
						Booking
					</button>
				</div>
			</div>
		</>
	);
};

export default Signin;
