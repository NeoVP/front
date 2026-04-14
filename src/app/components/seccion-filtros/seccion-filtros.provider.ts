export abstract class SeccionFiltrosProvider {
    abstract registerInput(field: string, component: any): void;
    abstract unregisterInput(field: string): void;
}