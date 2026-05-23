"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PlaceholderImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
  fallbackClassName?: string
  fallbackLabel?: string
}

export function PlaceholderImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  priority,
  fallbackClassName,
  fallbackLabel,
}: PlaceholderImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-200 text-gray-400 text-xs font-medium select-none",
          fill ? "absolute inset-0" : "",
          fallbackClassName
        )}
        style={!fill ? { width, height } : undefined}
        aria-label={alt}
      >
        {fallbackLabel ?? alt}
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        onError={() => setError(true)}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 0}
      height={height ?? 0}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  )
}
