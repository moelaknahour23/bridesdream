'use client';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
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

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!validateForm()) {
			setFormSubmitted(true);
			return;
		}
		setLoading(true); // Start loading spinner

		// Send email to your team
		emailjs
			.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '', // Template ID for your team
				{
					from_title: 'Contact Us',
					to_name: 'Mahsa',
					from_name: formData.name,
					from_email: formData.email,
					from_phone: formData.phone,
					from_message: formData.message,
				},
				process.env.NEXT_PUBLIC_EMAILJS_USER_PUBLIC_KEY ?? ''
			)
			.then(() => {
				// After successfully sending the email to your team, send the auto-reply to the user
				emailjs
					.send(
						process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
						process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_REPLY ?? '',
						{
							from_name: formData.name, // Auto-reply uses this data to personalize the email
							to_email: formData.email, // Send the auto-reply to the user's email
						},
						process.env.NEXT_PUBLIC_EMAILJS_USER_PUBLIC_KEY ?? ''
					)
					.then(() => {
						setLoading(false); // Stop loading spinner
						setFormData({
							name: '',
							email: '',
							phone: '',
							message: '',
						});
						setSubmissionSuccess(true); // Show success message
					})
					.catch((error) => {
						setLoading(false); // Stop loading spinner
						console.error('Auto-reply failed...', error.text);
					});
			})
			.catch((error) => {
				setLoading(false); // Stop loading spinner
				console.error('Failed to send email to team...', error.text);
			});
	};

	return (
		<div className='flex justify-center   p-6  flex-col  md:flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8'>
			<div className='bg-superLightBlue w-full max-w-[700px] h-[600px] shadow-xl rounded-r-2xl p-8 justify-center items-center '>
				{/* Left Form */}
				<div className='w-full lg:w-2/3'>
					<h2 className='text-3xl font-semibold mb-4 text-pink'>Contact Us</h2>
					{/* <p className='text-gray-600 mb-6'>
						We are deeply committed to delivering unparalleled service and unwavering support to ensure your experience exceeds expectations.
					</p> */}

					<form className='space-y-4' onSubmit={handleSubmit}>
						<div className=''>
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='name'>
									Name <span className='text-red'>*</span>
								</label>
								<input
									id='name'
									type='text'
									placeholder='Enter your full name'
									className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
									value={formData.name}
									onChange={handleChange}
								/>
								{validationErrors.name && <p className='text-red text-sm '>{validationErrors.name}</p>}
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='email'>
								Email <span className='text-red'>*</span>
							</label>
							<input
								type='email'
								id='email'
								placeholder='Enter your email'
								className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
								value={formData.email}
								onChange={handleChange}
							/>
							{validationErrors.email && <p className='text-red text-sm '>{validationErrors.email}</p>}
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='phone'>
								Phone Number <span className='text-red'>*</span>
							</label>
							<input
								id='phone'
								type='tel'
								placeholder='Enter your phone number'
								className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
								value={formData.phone}
								onChange={handleChange}
							/>
							{validationErrors.phone && <p className='text-red text-sm '>{validationErrors.phone}</p>}
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='message'>
								Message <span className='text-red'>*</span>
							</label>
							<textarea
								id='message'
								placeholder='Enter your message...'
								className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
								rows={4}
								value={formData.message}
								onChange={handleChange}
							/>
							<p className='text-sm text-gray-600'>
								{charCount}/{maxMessageLength} characters
							</p>
							{validationErrors.message && <p className='text-red text-sm '>{validationErrors.message}</p>}
						</div>

						{formSubmitted && Object.values(validationErrors).some((error) => error) && (
							<div className='bg-orange100 border-l-4 border-orange500 text-orange700 p-4 my-4' role='alert'>
								<p>Please fix the errors above before submittin.</p>
							</div>
						)}
						<div className='flex items-center justify-center mb-4'>
							<button type='submit' className='w-full py-2 px-4 bg-blue-600 text-white bg-pink rounded-md hover:bg-blue-700'>
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
				</div>
			</div>
			{/* Right Info Section */}
			<div className='w-auto max-w-[600px] lg:w-2/3 space-y-4 sm:ml-8 '>
				{/* Contact Section */}
				<div className='bg-gray100 p-6 h-[130px] rounded-2xl flex items-center space-x-4'>
					<FontAwesomeIcon icon={faPhone} className='h-8 w-8 text-pink' />
					<div>
						<h3 className='font-semibold text-lg'>Contact</h3>
						<p className='text-sm'>You can contact us at:</p>
						<p className='text-sm'>
							<Link className='text-blue400' href='tel:6192191936'>
								619-219-1936
							</Link>
						</p>
					</div>
				</div>

				{/* Email Section */}
				<div className='bg-gray100 p-6 h-[130px] rounded-2xl  flex items-center space-x-4'>
					<FontAwesomeIcon icon={faEnvelope} className='h-8 w-8 text-pink' />
					<div>
						<h3 className='font-semibold text-lg'>Email</h3>
						<p className='text-sm'>We&apos;re usually replying within 24 hours</p>
						<p>
							<Link className='text-blue400 text-sm' href='mailto:contact@bridesdream.org'>
								contact@bridesdream.org
							</Link>
						</p>
					</div>
				</div>

				{/* Working Hours Section */}
				<div className='bg-gray100 p-6  h-[130px] rounded-2xl flex items-center space-x-4'>
					<FontAwesomeIcon icon={faClock} className='h-8 w-8 text-pink' />
					<div>
						<h3 className='font-semibold text-lg'>Working Hours</h3>
						<p className='text-sm'>Monday to Sunday - 9:00 am to 7:00 pm</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
