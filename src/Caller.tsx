import React from 'react'

interface CallerInterface {
  profile: string;
  name: string;
}

const Caller: React.FC<CallerInterface> = ({ name, profile }) => {
  return (
    <div className="flex flex-row space-x-10 transition-all scale-150">
      <div className="w-full flex flex-col space-x-10">
        <div className="w-max h-20 flex flex-row">
          <div className="flex flex-row">
            <div className="w-20 h-full absolute bg-gray-700 rounded-full p-1 animate-ping"></div>
            <div className="w-20 h-full bg-blue-700 rounded-full p-1">
              <div className="bg-gray-900 w-full h-full rounded-full p-1">
                <div className="flex flex-row bg-black w-full h-full rounded-full overflow-hidden">
                  <img
                    alt=""
                    src={profile}
                    className="scale-100 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start p-4 text-white">
            <div className="flex flex-row w-full space-x-2 items-center">
              <span className="text-2xl w-full">{name}</span>
            </div>
            <div className="space-x-1 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Caller
