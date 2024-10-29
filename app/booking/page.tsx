'use client';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Booking = () => {
	const form = useRef<HTMLFormElement | null>(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [loading, setLoading] = useState(false); // New state for loading
	const [charCount, setCharCount] = useState(0); // New state for character count
	const maxMessageLength = 300;
	const minMessageLength = 5;

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		location: '',
		date: '',
		time: '',
		service1: '',
		service2: '',
		service3: '',
		service4: '',
		message: '',
	});

	const [validationErrors, setValidationErrors] = useState({
		name: '',
		email: '',
		phone: '',
		date: '',
		message: '',
	});

	const formatPhoneNumber = (value: string) => {
		const phoneNumber = value.replace(/[^\d]/g, '');
		if (phoneNumber.length <= 3) {
			return phoneNumber;
		} else if (phoneNumber.length <= 6) {
			return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
		} else {
			return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
		}
	};

	const handleChange = (e: any) => {
		const { id, value, checked, type } = e.target;

		if (id === 'message') {
			if (value.length <= 300) {
				setFormData((prevState) => ({
					...prevState,
					[id]: value,
				}));
				setCharCount(value.length); // Update character count
			}
			return; // Exit early if the character limit is reached
		}

		setFormData((prevState) => ({
			...prevState,
			[id]: type === 'checkbox' ? (checked ? value : '') : id === 'phone' ? formatPhoneNumber(value) : value,
		}));
	};

	const validateForm = () => {
		let errors = { name: '', email: '', phone: '', date: '', message: '' };
		let isValid = true;

		if (!formData.name) {
			errors.name = 'Name is required';
			isValid = false;
		}
		if (!formData.email) {
			errors.email = 'Email is required';
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Email is not valid';
			isValid = false;
		}
		if (!formData.phone) {
			errors.phone = 'Phone number is required';
			isValid = false;
		} else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
			errors.phone = 'Phone number is not valid';
			isValid = false;
		}
		if (!formData.date) {
			errors.date = 'Wedding date is required';
			isValid = false;
		}
		if (formData.message.length > maxMessageLength) {
			errors.message = `Message cannot exceed ${maxMessageLength} characters`;
			isValid = false;
		} else if (formData.message.length < minMessageLength) {
			errors.message = `Message must be at least ${minMessageLength} characters long`;
			isValid = false;
		}

		setValidationErrors(errors);
		return isValid;
	};

	// const handleSubmit = async (e: any) => {
	// 	e.preventDefault();

	// 	if (!validateForm()) {
	// 		setFormSubmitted(true);
	// 		return;
	// 	}
	// 	setLoading(true); // Start loading spinner

	// 	emailjs
	// 		.send(
	// 			process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
	// 			process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
	// 			{
	// 				from_title: 'Book an Appointment',
	// 				to_name: 'Mahsa',
	// 				from_name: formData.name,
	// 				from_email: formData.email,
	// 				from_phone: formData.phone,
	// 				from_weddingLocation: formData.location,
	// 				from_weddingDate: formData.date,
	// 				from_weddingTime: formData.time,
	// 				from_services1: formData.service1 || 'NA',
	// 				from_services2: formData.service2 || 'NA',
	// 				from_services3: formData.service3 || 'NA',
	// 				from_services4: formData.service4 || 'NA',
	// 				from_message: formData.message,
	// 			},
	// 			process.env.NEXT_PUBLIC_EMAILJS_USER_PUBLIC_KEY ?? ''
	// 		)
	// 		.then(
	// 			() => {
	// 				setLoading(false); // Stop loading spinner
	// 				setFormData({
	// 					name: '',
	// 					email: '',
	// 					phone: '',
	// 					location: '',
	// 					date: '',
	// 					time: '',
	// 					service1: '',
	// 					service2: '',
	// 					service3: '',
	// 					service4: '',
	// 					message: '',
	// 				});
	// 				setSubmissionSuccess(true); // Show success message
	// 			},
	// 			(error: any) => {
	// 				setLoading(false); // Stop loading spinner
	// 				console.log('FAILED...', error.text);
	// 			}
	// 		);
	// };

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!validateForm()) {
			setFormSubmitted(true);
			return;
		}
		setLoading(true); // Start loading spinner

		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ formData }),
			});

			if (response.ok) {
				console.log('Email sent successfully');
				setLoading(false); // Stop loading spinner
				setFormData({
					name: '',
					email: '',
					phone: '',
					location: '',
					date: '',
					time: '',
					service1: '',
					service2: '',
					service3: '',
					service4: '',
					message: '',
				});
				setSubmissionSuccess(true); // Show success message
			} else {
				console.error('Failed to send email');
				setLoading(false);
			}
		} catch (error) {
			console.error('Error:', error);
			setLoading(false);
		}
	};

	return (
		<>
			<div className='mx-4 sm:mx-auto  max-w-md  mt-10 bg-white shadow-lg rounded-lg overflow-hidden'>
				{/* <div className='text-2xl py-4 px-6 bg-gray-900 text-white bg-pink text-center font-bold uppercase'>Book an Appointment</div> */}
				{/* Show success message if the form is submitted successfully */}
				{submissionSuccess ? (
					<div className=' text-green-500 animate-fadeIn bg-lightGreem'>
						<h2 className='text-xl text-center font-bold text-green py-6 px-4'>
							Thank you! <span className='font-light'>we&apos;ve recived your request and will call you shortly.</span>
						</h2>
					</div>
				) : (
					<>
						<div className='text-2xl py-4 px-6 bg-gray-900 text-white bg-pink text-center font-bold uppercase'>Book an Appointment</div>
						<p className='px-4 text-gray600 mb-2 mt-2'>Please fill out the booking form. We will contact you shortly after submission for further discussion.</p>
						<form className='py-4 px-6' ref={form} onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label className='block text-gray600 mb-2' htmlFor='name'>
									Name <span className='text-red'>*</span>
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='name'
									type='text'
									placeholder='Enter your full name'
									value={formData.name}
									onChange={handleChange}
								/>
								{validationErrors.name && <p className='text-red text-sm '>{validationErrors.name}</p>}
							</div>
							<div className='mb-4'>
								<label className='block text-gray600 mb-2' htmlFor='email'>
									Email <span className='text-red'>*</span>
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='email'
									type='email'
									placeholder='Enter your email'
									value={formData.email}
									onChange={handleChange}
								/>
								{validationErrors.email && <p className='text-red text-sm'>{validationErrors.email}</p>}
							</div>
							<div className='mb-4'>
								<label className='block text-gray600 mb-2 ' htmlFor='phone'>
									Phone Number <span className='text-red'>*</span>
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='phone'
									type='tel'
									placeholder='Enter your phone number'
									value={formData.phone}
									onChange={handleChange}
								/>
								{validationErrors.phone && <p className='text-red text-sm'>{validationErrors.phone}</p>}
							</div>
							<div className='mb-4'>
								<label className='block text-gray600 mb-2 ' htmlFor='date'>
									Wedding Date <span className='text-red'>*</span>
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='date'
									type='date'
									value={formData.date}
									placeholder='Enter your Wedding Date'
									onChange={handleChange}
									style={{
										WebkitAppearance: 'none',
										MozAppearance: 'none',
										appearance: 'none', // Removes default styles
										backgroundColor: '#fff',
										width: '100%', // Full width
										height: '40px', // Force height for consistent input size
									}}
								/>
								{validationErrors.date && <p className='text-red text-sm'>{validationErrors.date}</p>}
							</div>
							<div className='mb-4'>
								<label className='block text-gray600 mb-2' htmlFor='location'>
									Wedding Location
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='location'
									type='location'
									placeholder='Enter your wedding location'
									value={formData.location}
									onChange={handleChange}
								/>
							</div>

							<div className='mb-4'>
								<label className='block text-gray600 mb-2 text' htmlFor='time'>
									Wedding Time
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='time'
									type='time'
									value={formData.time}
									onChange={handleChange}
									placeholder='Enter your Wedding Time'
									style={{
										WebkitAppearance: 'none',
										MozAppearance: 'none',
										appearance: 'none', // Removes default styles
										backgroundColor: '#fff',
										width: '100%', // Full width
										height: '40px', // Force height for consistent input size
									}}
								/>
							</div>
							<div className='mb-4'>
								<label className='block text-gray600 font-medium mb-2'>Services</label>
								<div className='f-mx-2'>
									<div className='px-2 '>
										<label htmlFor='service1' className='block text-gray600 font-medium mb-2'>
											<input
												type='checkbox'
												id='service1'
												value='Wedding Gown Steaming'
												checked={!!formData.service1}
												className='mr-2'
												onChange={handleChange}
											/>
											Wedding Gown Steaming
										</label>
									</div>
									<div className='px-2 '>
										<label htmlFor='service2' className='block text-gray600 font-medium mb-2'>
											<input type='checkbox' id='service2' value='Tuxedo Steaming' checked={!!formData.service2} className='mr-2' onChange={handleChange} />
											Tuxedo Steaming
										</label>
									</div>
									<div className='px-2 '>
										<label htmlFor='service3' className='block text-gray600 font-medium mb-2'>
											<input
												type='checkbox'
												id='service3'
												value='Bridal Party Attire'
												checked={!!formData.service3}
												className='mr-2'
												onChange={handleChange}
											/>
											Bridal Party Attire
										</label>
									</div>
									<div className='px-2 '>
										<label htmlFor='service4' className='block text-gray600 font-medium mb-2'>
											<input
												type='checkbox'
												id='service4'
												value='Other Formal Dress Steaming'
												checked={!!formData.service4}
												className='mr-2'
												onChange={handleChange}
											/>
											Other Formal Dress Steaming
										</label>
									</div>
								</div>
							</div>
							<div className='mb-4'>
								<label className='block text-gray600 mb-2' htmlFor='message'>
									Message
								</label>
								<textarea
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray600 leading-tight focus:outline-none focus:shadow-outline'
									id='message'
									rows={4}
									placeholder='Enter any additional information'
									value={formData.message}
									onChange={handleChange}
								></textarea>
								<p className='text-sm text-gray-600'>
									{charCount}/{maxMessageLength} characters
								</p>
								{validationErrors.message && <p className='text-red text-sm'>{validationErrors.message}</p>}
							</div>
							{/* Error message prompting to fix errors */}
							{formSubmitted && Object.values(validationErrors).some((error) => error) && (
								<div className='bg-orange100 border-l-4 border-orange500 text-orange700 p-4 my-4' role='alert'>
									<p>Please fix the errors above before submittin.</p>
								</div>
							)}
							<div className='flex items-center justify-center mb-4'>
								<button className='bg-gray-900 text-white bg-pink py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline' type='submit'>
									{loading ? (
										<div className='flex items-center'>
											<svg className='animate-spin h-5 w-5 text-white mr-2' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
												<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
												<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
											</svg>
											Submitting...
										</div>
									) : (
										'Book Appointment'
									)}
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</>
	);
};

export default Booking;
