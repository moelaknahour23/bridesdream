'use client';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Booking = () => {
	const form = useRef<HTMLFormElement | null>(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [loading, setLoading] = useState(false); // New state for loading
	const [charCount, setCharCount] = useState(0); // New state for character count
	const maxMessageLength = 300; // Maximum character length for the message
	const minMessageLength = 5;
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		message: '',
	});

	const [validationErrors, setValidationErrors] = useState({
		name: '',
		email: '',
		phone: '',
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

		// For message field, prevent typing beyond 300 characters
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

		// For other fields
		setFormData((prevState) => ({
			...prevState,
			[id]: type === 'checkbox' ? (checked ? value : '') : id === 'phone' ? formatPhoneNumber(value) : value,
		}));
	};

	const validateForm = () => {
		let errors = { name: '', email: '', phone: '', message: '' };
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
		if (!formData.message) {
			errors.message = 'Message is required';
			isValid = false;
		} else if (formData.message.length > maxMessageLength) {
			errors.message = `Message cannot exceed ${maxMessageLength} characters`;
			isValid = false;
		} else if (formData.message.length < minMessageLength) {
			errors.message = `Message must be at least ${minMessageLength} characters long`;
			isValid = false;
		}

		setValidationErrors(errors);
		return isValid;
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!validateForm()) {
			setFormSubmitted(true);
			return;
		}
		setLoading(true); // Start loading spinner

		emailjs
			.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
				{
					to_name: 'Mahsa',
					from_name: formData.name,
					from_email: formData.email,
					from_phone: formData.phone,
					from_message: formData.message,
				},
				process.env.NEXT_PUBLIC_EMAILJS_USER_PUBLIC_KEY ?? ''
			)
			.then(
				() => {
					setLoading(false); // Stop loading spinner
					setFormData({
						name: '',
						email: '',
						phone: '',
						message: '',
					});
					setCharCount(0); // Reset character count
					setSubmissionSuccess(true); // Show success message
				},
				(error: any) => {
					setLoading(false); // Stop loading spinner
					console.log('FAILED...', error.text);
				}
			);
	};

	return (
		<div className=''>
			<div className='mx-4 sm:mx-auto max-w-md mt-10 bg-white shadow-lg rounded-lg overflow-hidden'>
				{/* <div className='text-2xl py-4 px-6 bg-gray-900 text-white bg-pink text-center font-bold uppercase'>Book an Appointment</div> */}
				{/* Show success message if the form is submitted successfully */}
				{submissionSuccess ? (
					// <div className=' text-green-500 animate-fadeIn bg-lightGreem'>
					// 	<h2 className='text-xl text-center font-bold text-green py-6 px-4'>
					// 		Thank you! <span className='font-light'>we've recived your request and will call you shortly.</span>
					// 	</h2>
					// </div>

					<div className='bg-teal100 border-t-4 border-teal500 rounded-b text-teal900 px-4 py-3 shadow-md' role='alert'>
						<div className='flex'>
							<div className='py-1'>
								<svg className='fill-current h-6 w-6 text-teal500 mr-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
									<path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
								</svg>
							</div>
							<div>
								<p className='text-lg font-bold'>
									Thank you! <span className='font-light'> we&apos;ve recived your request and will call you shortly.</span>
								</p>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className='text-2xl space-x-2 py-4 px-6 bg-gray-900 text-white bg-pink text-center font-bold uppercase'>
							<span>Contact</span>
							<span>Us</span>
						</div>
						<form className='py-4 px-6' ref={form} onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label className='block text-gray-700 mb-2' htmlFor='name'>
									Name <span className='text-red'>*</span>
								</label>
								<input
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='name'
									type='text'
									placeholder='Enter your name'
									value={formData.name}
									onChange={handleChange}
								/>
								{validationErrors.name && <p className='text-red text-sm '>{validationErrors.name}</p>}
							</div>
							<div className='mb-4'>
								<label className='block text-gray-700 mb-2' htmlFor='email'>
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
								<label className='block text-gray-700 mb-2 ' htmlFor='phone'>
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
								<label className='block text-gray-700 mb-2' htmlFor='message'>
									Message <span className='text-red'>*</span>
								</label>
								<textarea
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
										'Send Message'
									)}
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default Booking;
