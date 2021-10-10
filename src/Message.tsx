import { Popover, Transition } from '@headlessui/react'
import { PropsWithChildren } from 'react';

export const Message:React.FC<PropsWithChildren<{ text:string }>> = ({ text, children }) => {
  return (
    <Popover className="relative">
      <Popover.Button className="rounded-full">{children}</Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel  className="absolute z-10 w-max right-0 mr-16 mt-[-3.25rem] justify-center items-center bg-gray-200 text-black font-medium rounded-xl overflow-hidden">
        {({ close }) => (
            <>
                <div className="py-2 px-4 text-left justify-start">{text}</div>
                <div className="w-full bg-gray-300 px-2 flex flex-row justify-center items-center">
                    <span className="w-full px-2">Message back:</span>
                    <input autoFocus className="bg-transparent outline-none py-2 text-sm" onKeyUp={(event)=>{event.key === "Enter" && close();}}/>
                </div>
            </>
            )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}