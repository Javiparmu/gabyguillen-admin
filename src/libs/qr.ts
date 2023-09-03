import { baseUrl } from "@/utils/constants";
import { toDataURL, type QRCodeToDataURLOptions } from "qrcode";

const options: QRCodeToDataURLOptions = {
    width: 400,
    margin: 2,
  };
  
  export const getQRCode = async (value: string) => {
    return toDataURL(value, options);;
  };
  
  export const getUrlFromTitle = (title: string) => {
      return baseUrl + getSectionIdFromTitle(title);
  }
  
  export const getSectionIdFromTitle = (title: string) => {
      return normalizeText(title.toLowerCase().replace(/ /g, "-"));
  }
  
  function normalizeText(text: string): string {
      return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ñ/g, "n").replace(/Ñ/g, "N");
  }
  
  export function base64ToFile(base64Image: string, filename: string) {
      function base64ToBlob(base64: string, mime: string) {
          mime = mime || '';
          var sliceSize = 1024;
          var byteChars = globalThis.atob(base64);
          var byteArrays = [];
  
          for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
              var slice = byteChars.slice(offset, offset + sliceSize);
              var byteNumbers = new Array(slice.length);
              for (var i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
              }
              var byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
          }
  
          return new Blob(byteArrays, {type: mime});
      }
  
      var mime = base64Image.split(',')[0].split(':')[1].split(';')[0];
      var pureBase64 = base64Image.split(',')[1];
  
      var blob = base64ToBlob(pureBase64, mime);
  
      return new File([blob], filename, {type: mime});
  }
  