import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../config/firebase";
import { getUserId } from "./Utils";

export const UploadFile = ( file, statusCallback , progressCallback, completedCallback ) => {

    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'book-cover' + `/${getUserId()}/` + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    progressCallback(10);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + uploadProgress + '% done');

            statusCallback('uploading');
            progressCallback(uploadProgress);

            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            statusCallback('error');
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            statusCallback('success');
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                completedCallback(downloadURL)
            });
        }
    );  

}

export const RemoveFile = (file) => {
    const storageRef = ref(storage, 'book-cover' + `/${getUserId()}/` + file.name);
    // Delete the file
    deleteObject(storageRef).then(() => {
        console.log('File deleted successfully')
    }).catch((error) => {
        // Uh-oh, an error occurred!
    });
}
