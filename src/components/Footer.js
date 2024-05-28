import React from 'react';
import Facebook from "../images/facebook.png";
import Instgram from "../images/instagram.png";
import Linkedin from "../images/linkedin.png";
import Pinterest from "../images/pinterest.png";
import Twitter from "../images/twitter.png";
import Youtube from "../images/youtube.png";

function Footer() {
  return (
    <div className='footer py-4'>
        <div className='col_container grid grid-rows-2 md:grid-rows-1 gap-4 md:gap-0 grid-cols-2 md:grid-cols-4 mb-14 '>
            <div className='copmany_det  pl-14 md:pl-0 md:text-center'>
                <p style={{color: '#CD3A3A',fontWeight: 800}}>Company</p>
                <p>About Us</p>
                <p>Career</p>
                <p>Blog</p>
                <p>Contact Us</p>
            </div>

            <div className='policy_det pl-4 md:text-center'>
                <p style={{color: '#CD3A3A',fontWeight: 800}}>Policies</p>
                <p>Private Policies</p>
                <p>Term of Use</p>
                <p>Secure Shopping</p>
                <p>Copyright</p>
            </div>

            <div className='help_det pl-14 md:text-center'>
                <p style={{color: '#CD3A3A',fontWeight: 800}}>Help</p>
                <p>Payment</p>
                <p>Shipping</p>
                <p>Return</p>
                <p>FAQ</p>
            </div>

            <div className='misc_det pl-4 md:text-center'>
                <p style={{color: '#CD3A3A',fontWeight: 800}}>Misc</p>
                <p>Affiliate</p>
                <p>Sitemap</p>
            </div>
        </div>

        <div className='socials'>
            <ul className='social_ul flex justify-center gap-4 items-center h-14 '>
                <li>
                    <img className='h-8' src={Facebook}/>
                </li>
                <li id="twitter">
                    <img className='h-7' src={Twitter}/>
                </li>
                <li>
                    <img className='h-8' src={Linkedin}/>
                </li>
                <li>
                    <img className='h-8' src={Pinterest}/>
                </li>
                <li>
                    <img className='h-8' src={Youtube}/>
                </li>
                <li>
                    <img className='h-8' src={Instgram}/>
                </li>
            </ul>
        </div>
        <div className='bottom_line w-[90%] text-sm text-center m-auto'>
            <p>Copyright @ 2023. Chapterly.com. All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer