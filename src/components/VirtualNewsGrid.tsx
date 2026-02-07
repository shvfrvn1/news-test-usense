"use no memo";
import React, { useMemo, useEffect, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import NewsCard from './NewsCard';
import type { GuardianArticle } from '../types/news';

interface VirtualNewsGridProps {
  articles: GuardianArticle[];
}

const VirtualNewsGrid: React.FC<VirtualNewsGridProps> = ({ articles }) => {
  const [columns, setColumns] = useState(1);

  // Requirement 5: Performance optimization - determine columns for grid virtualization
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) {
        setColumns(3);
      } else if (window.innerWidth >= 640) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Group articles into rows
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < articles.length; i += columns) {
      result.push(articles.slice(i, i + columns));
    }
    return result;
  }, [articles, columns]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => document.documentElement,
    estimateSize: () => 450, // Estimated height of a NewsCard
    overscan: 3,
  });

  const gridStyles = {
    display: 'grid',
    gap: '1.5rem', // gap-6
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };

  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: '100%',
        position: 'relative',
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => (
        <div
          key={virtualRow.key}
          data-index={virtualRow.index}
          ref={rowVirtualizer.measureElement}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualRow.start}px)`,
            ...gridStyles,
          }}
        >
          {rows[virtualRow.index]?.map((article) => (
            <div key={article.id}>
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualNewsGrid;
