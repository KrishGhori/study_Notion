import React, { useEffect, useRef, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { BsCart3 } from "react-icons/bs";
import ProfileDropDown from '../Core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDropdown } from "react-icons/io";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import useOnClickOutside from '../../hooks/useOnClickOutside'

const Nav = () => {

    const {token} = useSelector( (state) => state.auth)
    const {user} = useSelector( (state)=> state.profile)
    const {totalItems} = useSelector( (state)=> state.cart)

    const [subLink,setsubLink] = useState([]);
    const [catalogOpen, setCatalogOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)
    const catalogRef = useRef(null)

    const hasValidToken = Boolean(token) && token !== "undefined" && token !== "null";
    const isAuthenticated = hasValidToken && Boolean(user);

    useEffect(() => {
        let isMounted = true;

        apiConnector("GET", categories.CATEGORIES_API)
            .then((result) => {
                if (!isMounted) return;
                const categoryData = Array.isArray(result?.data?.allCategory)
                    ? result.data.allCategory
                    : [];
                setsubLink(categoryData);
            })
            .catch((error) => {
                if (!isMounted) return;
                console.log("could not find the categorys list");
                console.log(error);
                setsubLink([]);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
        setMobileCatalogOpen(false)
    }

    useOnClickOutside(catalogRef, () => setCatalogOpen(false))

  return (
    <div className='fixed left-0 top-0 z-50 flex w-full min-h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-gradient-to-r from-richblack-600 via-richblack-700 to-richblack-800 px-3 sm:px-2'>
        <div className='flex w-full max-w-screen-xl items-center justify-between gap-2 py-2 sm:w-11/12 sm:gap-3'>
        {/* LOGO */}
            <Link to="/" onClick={closeMobileMenu}>
                <img src={Logo} alt="Logo" width={140} height={38} loading="lazy" className='w-[120px] sm:w-[140px] md:w-[160px]' />
            </Link>

            {/* nav links */}
            <nav className='hidden md:block'>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link , index)=>(
                            <li key={index}> 
                                                                {link.title === "Catalog" ?(
                                                                    <div ref={catalogRef} className='relative flex items-center gap-2'>
                                            <button
                                              type='button'
                                                                                            className='inline-flex shrink-0 items-center gap-1 whitespace-nowrap'
                                              onClick={() => setCatalogOpen((current) => !current)}
                                              aria-expanded={catalogOpen}
                                            >
                                                                                                <span className='nav-link-animated'>{link.title}</span>
                                                <IoIosArrowDropdown className='mt-1'/>
                                            </button>

                                            <div className={`${catalogOpen ? "visible translate-y-0 scale-100 opacity-100 pointer-events-auto" : "invisible translate-y-2 scale-95 opacity-0 pointer-events-none"} absolute left-0 top-full z-50 mt-3 w-[320px] origin-top rounded-2xl border border-richblack-700/80 bg-richblack-900/95 p-3 text-richblack-900 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 ease-out`}> 
                                                <div className='mb-3 rounded-xl bg-gradient-to-r from-richblack-800 to-richblack-700 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-richblack-100'>
                                                    Explore Categories
                                                </div>
                                                {
                                                    Array.isArray(subLink) && subLink.length > 0 ? (
                                                        <div className='flex max-h-[320px] flex-col gap-2 overflow-y-auto pr-1'>
                                                            {subLink.map((item, index) => (
                                                                <Link
                                                                    className='group/item flex items-center justify-between rounded-xl border border-transparent px-3 py-2 text-sm text-richblack-100 transition-all duration-200 ease-out hover:border-yellow-100/40 hover:bg-richblack-800 hover:pl-4 hover:text-yellow-25'
                                                                    to={item?.name ? `/catalog/${item.name.split(" ").join("-").toLowerCase()}` : "#"}
                                                                    key={index}
                                                                    onClick={() => setCatalogOpen(false)}
                                                                >
                                                                    <span>{item?.name || item?.title || "Category"}</span>
                                                                    <span className='h-2 w-2 rounded-full bg-yellow-50 opacity-0 transition-all duration-200 group-hover/item:opacity-100'></span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className='rounded-xl border border-richblack-700 bg-richblack-800 px-3 py-4 text-sm text-richblack-200'>No categories available</div>
                                                    )
                                                }

                                            </div>
                                    </div>

                                ) : (
                                  <Link to={link?.path}>
                                                                        <p className={`nav-link-animated ${matchRoute(link?.path) ? "text-yellow-25 nav-link-active" : "text-richblack-25"}`}>
                                        {link.title}
                                    </p>
                                    
                                  </Link>
                                )}
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* login/signup/dashboard */}
            <div className='flex items-center gap-x-2 sm:gap-x-4'>
                    {
                        user && user?.accounType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative flex items-center justify-center text-white' onClick={closeMobileMenu}>
                                <BsCart3 className='text-xl' />
                                {totalItems > 0 && (
                                    <span className='absolute -right-3 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-yellow-50 px-1 text-[11px] font-bold leading-none text-richblack-900'>
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )
                    }
                    {
                        !isAuthenticated && (
                            <Link to="/login" className='hidden md:block' onClick={closeMobileMenu}>
                                <button className='btn-hover-lift rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-sm text-richblack-5 sm:px-[12px] sm:py-[8px]'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        !isAuthenticated && (
                            <Link to="/signup" className='hidden md:block' onClick={closeMobileMenu}>
                                <button className='btn-hover-lift rounded-md border border-yellow-100 bg-gradient-to-r from-richblack-200 via-richblack-500 to-richblack-900 px-3 py-2 text-sm text-white sm:px-[12px] sm:py-[8px]'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                            isAuthenticated && <ProfileDropDown /> 
                    }

                        <button
                        type='button'
                        className={`inline-flex items-center justify-center rounded-lg border p-2 text-richblack-25 transition-all duration-200 md:hidden ${mobileMenuOpen ? "border-yellow-100 bg-richblack-700 text-yellow-50" : "border-richblack-600 hover:border-richblack-400 hover:text-white"}`}
                        onClick={() => setMobileMenuOpen((current) => !current)}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                        >
                        {mobileMenuOpen ? <HiX className='text-xl' /> : <HiOutlineMenuAlt3 className='text-xl' />}
                        </button>
            </div> 
        </div>

                    <div className={`md:hidden fixed inset-0 top-14 z-40 transition-all duration-300 ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                        <button
                            type='button'
                            aria-label='Close mobile menu backdrop'
                            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
                            onClick={closeMobileMenu}
                        />

                        <div className={`absolute left-2 right-2 top-2 rounded-2xl border border-richblack-700 bg-gradient-to-b from-richblack-800 to-richblack-900 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-all duration-300 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}>
                            <div className='mb-2 rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-richblack-300'>
                                Navigation
                            </div>

                            <ul className='flex flex-col gap-1 text-richblack-25'>
                                {NavbarLinks.map((link, index) => (
                                        <li key={index}>
                                                {link.title === "Catalog" ? (
                                                        <div>
                                                                <button
                                                                    type='button'
                                                                    className='flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 hover:bg-richblack-800'
                                                                    onClick={() => setMobileCatalogOpen((current) => !current)}
                                                                    aria-expanded={mobileCatalogOpen}
                                                                >
                                                                    <span>Catalog</span>
                                                                    <IoIosArrowDropdown className={`transition-transform duration-200 ${mobileCatalogOpen ? "rotate-180" : "rotate-0"}`} />
                                                                </button>

                                                                <div className={`${mobileCatalogOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden pl-3 transition-all duration-300`}>
                                                                    {Array.isArray(subLink) && subLink.length > 0 ? (
                                                                        subLink.map((item, categoryIndex) => (
                                                                            <Link
                                                                                key={categoryIndex}
                                                                                to={item?.name ? `/catalog/${item.name.split(" ").join("-").toLowerCase()}` : "#"}
                                                                                className='block rounded-lg px-3 py-2 text-sm text-richblack-100 transition-all duration-200 hover:bg-richblack-800 hover:text-yellow-25'
                                                                                onClick={closeMobileMenu}
                                                                            >
                                                                                {item?.name || item?.title || "Category"}
                                                                            </Link>
                                                                        ))
                                                                    ) : (
                                                                        <p className='px-3 py-2 text-sm text-richblack-300'>No categories available</p>
                                                                    )}
                                                                </div>
                                                        </div>
                                                ) : (
                                                        <Link
                                                            to={link?.path}
                                                            className={`block rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-richblack-800 ${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}
                                                            onClick={closeMobileMenu}
                                                        >
                                                            {link.title}
                                                        </Link>
                                                )}
                                        </li>
                                ))}
                                            </ul>

                        {!isAuthenticated && (
                                            <div className='mt-4 grid grid-cols-2 gap-2'>
                                                <Link to="/login" className='w-full' onClick={closeMobileMenu}>
                                                <button className='w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-sm text-richblack-5'>
                                                        Log in
                                                </button>
                                        </Link>
                                                <Link to="/signup" className='w-full' onClick={closeMobileMenu}>
                                                <button className='w-full rounded-md border border-yellow-100 bg-gradient-to-r from-richblack-200 via-richblack-500 to-richblack-900 px-3 py-2 text-sm text-white'>
                                                        Sign Up
                                                </button>
                                        </Link>
                                </div>
                        )}
                                        </div>
                </div>
    </div>
  )
}

export default Nav
