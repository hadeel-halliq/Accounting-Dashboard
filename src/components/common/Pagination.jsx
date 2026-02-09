import { Button } from "@/components/ui/button";

export default function Pagination({
  page,
  totalPages,
  onChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 gap-3">

      <Button
        size="sm"
        variant="outline"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        السابق
      </Button>

      <div className="flex gap-1 flex-wrap justify-center">
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;

          return (
            <Button
              key={p}
              size="icon-sm"
              variant={p === page ? "default" : "ghost"}
              onClick={() => onChange(p)}
            >
              {p}
            </Button>
          );
        })}
      </div>

      <Button
        size="sm"
        variant="outline"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        التالي
      </Button>

    </div>
  );
}
