class Utility {
    static highlightText(text, value) {
      return text.replace(value, '<span>' + value + '</span>');
    }
  
    static transformToTitleCase(text) {
      return text.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
  }
  
  export default Utility;