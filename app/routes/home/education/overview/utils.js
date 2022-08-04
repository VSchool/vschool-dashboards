export const loader = async () => {
    let localStorage
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    return {
      records: JSON.parse(localStorage.getItem('AllStudentRecords')),
      progress: JSON.parse(localStorage.getItem('AllStudentProgress'))
    }
};