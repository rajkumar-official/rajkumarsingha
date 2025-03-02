import React from 'react'

const ProgressBar = ({ skill, percentage }) => {
    return (
        <div className="w-full mt-2">
            <div className="flex justify-between mb-1 text-xs font-medium text-gray-700">
                <span>{skill}</span>
                <span>{percentage}/10</span>
            </div>
            <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full">
                        <div
                            className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                            style={{ width: `${(percentage / 10) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar