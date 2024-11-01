'use client';
import React, { useState, useRef } from 'react';

type FormData = {
	name: string;
	email: string;
	phone: string;
	location: string;
	date: string;
	time: string;
	package: string;
	services: string[];
	message: string;
};

const Booking = () => {
	const form = useRef<HTMLFormElement | null>(null);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [loading, setLoading] = useState(false); // New state for loading
	const [charCount, setCharCount] = useState(0); // New state for character count
	const maxMessageLength = 300;
	const minMessageLength = 5;

	const [isOpen, setIsOpen] = useState(false);
	const [isOpenPackage, setIsOpenPackage] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
		if (!isOpen) {
			setIsOpenPackage(false);
		}
	};

	const toggleAccordionPackage = () => {
		setIsOpenPackage(!isOpenPackage);
		if (!isOpenPackage) {
			setIsOpen(false);
		}
	};

	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		location: '',
		date: '',
		time: '',
		package: 'Select a Package',
		services: [], // Array to store selected services
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

		if (type === 'checkbox') {
			// Handle checkboxes for services
			setFormData((prevState) => ({
				...prevState,
				services: checked ? [...prevState.services, value] : prevState.services.filter((service) => service !== value),
			}));
		} else if (type === 'radio' && id === 'package') {
			// Handle radio for package
			setFormData((prevState) => ({ ...prevState, package: value }));
		} else if (id === 'phone') {
			// Handle phone formatting
			setFormData((prevState) => ({ ...prevState, [id]: formatPhoneNumber(value) }));
		} else {
			setFormData((prevState) => ({ ...prevState, [id]: value }));
		}
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
		if (formData.message.length > maxMessageLength && formData.message.length > 1) {
			errors.message = `Message cannot exceed ${maxMessageLength} characters`;
			isValid = false;
		} else if (formData.message.length < minMessageLength && formData.message.length > 1) {
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

		try {
			const response = await fetch('/api/send-email-booking', {
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
					package: 'Select a Package',
					services: [],
					message: '',
				});
				setSubmissionSuccess(true); // Show success message
				setCharCount(0);
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
								<label className='block text-gray-600 mb-2'>Services</label>
								<div className='f-mx-2 relative'>
									{/* Accordion Toggle Button */}
									<button
										type='button'
										onClick={toggleAccordion}
										className='w-full text-left font-medium text-gray-700 hover:text-gray-900 px-2 py-2 border rounded-md bg-gray-100 flex items-center justify-between'
									>
										<span>{formData.services.length !== 0 ? formData.services.length + ' Services Selected' : 'Select Services'}</span>

										{/* Arrow Icon */}
										<span>{isOpen ? '▲' : '▼'}</span>
									</button>

									{/* Accordion Content */}
									{isOpen && (
										<div className='absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2'>
											{['Wedding Gown Steaming', 'Tuxedo Steaming', 'Bridal Party Attire', 'Other Formal Dress Steaming'].map((service) => (
												<div className='px-2' key={service}>
													<label className='block text-gray-600 font-medium mb-2'>
														<input
															type='checkbox'
															value={service}
															checked={formData.services.includes(service)}
															className='mr-2 h-4 w-4'
															onChange={handleChange}
														/>
														{service}
													</label>
												</div>
											))}
										</div>
									)}
								</div>
							</div>

							<div className='mb-4'>
								<label className='block text-gray-600 mb-2'>Packages</label>
								<div className='f-mx-2 relative'>
									{/* Accordion Toggle Button */}
									<button
										type='button'
										onClick={toggleAccordionPackage}
										className='w-full text-left font-medium text-gray-700 hover:text-gray-900 px-2 py-2 border rounded-md bg-gray-100 flex items-center justify-between'
									>
										<span>{formData.package !== 'Select a Package' ? formData.package + ' Package' : formData.package} </span>
										{/* Arrow Icon */}
										<span>{isOpenPackage ? '▲' : '▼'}</span>
									</button>

									{/* Accordion Content - Only visible when isOpenPackage is true */}
									{isOpenPackage && (
										<div className='absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg p-2'>
											<div className='px-2'>
												<label htmlFor='package' className='flex text-gray-600  mb-3'>
													<input
														type='radio'
														id='package'
														name='package' // Same name for grouping
														value='Select a Package'
														checked={formData.package === 'Select a Package'}
														className='mr-2 h-5 w-5'
														onChange={(e) => setFormData({ ...formData, package: e.target.value })}
													/>
													Select a Package
												</label>
											</div>
											<div className='px-2'>
												<label htmlFor='package' className='flex text-gray-600  mb-3'>
													<input
														type='radio'
														id='package'
														name='package' // Same name for grouping
														value='Starter'
														checked={formData.package === 'Starter'}
														className='mr-2 h-5 w-5'
														onChange={(e) => setFormData({ ...formData, package: e.target.value })}
													/>
													Starter
												</label>
											</div>
											<div className='px-2'>
												<label htmlFor='package' className='flex text-gray-600 mb-3'>
													<input
														type='radio'
														id='package'
														name='package'
														value='Silver'
														checked={formData.package === 'Silver'}
														className='mr-2 h-5 w-5'
														onChange={(e) => setFormData({ ...formData, package: e.target.value })}
													/>
													<span>Silver</span>
												</label>
											</div>
											<div className='px-2'>
												<label htmlFor='package' className='flex text-gray-600  mb-3'>
													<input
														type='radio'
														id='package'
														name='package'
														value='Gold'
														checked={formData.package === 'Gold'}
														className='mr-2 h-5 w-5'
														onChange={(e) => setFormData({ ...formData, package: e.target.value })}
													/>
													Gold
												</label>
											</div>
											<div className='px-2'>
												<label htmlFor='package' className='block text-gray-600  mb-3'>
													<input
														type='radio'
														id='package'
														name='package'
														value='Platinum'
														checked={formData.package === 'Platinum'}
														className='mr-2 h-5 w-5'
														onChange={(e) => setFormData({ ...formData, package: e.target.value })}
													/>
													Platinum
												</label>
											</div>
										</div>
									)}
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
