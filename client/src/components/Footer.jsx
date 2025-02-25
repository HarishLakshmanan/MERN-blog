import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import{BsFacebook,BsInstagram,BsTwitterX,BsGithub,BsLinkedin} from 'react-icons/bs';

export default function Footerom() {
  return (
    <div>
    <Footer container className='border border-t-8 border-test-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-col-1'>
                <div className='mt-5'>
                <Link
                 to='/'
                 className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                 <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    Main
                 </span>
                    BloG
                </Link>
                </div>
                <div className='grid grid-cols-2 gap-7 mt-4 sm:grid-cols-3 sm:gap-6 '>
                  <div>
                    <Footer.Title title='About'/>
                    <Footer.LinkGroup col>
                      <Footer.Link
                      href='#'
                      target=''
                      rel=''
                      >
                        Projects
                      </Footer.Link>
                      <Footer.Link
                      href='/about'
                      target='_blank'
                      rel='noopener noreferrer'
                      >
                        Main BloG
                      </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <Footer.Title title='Follow Us'/>
                    <Footer.LinkGroup col>
                      <Footer.Link
                      href='#'
                      target=''
                      rel=''
                      >
                        Github
                      </Footer.Link>
                      <Footer.Link
                      href='#'
                      target='_blank'
                      rel='noopener noreferrer'
                      >
                        Discord
                      </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <Footer.Title title='LEGAL'/>
                    <Footer.LinkGroup col>
                      <Footer.Link
                      href='#'
                      target=''
                      rel=''
                      >
                        Privacy Policy
                      </Footer.Link>
                      <Footer.Link
                      href='#'
                      target='_blank'
                      rel='noopener noreferrer'
                      >
                        Terms &amp; Conditions
                      </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                </div>
            </div>
            <Footer.Divider/>
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
              <Footer.Copyright herf='#' by='main BloG' year={new Date().getFullYear()} />
            </div>
            <div className='flex gap-5 sm:mt-0 mt-4 sm:justify-center'>
              <Footer.Icon href='#' icon={BsFacebook} />
              <Footer.Icon href='#' icon={BsInstagram} />
              <Footer.Icon href='#' icon={BsTwitterX} />
              <Footer.Icon href='#' icon={BsGithub} />
              <Footer.Icon href='#' icon={BsLinkedin} />

            </div>
        </div>
    </Footer>
    </div>
    
  )
}
