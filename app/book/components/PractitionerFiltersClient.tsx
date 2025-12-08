/**
 * @file PractitionerFiltersClient component
 *
 * Client-side filtering UI for searching, narrowing, and paginating practitioners.
 */

"use client";

import React, { useState, useMemo } from "react";
import PractitionerCard from "./PractitionerCard";

type Practitioner = {
  id: number;
  name: string;
  title: string | null;
  imageUrl: string;
  shortBio: string;
  country: string;
  consultationType: string;
};

const PAGE_SIZE = 9;

export default function PractitionerFiltersClient({
  practitioners,
}: {
  practitioners: Practitioner[];
}) {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [type, setType] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Computes search + specialty + consultation-type filters with memoization

  const filtered = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    const normalizedSpecialty = specialty.toLowerCase();
    const normalizedType = type.toLowerCase();

    return practitioners.filter((p) => {
      const title = (p.title ?? "").toLowerCase();
      const shortBio = p.shortBio.toLowerCase();
      const name = p.name.toLowerCase();

      const matchesSearch =
        name.includes(normalizedSearch) ||
        shortBio.includes(normalizedSearch) ||
        title.includes(normalizedSearch);

      const matchesSpecialty =
        normalizedSpecialty === "" || title.includes(normalizedSpecialty);

      const matchesType =
        normalizedType === "" ||
        p.consultationType.toLowerCase() === normalizedType;

      return matchesSearch && matchesSpecialty && matchesType;
    });
  }, [search, specialty, type, practitioners]);

  const visiblePractitioners = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const canLoadMore = visibleCount < filtered.length;

  return (
    <>
      {/* FILTER BLOCK */}
      <div className="flex flex-wrap gap-4 mb-10">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-3 border border-border-soft rounded-xl"
        />

        <select
          className="px-4 py-3 border border-border-soft rounded-xl"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">Specialty</option>
          {[...new Set(practitioners.map((p) => p.title).filter(Boolean))].map(
            (s) => (
              <option key={s as string}>{s}</option>
            )
          )}
        </select>

        <select
          className="px-4 py-3 border border-border-soft rounded-xl"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Practitioner Type</option>
          <option value="Virtual">Virtual</option>
          <option value="In-person">In-person</option>
        </select>
      </div>

      {/* RESULTS GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePractitioners.map((p) => (
          <PractitionerCard key={p.id} practitioner={p} />
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-text-muted col-span-full">
            No practitioners found for the selected filters.
          </p>
        )}
      </div>

      {/* LOAD MORE */}
      {canLoadMore && (
        <div className="flex justify-center mt-12">
          <button
            type="button"
            className="hg-btn-secondary"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
