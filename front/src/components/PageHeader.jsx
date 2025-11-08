'use client'
import { TypeAnimation } from "react-type-animation";

import React from 'react'

const  PageHeader = () => {
    return(
        <div className="bg-gray-800 text-center py-16 sm:py-20">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">My Story</h1>
            <p className="mt-4 text-lg text-gray-300">
            <TypeAnimation
                sequence={[
                "From Engineering Systems to Empowering People", 2000,
                "Bridging Logic and Leadership", 2000,
                "Turning Mechanical Thinking into Business Strategy", 2000,
                "Building Systems That Empower Humans", 2000,
                ]}
                speed={50}
                repeat={Infinity}
            />
            </p>
        </div>
    )
};

export default PageHeader
