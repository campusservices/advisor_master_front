import { LOCALHOST_BASE_URL } from "../constants/environment_constants";
import axios from "axios";
import { EXTERNAL_SERVER_ERROR, UNAUTHORIZED } from "../constants/HttpStatus";

export const upload = (options = {}) => {
  options.url = `${LOCALHOST_BASE_URL}/advisors/uploadFile`;

  return axios
    .post(options.url, options.formData,{headers:{"Content-type":"multipart/form-data"} })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

};

export const exportToSpreadsheet =(options={}) => {
  const url = `${LOCALHOST_BASE_URL}/advisors/record/assignments/csv`;
  console.log(options.deptCode);
  const params = options.deptCode;
  
  return axios
          .post( url, params)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err;
          });
}

export const download = (options = {}) => {
  const fileName = "assignments";
  options.url = `${LOCALHOST_BASE_URL}/advisors/download/csv/${fileName}`;
  const mime = "xls";
  return axios
    .get(options.url,{responseType:'blob',timeout: 30000})
    .then((res) => {
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `${fileName}.${mime}`
        );
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        
        link.parentNode.removeChild(link);
      
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

///
export const loadTemplate = (options={}) => {
  
  options.url = `${LOCALHOST_BASE_URL}/advisors/templates`;
  const params = options.deptCode;
   return axios
          .post( options.url, params)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err;
          });

};

export const process = (options={}) => {
  options.url = `${LOCALHOST_BASE_URL}/advisors/process/assignments`;
  const params = options.deptCode;
  console.log(params);
  return axios
          .post( options.url, params)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err;
          });
}

export const confirm = (options={}) => {
  options.url = `${LOCALHOST_BASE_URL}/advisors/confirm/assignments`;

  return axios
          .post( options.url)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err;
          });
}

export const sendMail=(options={}) => {
  options.url = `${LOCALHOST_BASE_URL}/advisors/sendMail`;
  const params = 
      {
          recipient: options.email,
          msgBody: options.msg,
          subject: options.subject,
          attachment:null
      } 
     
  return axios
          .post(options.url, params)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err;
          });
};

export const sendToPrintCSV = (data) => {
  let url = `${LOCALHOST_BASE_URL}/surepay/csv`;
  const params = { data: data };
  return axios
          .post(url, params)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            return err;
          });
};

export const sendToPrintPDF = (data) => {
  let url = `${LOCALHOST_BASE_URL}/surepay/pdf`;
  const params = { data: data };
  return axios
          .post(url, params)
          .then((res) => {
           return res.data;
          })
          .catch((err) => {
            return err;
          });
};

export const authenticateUser = (username, password) => {
  let url = `${LOCALHOST_BASE_URL}/advisors/authenticate`;

  const params = { username, password };

  return axios
    .post(url, params)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      let resp =
        err.toString().indexOf("500") >= 0
          ? { status: EXTERNAL_SERVER_ERROR, data: false }
          : { status: UNAUTHORIZED, data: false };
      return resp;
    });
};