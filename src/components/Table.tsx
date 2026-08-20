import React from 'react'

export default function Table<T extends Record<string, any>>({ columns, data }: { columns: { key: string, title: string }[], data: T[] }){
  return (
    <div className="overflow-auto rounded-md border border-[color:var(--color-surface)]">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="text-left text-sm text-muted">
            {columns.map(c => (
              <th key={c.key} className="px-4 py-2">{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-[color:var(--color-surface)] hover:bg-[color:var(--color-bg)]">
              {columns.map(c => (
                <td key={c.key} className="px-4 py-3 align-top text-sm">{String(row[c.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
