export const inputClassName = (isDarkMode: boolean) =>
  `p-2 border-b ${
    isDarkMode
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-white text-gray-800 border-gray-300"
  }`;

export const buttonClassName = (isDarkMode: boolean) =>
  `py-2 px-4 rounded-full border-2 ${
    isDarkMode
      ? "bg-green-600 border-green-600"
      : "bg-green-500 border-green-500"
  }`;
