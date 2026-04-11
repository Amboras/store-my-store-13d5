'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const PolicyMarkdownInner = dynamic(
  () => import('./policy-markdown-inner'),
  {
    loading: () => (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    ),
  }
)

export function PolicyMarkdown({ content }: { content: string }) {
  return <PolicyMarkdownInner content={content} />
}
