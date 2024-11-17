'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Prediction } from '@/types/replicate'

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export default function Home() {
    const [prediction, setPrediction] = useState<Prediction | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const promptInput = form.prompt as HTMLInputElement

        try {
            const response = await fetch('/api/predictions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: promptInput.value
                })
            })

            let prediction = await response.json()

            if (response.status !== 201) {
                setError(prediction.error)
                return
            }

            setPrediction(prediction)

            while (
                prediction.status !== 'succeeded' &&
                prediction.status !== 'failed'
            ) {
                await sleep(1000)
                const response = await fetch(
                    '/api/predictions/' + prediction.id
                )
                prediction = await response.json()

                if (response.status !== 200) {
                    setError(prediction.error)
                    return
                }

                setPrediction(prediction)
            }
        } catch (error: unknown) {
            console.error(error)
            setError('An error occurred')
        }
    }

    return (
        <div className="container max-w-2xl mx-auto p-5">
            <h1 className="py-6 text-center font-bold text-2xl">
                Dream something with SDXL
            </h1>

            <form className="w-full flex" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="flex-grow"
                    name="prompt"
                    placeholder="Enter a prompt to display an image"
                />
                <button className="button" type="submit">
                    Generate
                </button>
            </form>

            {error && <div className="text-red-500">{error}</div>}

            {prediction && (
                <>
                    {prediction.output && (
                        <div className="image-wrapper mt-5">
                            <Image
                                src={
                                    prediction.output[
                                        prediction.output.length - 1
                                    ]
                                }
                                alt="Generated image"
                                sizes="100vw"
                                width={768}
                                height={768}
                                priority
                            />
                        </div>
                    )}
                    <p className="py-3 text-sm opacity-50">
                        status: {prediction.status}
                    </p>
                </>
            )}
        </div>
    )
}
