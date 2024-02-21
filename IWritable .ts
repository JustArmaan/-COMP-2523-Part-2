export interface IWritable {
    write(content: string): Promise<void>;
}