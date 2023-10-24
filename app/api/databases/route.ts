import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    [
      {
        dbms: 'PostgreSQL',
        version: '17.0',
        users: ['luis', 'pedro'],
        schemas: [
          {
            name: 'restaurante',
            tables: [
              'proveedores', 'clientes'
            ]
          }
        ]
      }
    ]
  )
}