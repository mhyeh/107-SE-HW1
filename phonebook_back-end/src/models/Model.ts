export default abstract class Model {
    public abstract connect(config: any): void;
    public abstract select(data?: any): Promise<any>;
    public abstract insert(data: any): Promise<void>;
    public abstract update(data: any): Promise<void>;
    public abstract delete(data: any): Promise<void>;
}
