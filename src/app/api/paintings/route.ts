import { SupabaseService } from '@/libs/SupabaseService'
import { Painting } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
 
export async function GET() {
  const paintings = await SupabaseService.select<Painting[]>('paintings')
 
  return NextResponse.json(paintings)
}

export async function POST(request: NextRequest) {
    const painting = await request.json()

    try {
      const data = await SupabaseService.insert(painting, 'paintings')

      return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(request: NextRequest) {
    const {id, title, description, collection, price, image_url, is_top } = await request.json()

    const painting: Partial<Painting> = {
        title,
        description,
        collection,
        price,
        is_top
    }

    if (image_url != null) {
        painting.image_url = image_url
    }

    try {
        const data = await SupabaseService.update(painting, 'paintings', Number(id))

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}