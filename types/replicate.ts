export interface Prediction {
    id: string
    version: string
    input: {
        prompt: string
    }
    output: string[]
    status: 'starting' | 'processing' | 'succeeded' | 'failed'
    error?: string
}
