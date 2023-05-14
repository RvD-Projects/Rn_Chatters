export const capitalizeFirst = (text) => {
  if (text?.length < 1) {
    return text;
  }
  return text.charAt(0).toUpperCase()
    + text.slice(1);;
};

export const capitalizeAll = (text, separator = " ") => {
    if (text?.length < 1) {
      return text;
    }  
    
    let sentence = "";
    const split = text.split(separator);
    const words = split.map(word => {
        return capitalizeFirst(word);
    });

    return words.join(separator);
  };
  
