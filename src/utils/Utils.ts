export class Utils {
    public static generateTempFileName(): string {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 15); // YYYYMMDD_HHMMSS
        return `temp_file_${timestamp}.jpg`;
    }
}