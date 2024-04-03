export const inputClassName = (isDarkMode: boolean) =>
  `p-2 border-b ${
    isDarkMode
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-white text-gray-800 border-gray-300"
  }`;

export const buttonClassName = (isDarkMode: boolean) =>
  `py-2 px-4 rounded-full border-2 ${
    isDarkMode ? "bg-blue-600 border-blue-600" : "bg-blue-500 border-blue-500"
  }`;
