export class FileReaderHelper {

    public static readBlobAsText(file: Blob, encoding: string = 'iso8859-1'): Promise<string[]> {
        const fr: FileReader = new FileReader();
        fr.readAsText(file, encoding);
        return new Promise(
            (resolve, reject) => {
                fr.onerror = (event: FileReaderProgressEvent) => {
                    reject(event.target.error);
                }
                fr.onload = () => {
                    resolve(fr.result);
                }
            }
        );
    }

    public static readBlobAsTextFiltered(file: Blob, encoding: string = 'iso8859-1', regex: RegExp, split_pattern: RegExp = /\r\n|\n/, clue_string: string = '\r\n'): Promise<string[]> {
        const fr: FileReader = new FileReader();
        fr.readAsText(file, encoding);
        return new Promise(
            (resolve, reject) => {
                fr.onerror = (event: FileReaderProgressEvent) => {
                    reject(event.target.error);
                }
                fr.onload = () => {
                    const lines = [];
                    const allLines: string[] = fr.result.split(split_pattern);
                    allLines.forEach((line: string) => {
                        if (regex.test(line)) {
                            lines.push(line + clue_string);
                        }
                    });
                    resolve(lines);
                }
            }
        );
    }

}