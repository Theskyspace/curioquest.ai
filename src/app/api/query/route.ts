import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { query } = await request.json();

  return NextResponse.json({
    answer: `# Who is Elon Musk?

Elon Musk is a **business magnate**, **industrial designer**, and **engineer**. He is the founder, CEO, and chief engineer of [SpaceX](https://www.spacex.com/); CEO and product architect of [Tesla, Inc.](https://www.tesla.com/); and founder of several other companies, including *Neuralink* and *The Boring Company*. Known for his visionary approach and ambitious goals, Musk is one of the most influential figures in the tech industry.

## Key Facts
- **Born**: June 28, 1971, in Pretoria, South Africa
- **Nationality**: South African, Canadian, American
- **Companies**: Tesla, SpaceX, Neuralink, The Boring Company, and more

> Elon Musk is often described as a visionary, known for pushing the boundaries of technology and innovation.
    `,
  });
}
