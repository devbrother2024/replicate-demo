export interface FluxModelInput {
    prompt: string
    seed?: number
    go_fast?: boolean
    megapixels?: '1' | '0.25'
    num_outputs?: number
    aspect_ratio?:
        | '1:1'
        | '16:9'
        | '21:9'
        | '3:2'
        | '2:3'
        | '4:5'
        | '5:4'
        | '3:4'
        | '4:3'
        | '9:16'
        | '9:21'
    output_format?: 'webp' | 'jpg' | 'png'
    output_quality?: number
    num_inference_steps?: number
    disable_safety_checker?: boolean
}
