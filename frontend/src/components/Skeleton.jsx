function SkeletonCard() {
  return (
    <div className="glass-card ui-card-body">
      <div className="space-y-4">
        <div className="h-6 rounded w-3/4 skeleton-shimmer"></div>
        <div className="h-4 rounded w-full skeleton-shimmer"></div>
        <div className="h-4 rounded w-5/6 skeleton-shimmer"></div>
      </div>
    </div>
  )
}

function SkeletonTableRow() {
  return (
    <tr className="border-b border-white border-opacity-10">
      <td className="px-6 py-4">
        <div className="h-4 rounded w-24 skeleton-shimmer"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 rounded w-32 skeleton-shimmer"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 rounded w-20 skeleton-shimmer"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 rounded w-16 skeleton-shimmer"></div>
      </td>
    </tr>
  )
}

function SkeletonList() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between py-3 border-b border-white border-opacity-10"
        >
          <div className="flex-1 space-y-2">
            <div className="h-4 rounded w-3/4 skeleton-shimmer"></div>
            <div className="h-3 rounded w-1/2 skeleton-shimmer"></div>
          </div>
          <div className="h-6 rounded w-20 skeleton-shimmer"></div>
        </div>
      ))}
    </div>
  )
}

function SkeletonMetric() {
  return (
    <div className="glass-card ui-card-body">
      <div className="space-y-3">
        <div className="h-10 rounded w-12 skeleton-shimmer"></div>
        <div className="h-8 rounded w-16 skeleton-shimmer"></div>
        <div className="h-4 rounded w-24 skeleton-shimmer"></div>
      </div>
    </div>
  )
}

export { SkeletonCard, SkeletonTableRow, SkeletonList, SkeletonMetric }

