"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Search, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const CATEGORIES = [
  { id: "all", label: "Tous les événements" },
  { id: "Écologie", label: "🌱 Écologie" },
  { id: "Littérature", label: "📚 Littérature" },
  { id: "Histoire", label: "📜 Histoire" },
  { id: "Gastronomie", label: "🍽️ Gastronomie" },
  { id: "Art", label: "🎨 Art" },
  { id: "Architecture", label: "🏛️ Architecture" },
  { id: "Musique", label: "🎵 Musique" },
  { id: "Théâtre", label: "🎭 Théâtre" },
];

export default function SearchFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  
  const currentQuery = searchParams.get("q")?.toString() || "";
  const currentCategory = searchParams.get("category")?.toString() || "all";
  const [searchTerm, setSearchTerm] = useState(currentQuery);

  // Debounce de 0.5 seconde pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set("q", searchTerm);
      } else {
        params.delete("q");
      }
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, pathname, searchParams, replace]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category && category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    replace(pathname, { scroll: false });
  };

  const hasFilters = currentQuery || currentCategory !== "all";

  return (
    <div className="card">
      {/* En-tête avec bouton de toggle */}
      <div className="flex items-center justify-between pb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 w-full font-bold text-[var(--foreground)] hover:opacity-80 transition-opacity"
        >
          <ChevronDown
            size={20}
            className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "-rotate-90"}`}
          />
          <h3 className="text-xl">Filtrer les événements</h3>
        </button>
        {hasFilters && isOpen && (
          <button
            onClick={clearFilters}
            className="text-sm text-[var(--primary)] hover:opacity-80 transition-opacity flex items-center gap-1 ml-2 flex-shrink-0"
          >
            <X size={16} />
            Réinit
          </button>
        )}
      </div>

      {/* Contenu repliable */}
      {isOpen && (
        <div className="space-y-6 border-t border-[var(--border)] pt-6 animate-slide-down">
          {/* Barre de recherche */}
          <div className="space-y-2">
            <label className="label">Rechercher</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" size={18} />
              <input
                type="text"
                placeholder="Conférence, artiste, lieu..."
                className="input pl-10"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
          </div>

          {/* Filtres par catégorie */}
          <div className="space-y-3">
            <label className="label">Catégories</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                    currentCategory === cat.id
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
                      : "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--accent)] border border-[var(--border)]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats des filtres */}
          {hasFilters && (
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--muted-foreground)]">
                {currentQuery && <span>Recherche: <span className="font-semibold text-[var(--foreground)]">&quot;{currentQuery}&quot;</span></span>}
                {currentQuery && currentCategory !== "all" && <span> • </span>}
                {currentCategory !== "all" && (
                  <span>Catégorie: <span className="font-semibold text-[var(--foreground)]">{CATEGORIES.find(c => c.id === currentCategory)?.label}</span></span>
                )}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}