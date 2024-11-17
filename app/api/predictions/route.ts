import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { FluxModelInput } from '@/types/flux'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

export async function POST(request: Request) {
    if (!process.env.REPLICATE_API_TOKEN) {
        return NextResponse.json(
            { error: 'REPLICATE_API_TOKEN is not set' },
            { status: 500 }
        )
    }

    try {
        const { prompt } = await request.json()

        const prediction = await replicate.predictions.create({
            model: 'black-forest-labs/flux-schnell',
            input: { prompt, aspect_ratio: '16:9' } as FluxModelInput
        })

        return NextResponse.json(prediction, { status: 201 })
    } catch (error: unknown) {
        console.error(error)
        return NextResponse.json(
            { error: 'Failed to create prediction' },
            { status: 500 }
        )
    }
}
