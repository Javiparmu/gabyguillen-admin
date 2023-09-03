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
    const painting = await request.json()

    try {
      const data = await SupabaseService.update(painting, 'paintings', painting.id)
   
      return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}