import ProgressBar from "./ProgressBar";
import React, { useState } from 'react'

const SkillCard = ({ skill, imgUrl, progress }) => {
    const [flipped, setFlipped] = useState(false);
    return (
        <div
            className={`relative w-48 h-64 transition-transform transform hover:scale-105 ${flipped ? 'rotate-x-180' : ''
                }`}
            onClick={() => setFlipped(!flipped)}
        >
            <div
                className="absolute inset-0 w-full h-full transition-all transform rotate-x-180"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front of the Card */}
                <div
                    className={`w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center p-4 cursor-pointer transition-all duration-500 transform rotate-x-0`}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <img
                        src={imgUrl}
                        alt={skill}
                        className="w-24 h-24 object-cover rounded-full transition-all transform hover:scale-110"
                    />
                </div>
                {/* Back of the Card */}
                <div
                    className="w-full h-full bg-orange-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 text-center text-black font-bold"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateX(180deg)',
                    }}
                >
                    <p className="text-xl mb-2">{skill}</p>
                    <ProgressBar skill={skill} percentage={progress} />
                </div>
            </div>
        </div>
    )
}

export default SkillCard