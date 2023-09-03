export function getFileBuffer(file: File) {
    return new Promise((resolve, reject) => {
        if (file != null) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                if (event.target == null) return;

                resolve(Buffer.from(event.target.result));
            };
            
            reader.onerror = (error) => reject(error);
            
            reader.readAsArrayBuffer(file);
        } else {
            resolve(null);
        }
    });
}
  