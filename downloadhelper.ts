export class DownloadHelper {

    public static downloadBlob(blob: Blob, name: string) {
        // Internet Explorer spezifischer Download
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, name);
            return;
        }
        // alle anderen Browser
        const data = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        // kleines Delay bevor wir den Link wieder entfernen und die URL für ungültig erklären (wird vorallem vom Firefox benötigt)
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(data);
        }, 1000);
    }

}
