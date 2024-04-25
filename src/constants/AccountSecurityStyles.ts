export const inputClassName = (isDarkMode: boolean) =>
  `p-2 border-b ${
    isDarkMode
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-white text-gray-800 border-gray-300"
  }`;

export const buttonClassName = (isDarkMode: boolean) =>
  `${
    isDarkMode ? "bg-green-400/50 border-white" : "bg-green-100 border-black"
  } rounded-full border-2 px-4 py-2 mt-4 mb-2`;
