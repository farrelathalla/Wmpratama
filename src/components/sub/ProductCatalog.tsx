"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Close, Search } from "@/components/Icons";

export type CatalogItem = { slug: string; model: string; type: string; category: string; categoryLabel: string; image: string; blurb: string };
type Cat = { id: string; label: string };
type ViewProps = {
  items: CatalogItem[];
  cats: readonly Cat[];
  selected: string[];
  query: string;
  onToggle: (id: string) => void;
  onQuery: (q: string) => void;
  onClear: () => void;
};

function CatalogView({ items, cats, selected, query, onToggle, onQuery, onClear }: ViewProps) {
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (p) => (selected.length === 0 || selected.includes(p.category)) && (!q || `${p.model} ${p.type}`.toLowerCase().includes(q)),
    );
  }, [items, selected, query]);
  const hasFilter = selected.length > 0 || query.trim().length > 0;

  return (
    <div className="product-list inner">
      <aside className="side-menu" aria-label="Filter products">
        <div className="cate">
          <div className="tit">
            <span>Product Type</span>
            <button type="button" className="refresh" onClick={onClear}>Refresh</button>
          </div>
          <ul>
            {cats.map((c) => {
              const count = items.filter((p) => p.category === c.id).length;
              const on = selected.includes(c.id);
              return (
                <li key={c.id} className={on ? "is-active" : undefined}>
                  <label>
                    <span className="check">
                      <input type="checkbox" checked={on} onChange={() => onToggle(c.id)} />
                      <span>{c.label}</span>
                    </span>
                    <span className="num">{count}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="cate">
          <div className="tit"><span>Search</span></div>
          <div className="search">
            <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Search for a product" aria-label="Search for a product" />
            <Search />
          </div>
        </div>
      </aside>
      <div className="right">
        <div className="filter">
          <span className="total">Total <b>{visible.length}</b></span>
          {hasFilter && <button type="button" className="all-clear" onClick={onClear}><Close /> All Clear</button>}
          {selected.map((id) => (
            <button key={id} type="button" className="filter-item" onClick={() => onToggle(id)}>
              {cats.find((c) => c.id === id)?.label} <Close />
            </button>
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="no-data">No products match your filter.</p>
        ) : (
          <ul className="prd-list">
            {visible.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`}>
                  <div className="img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={`${p.model} ${p.type}`} loading="lazy" />
                    <span className="badge">{p.categoryLabel}</span>
                  </div>
                  <strong>{p.model}</strong>
                  <p>{p.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Catalog({ items, cats }: { items: CatalogItem[]; cats: readonly Cat[] }) {
  const param = useSearchParams().get("category");
  const [selected, setSelected] = useState<string[]>(param ? [param] : []);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setSelected(param ? [param] : []);
  }, [param]);

  return (
    <CatalogView
      items={items}
      cats={cats}
      selected={selected}
      query={query}
      onQuery={setQuery}
      onToggle={(id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))}
      onClear={() => {
        setSelected([]);
        setQuery("");
      }}
    />
  );
}

const noop = () => undefined;

export default function ProductCatalog({ items, cats }: { items: CatalogItem[]; cats: readonly Cat[] }) {
  return (
    <Suspense fallback={<CatalogView items={items} cats={cats} selected={[]} query="" onToggle={noop} onQuery={noop} onClear={noop} />}>
      <Catalog items={items} cats={cats} />
    </Suspense>
  );
}
