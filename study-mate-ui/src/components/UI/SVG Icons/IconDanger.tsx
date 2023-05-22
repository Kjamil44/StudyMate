import React from 'react'

const IconDanger = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg fill="none" viewBox="0 0 24 24" height="8rem" width="8rem" {...props}>
          <path
            fill="#4d716a"
            d="M12 6a1 1 0 011 1v6a1 1 0 11-2 0V7a1 1 0 011-1zM12 16a1 1 0 100 2 1 1 0 000-2z"
          />
          <path
            fill="#4d716a"
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM4 12a8 8 0 1016 0 8 8 0 00-16 0z"
            clipRule="evenodd"
          />
        </svg>
      );
}

export default IconDanger