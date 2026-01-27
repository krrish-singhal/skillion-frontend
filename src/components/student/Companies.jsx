import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  const companies = [
    { logo: assets.microsoft_logo, name: 'microsoft' },
    { logo: assets.google_logo, name: 'google' },
    { logo: assets.amazon_logo, name: 'amazon' },
    { logo: assets.apple_logo, name: 'apple' },
    { logo: assets.walmart_logo, name: 'walmart' },
    { logo: assets.accenture_logo, name: 'accenture' },
    { logo: assets.adobe_logo, name: 'adobe' },
    { logo: assets.paypal_logo, name: 'paypal' },
    { logo: assets.ibm_logo, name: 'ibm' },
    { logo: assets.oracle_logo, name: 'oracle' },
    { logo: assets.intel_logo, name: 'intel' },
    { logo: assets.netflix_logo, name: 'netflix' },
   
    { logo: assets.cisco_logo, name: 'cisco' },
    
    { logo: assets.tesla_logo, name: 'tesla' },
  ];

  return (
    <div className='pt-16 pb-10 overflow-x-hidden'>
      <p className='text-base text-gray-500 text-center mb-8'>Trusted by learners from</p>
      <div className='relative overflow-hidden'>
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
          /* Hide scrollbar */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className='flex items-center animate-scroll no-scrollbar'>
          {/* First set of logos */}
          {companies.map((company, index) => (
            <div key={`first-${index}`} className='shrink-0 mx-8 md:mx-12 flex items-center justify-center'>
              <img 
                src={company.logo} 
                alt={`${company.name}_logo`} 
                className='h-12 md:h-16 w-auto max-w-30 md:max-w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300' 
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {companies.map((company, index) => (
            <div key={`second-${index}`} className='shrink-0 mx-8 md:mx-12 flex items-center justify-center'>
              <img 
                src={company.logo} 
                alt={`${company.name}_logo`} 
                className='h-12 md:h-16 w-auto max-w-30 md:max-w-40 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300' 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Companies