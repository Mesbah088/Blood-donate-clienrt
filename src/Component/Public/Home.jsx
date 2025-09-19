import React from 'react';
import Banner from './Banner';
import Features from './Features';
import HowItWorks from './HowItworks';
import CTASection from './CTASection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Features/>
            <HowItWorks/>
            <CTASection/>
        </div>
    );
};

export default Home;