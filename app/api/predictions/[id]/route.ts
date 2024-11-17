import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params
        const prediction = await replicate.predictions.get(id)
        return NextResponse.json(prediction)
    } catch (error: unknown) {
        console.error(error)
        return NextResponse.json(
            { error: 'Failed to get prediction' },
            { status: 500 }
        )
    }
}
