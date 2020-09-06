/**
 * @param {String} buttonClasses
 * @param {String} buttonStyle
 * @param {Boolean} buttonSubmit
 * @param {String} buttonContent
 */
export const MainButtonTemplate = `
  <button 
    class="{{ buttonClasses }}"
    style="{{ buttonStyle }}"
    data-submit="{{ buttonSubmit }}"
  >
    {{{ buttonContent }}}
  </button>
`;
