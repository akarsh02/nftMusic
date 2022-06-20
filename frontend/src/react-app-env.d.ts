/// <reference types="react-scripts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CONTRACT_ADDRESS: string;
      REACT_APP_API_KEY: string;
      REACT_APP_SERVER_URL: string;
      REACT_APP_APPID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
