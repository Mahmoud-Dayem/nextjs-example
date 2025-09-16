export const theme = {
  colors: {
    primary: {
      main: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-600',
      textHover: 'hover:text-blue-500',
      ring: 'focus:ring-blue-500',
      border: 'border-blue-600',
    },
    secondary: {
      main: 'bg-gray-50',
      hover: 'hover:bg-gray-100',
      text: 'text-gray-600',
      textHover: 'hover:text-gray-700',
      ring: 'focus:ring-gray-500',
      border: 'border-gray-300',
    },
    success: {
      main: 'bg-green-600',
      hover: 'hover:bg-green-700',
      text: 'text-green-600',
      textHover: 'hover:text-green-500',
      ring: 'focus:ring-green-500',
      border: 'border-green-600',
    },
    error: {
      main: 'bg-red-600',
      hover: 'hover:bg-red-700',
      text: 'text-red-600',
      textHover: 'hover:text-red-500',
      ring: 'focus:ring-red-500',
      border: 'border-red-600',
    },
    warning: {
      main: 'bg-yellow-600',
      hover: 'hover:bg-yellow-700',
      text: 'text-yellow-600',
      textHover: 'hover:text-yellow-500',
      ring: 'focus:ring-yellow-500',
      border: 'border-yellow-600',
    }
  },
  text: {
    heading: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
    }
  },
  button: {
    base: 'flex justify-center w-full py-2 px-4 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: 'text-white border-transparent',
    secondary: 'text-gray-700 border-gray-300 bg-white',
  },
  input: {
    base: 'appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
    default: 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
    error: 'border-red-300 focus:ring-red-500 focus:border-red-500',
  }
};