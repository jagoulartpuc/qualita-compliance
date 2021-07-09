 class FileUtils {
    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.replace('data:application/pdf;base64,', ''));
        reader.onerror = error => reject(error);
    });
}

export const fileUtils = new FileUtils();