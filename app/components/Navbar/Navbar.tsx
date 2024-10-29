import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from './Drawer';
import Drawerdata from './Drawerdata';
import Booking from './Booking';
import Image from 'next/image';

interface NavigationItem {
	name: string;
	href: string;
	current: boolean;
}

const navigation: NavigationItem[] = [
	{ name: 'Home', href: '/', current: false },
	{ name: 'About us', href: '/#about-section', current: false },
	{ name: 'Services', href: '/#services-section', current: false },
	{ name: 'Packages', href: '/#packages-section', current: false },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		// <Disclosure as='nav' className='navbar'>
		<>
			<div className='z-50 mx-auto  p-3 md:p-6 lg:px-8 bg-white full-width'>
				<div className='relative flex h-12 sm:h-18 items-center justify-center'>
					<div className='flex flex-1 items-center sm:justify-between'>
						{/* LOGO */}

						<div className='flex sm:hidden flex-shrink-0 items-center border-right'>
							<Link href='/'>
								<Image src='/images/Logo/logo-2.png' alt='logo' width={80} height={80} />
							</Link>
						</div>
						<div className='hidden sm:flex flex-shrink-0 items-center border-right'>
							<Link href='/'>
								<Image src='/images/Logo/logo-2.png' alt='logo' width={100} height={100} />
							</Link>
						</div>

						{/* LINKS */}

						<div className='hidden lg:flex items-center border-right '>
							<div className='flex justify-end space-x-4'>
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={classNames(
											item.current ? 'bg-black' : 'navlinks hover:opacity-100',
											'px-3 py-4 rounded-md text-lg font-normal opacity-50 hover:text-black space-links'
										)}
										aria-current={item.href ? 'page' : undefined}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
						<div className='gap-6 hidden lg:flex'>
							{/* <Link href='tel:6192191936' className='text-blue-500 hover:underline flex items-center gap-2'>
								<Image src={'/images/Navbar/phone.svg'} alt='phone-image' width={19} height={19} />
								<p className='text-lg font-medium'>(619) 219-1936</p>
							</Link> */}

							<Booking />
						</div>
					</div>

					{/* DRAWER FOR MOBILE VIEW */}

					{/* DRAWER ICON */}

					<div className='block lg:hidden'>
						<Bars3Icon className='block h-6 w-6' aria-hidden='true' onClick={() => setIsOpen(true)} />
					</div>

					{/* DRAWER LINKS DATA */}

					<Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
						<Drawerdata />
					</Drawer>
				</div>
			</div>
		</>
		// </Disclosure>
	);
};

export default Navbar;
