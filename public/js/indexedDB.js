function checkForIndexedDb() {
    window.indexedDB =
      window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  
    window.IDBTransaction =
      window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  
    if (!window.indexedDB) {
      console.log("Your browser doesn't support a stable version of IndexedDB.");
      return false;
    }
    return true;
  }

  let db;
  const request = indexedDB.open("budget", 1);
  
  request.onupgradeneeded = ({ target }) => {
    let db = target.result;
    db.createObjectStore("pending", { autoIncrement: true });
  };
  
  request.onsuccess = ({ target }) => {
    db = target.result;
  
    if (navigator.onLine) {
      checkDatabase();
    }
  };
  
  request.onerror = function(event) {
    console.log("Woops! " + event.target.errorCode);
  };

  export {checkForIndexedDb};